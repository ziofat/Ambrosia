/* eslint-disable max-len */
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
    scale?: number;
    optional?: boolean;
}

interface IStep {
    ingredients: Ingredient[];
    instructs: string[];
}

interface IRecipe {
    name: string;
    description: string;
    specialCookwares: string[];
    course: string;
    time: number;
    yield: string;
    servings?: number;
    storage?: string;
    steps: IStep[];
}

export class Recipe implements IRecipe {
    private mainIngredients: string[] = [];

    public description = '';

    public specialCookwares: string[] = [];

    public course = '';

    public time = 0;

    public yield = '';

    public servings?: number;

    public storage?: string;

    public steps: IStep[] = [];

    #ast: ParseResult;

    #ingredients: Map<string, Ingredient> = new Map();

    #isDescriptionOver = false;

    #stepIndex = -1;

    constructor(public name: string, source: string) {
        this.#ast = new Parser().parse(source);
        this.parse();
    }

    private parse() {
        this.description = '';
        this.#stepIndex = -1;
        this.mainIngredients = [];
        this.specialCookwares = [];
        this.#ingredients.clear();

        this.course = this.#ast.metadata.course;
        this.storage = this.#ast.metadata.storage;
        this.yield = this.#ast.metadata.yield;

        this.normalizeTime(this.#ast.metadata.time);

        this.#ast.steps.forEach(this.parseStep.bind(this));

        this.mainIngredients = Array.from(new Set(this.mainIngredients));
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
        let instruction = '';
        step.forEach((part, i) => {
            switch (part.type) {
                case 'ingredient':
                    if (this.#stepIndex >= 0) {
                        const ingredient = this.handleIngredient(part);
                        this.steps[this.#stepIndex].ingredients.push({
                            ...ingredient,
                            optional: part.name.startsWith('?'),
                        });
                        instruction += ingredient.name;
                    }
                    break;
                case 'cookware':
                    this.specialCookwares.push(part.name);
                    instruction += part.name;
                    break;
                case 'timer':
                    instruction += ` ${part.quantity ?? '几'} ${part.units ?? '分钟'}`;
                    break;
                case 'text':
                    if (!this.#isDescriptionOver) {
                        if (part.value.startsWith('====') && part.value.endsWith('====')) {
                            this.#isDescriptionOver = true;
                        } else {
                            this.description += part.value;
                        }
                    } else if (i === 0 && part.value.startsWith('- ')) {
                        this.#stepIndex = this.steps.push({
                            ingredients: [],
                            instructs: [],
                        }) - 1;
                    }
                    if (this.#stepIndex >= 0) {
                        instruction += part.value;
                    }
                    break;
                default:
                    break;
            }
        });
        if (this.#stepIndex >= 0) {
            this.steps[this.#stepIndex].instructs.push(instruction.slice(2));
        }
    }

    private normalizeName(rawName: string, withProcessors = false) {
        const matches = rawName.matchAll(/\((.*?[^\\])\)/g);

        const { name, preprocessors } = [...matches].reduce((acc, [match, group]) => {
            acc.name = acc.name.replace(match, '');
            acc.preprocessors.push(group);
            return acc;
        }, { name: rawName, preprocessors: [] as string[] });

        const affixes = withProcessors && preprocessors.length > 0 ? `, ${preprocessors.join(' ')}` : '';

        if (name.startsWith('!') || name.startsWith('?')) {
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
        if (part.name.startsWith('!')) {
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
        return this.#ingredients.get(name)!;
    }

    public toMarkdown() {
        return `---
recipe: true
course: ${this.course}
time: ${this.time}
storage: ${this.storage}
ingredients: ${this.#ingredients.size}
description: ${this.description}
yield: ${this.yield}
servings: ${this.#ast.metadata.servings}
---

# ${this.name}

### Instruction

<Steps>

${this.steps.map((step) => `<Step ingredients="${step.ingredients.map((i) => i.detailName).join('|')}" amount="${step.ingredients.map(({ metric }) => `${metric.amount}, ${metric.unit}`).join('|')}">

${step.instructs.join('\n\n')}

</Step>`).join('\n\n')}

</Steps>

${this.storage ? `### Storage\n\n${this.storage}` : ''}
`;
    }
}
