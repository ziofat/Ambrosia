import {
    Parser, ParseResult, Step,
    StepIngredient,
} from '@cooklang/cooklang-ts';

interface Ingredient {
    name: string;
    detailName?: string;
    metric: {
        amount: number;
        unit: string;
    };
    imperal?: {
        amount: number | string;
        unit: string;
    }[];
}

interface IRecipe {
    name: string;
    mainIngredients: string[];
    specialCookwares: string[];
    ingredients: Ingredient[];
    dependencies: string[];
    course: string;
    time: number;
    yield: string;
    storage?: string;
}

export class Recipe implements IRecipe {
    public mainIngredients: string[] = [];

    public specialCookwares: string[] = [];

    public ingredients: Ingredient[] = [];

    public dependencies: string[] = [];

    public course = '';

    public time = 0;

    public storage?: string;

    public yield = '';

    #ast: ParseResult;

    #ingredients: Map<string, Ingredient> = new Map();

    constructor(public name: string, source: string) {
        this.#ast = new Parser().parse(source);

        this.parse();
    }

    private parse() {
        this.course = this.#ast.metadata.course;
        this.storage = this.#ast.metadata.storage;
        this.yield = this.#ast.metadata.yield;

        this.normalizeTime(this.#ast.metadata.time);

        this.#ast.steps.forEach(this.parseStep.bind(this));

        this.mainIngredients = Array.from(new Set(this.mainIngredients));
        this.ingredients = [...this.#ingredients.values()];
        this.specialCookwares = Array.from(new Set(this.specialCookwares));
    }

    private normalizeTime(time: string) {
        const units = {
            1: ['min', 'mins', 'minute', 'minutes', '分钟', '分'],
            60: ['h', 'hr', 'hrs', 'hour', 'hours', '小时', '时'],
            1440: ['d', 'day', 'days', '天', '日'],
        };
        const digit = parseFloat(time);
        const unit = time.replace(/[0-9]/g, '').trim();
        const unitMatch = Object.keys(units).find((key) => units[key].includes(unit)) ?? '1';
        this.time = digit * parseInt(unitMatch, 10);
    }

    private parseStep(step: Step) {
        step.forEach((part) => {
            switch (part.type) {
                case 'ingredient':
                    this.handleIngredient(part);
                    break;
                case 'cookware':
                    this.specialCookwares.push(part.name);
                    break;
                default:
                    break;
            }
        });
    }

    private normalizeName(rawName: string, withProcessors = false) {
        const matches = rawName.matchAll(/`(.*?[^\\])`/g);

        const { name, preprocessors } = [...matches].reduce((acc, [match, group]) => {
            acc.name = acc.name.replace(match, '');
            acc.preprocessors.push(group);
            return acc;
        }, { name: rawName, preprocessors: [] as string[] });

        const affixes = withProcessors && preprocessors.length > 0 ? `, ${preprocessors.join(' ')}` : '';

        if (name.startsWith('*') || name.startsWith('?')) {
            return name.slice(1) + affixes;
        }
        return name + affixes;
    }

    private normalizeUnits(metricQuantity: number, rawUnits = '') {
        const units = [] as { amount: number | string; unit: string }[];
        rawUnits.split(',').forEach((unit, index) => {
            if (index === 0) {
                units.push({ amount: metricQuantity, unit });
            } else {
                const [quantity, u] = unit.trim().split('%');
                units.push({ amount: quantity, unit: u });
            }
        });
        return units;
    }

    private handleIngredient(part: StepIngredient) {
        const name = this.normalizeName(part.name);
        if (part.name.startsWith('*')) {
            this.mainIngredients.push(name);
        }

        const amounts = this.normalizeUnits(part.quantity as number, part.units);

        if (this.#ingredients.has(name)) {
            const ingredient = this.#ingredients.get(name)!;
            const [metric, ...imperal] = amounts;
            if (metric.unit === ingredient?.metric.unit) {
                ingredient.metric.amount += metric.amount as number;
            }
            ingredient.imperal = imperal;
        } else {
            this.#ingredients.set(name, {
                name,
                detailName: this.normalizeName(part.name, true),
                metric: { amount: amounts[0].amount as number, unit: amounts[0].unit },
                imperal: amounts.slice(1),
            });
        }
    }

    public toMarkdown() {
        return `---
recipe: true
course: ${this.course}
time: ${this.time}
storage: ${this.storage}
ingredients: ${this.ingredients.length}
yield: ${this.yield}
---

# ${this.name}

### Instruction

${this.#ast.steps.map((step) => `
  ${step.map((part) => {
        switch (part.type) {
            case 'ingredient':
                return `${part.quantity} ${part.units}\`${this.normalizeName(part.name)}\``;
            case 'cookware':
                return `\`${part.name}\``;
            case 'timer':
                return `\`${part.quantity} ${part.units}\``;
            default:
                return part.value;
        }
    }).join(' ')}
`).join('\n\n')}
`;
    }
}
