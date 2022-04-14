/* eslint-disable max-len */
import {
    Parser, ParseResult, Step,
    StepIngredient,
} from '@cooklang/cooklang-ts';

interface Ingredient {
    name: string;
    preparation?: string[];
    link?: string;
    metric: {
        amount: number;
        unit: string;
    };
    variants?: string[];
    converter?: string;
    scale?: number;
    optional?: boolean;
}

interface Instruction {
    content: string;
    variants?: string[];
}

interface IStep {
    ingredients: Ingredient[];
    instructions: Instruction[];
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

    public variants: string[] = [];

    #ast: ParseResult;

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
        this.variants = [];
        if (this.#ast.metadata.default) {
            this.variants.push(this.#ast.metadata.default);
        }

        this.course = this.#ast.metadata.course;
        this.storage = this.#ast.metadata.storage;
        this.yield = this.#ast.metadata.yield;

        this.normalizeTime(this.#ast.metadata.time);

        this.#ast.steps.forEach(this.parseStep.bind(this));

        this.mainIngredients = Array.from(new Set(this.mainIngredients));
        this.specialCookwares = Array.from(new Set(this.specialCookwares));
        this.variants = Array.from(new Set(this.variants));
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
        const variants: string[] = [];
        step.forEach((part, i) => {
            switch (part.type) {
                case 'ingredient':
                    if (this.#stepIndex >= 0) {
                        const ingredient = this.handleIngredient(part);
                        this.steps[this.#stepIndex].ingredients.push({
                            ...ingredient,
                            optional: part.name.startsWith('?'),
                            variants,
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
                    // eslint-disable-next-line no-case-declarations
                    let content = part.value.trim();

                    if (!this.#isDescriptionOver) {
                        if (part.value.startsWith('====') && part.value.endsWith('====')) {
                            this.#isDescriptionOver = true;
                        } else {
                            this.description += part.value;
                        }
                    } else if (i === 0 && part.value.startsWith('- ')) {
                        this.#stepIndex = this.steps.push({
                            ingredients: [],
                            instructions: [],
                        }) - 1;
                        content = content.slice(2);
                    }
                    if (this.#stepIndex >= 0) {
                        const variantMatch = /^\(-(.+)-\)/.exec(content);
                        if (variantMatch && i === 0) {
                            variantMatch[1].split(',').forEach((variant) => {
                                variants.push(variant.trim());
                            });
                        }

                        instruction += content.replace(/^\(-(.+)-\)/, '');
                    }
                    break;
                default:
                    break;
            }
        });
        if (this.#stepIndex >= 0) {
            this.steps[this.#stepIndex].instructions.push({
                content: instruction,
                variants,
            });
            this.variants = this.variants.concat(variants);
        }
    }

    private handleLink(path: string) {
        if (!path.includes('./')) {
            return { name: path, link: '' };
        }
        const name = path.split('/').pop()!.replace('.cook', '');
        const link = path.replace('.cook', '.html');
        return { name, link };
    }

    private normalizeingredient(rawName: string) {
        const matches = rawName.matchAll(/\((.*?[^\\])\)/g);

        const ingredient = [...matches].reduce((acc, [match, group]) => {
            acc.name = acc.name.replace(match, '');
            acc.preparation.push(group);
            return acc;
        }, { name: rawName, preparation: [] as string[], link: '' });

        const { name, link } = this.handleLink(ingredient.name);
        ingredient.name = name.replace(/(,|!|\?)/g, '').trim();
        ingredient.link = link.replace(/(!|\?)/g, '').trim();

        return ingredient;
    }

    private handleIngredient(part: StepIngredient) {
        const ingredient = this.normalizeingredient(part.name);
        if (part.name.startsWith('!')) {
            this.mainIngredients.push(ingredient.name);
        }

        return {
            name: ingredient.name,
            preparation: ingredient.preparation,
            metric: { amount: parseFloat(`${part.quantity}`), unit: part.units ?? '' },
            converter: (this.#ast.shoppingList.Ingredients ?? [])
                .find((i) => i.name === ingredient.name)?.synonym,
            link: ingredient.link,
        };
    }

    private stepIngredients(step: IStep) {
        const jsonString = encodeURIComponent(JSON.stringify(Array.from(step.ingredients.values())));
        return Buffer.from(jsonString, 'binary').toString('base64');
    }

    public toMarkdown(extraMeta: { [key: string]: any } = {}) {
        return `---
recipe: true
course: ${this.course}
time: ${this.time}
ingredients: ${this.steps.reduce((acc, map) => {
        map.ingredients.forEach((ingredient) => acc.add(ingredient.name));
        return acc;
    }, new Set()).size}
description: ${this.description}
yield: ${this.yield ?? 'null'}
servings: ${this.#ast.metadata.servings ?? 'null'}
variants: ${this.variants.map((v) => `\n  - ${v}`).join('') || 'null'}
${Object.entries(extraMeta).map(([key, value]) => `${key}: ${value}`).join('\n')}
---

# ${this.name}

### Instruction

<Steps>

${this.steps.map((step) => `<Step ingredients="${this.stepIngredients(step)}">

${step.instructions.map((instruction) => `<Instruction variant="${instruction.variants?.join(',')}">

${instruction.content}

</Instruction>`).join('\n\n')}

</Step>`).join('\n\n')}

</Steps>

${this.storage ? `### Storage\n\n${this.storage}` : ''}
`;
    }
}
