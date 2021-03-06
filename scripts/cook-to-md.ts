import { Recipe } from './recipe';
import { IStep } from './type';

function normalizeTime(time: string) {
    const units = {
        1: ['min', 'mins', 'minute', 'minutes', '分钟', '分'],
        60: ['h', 'hr', 'hrs', 'hour', 'hours', '小时', '时'],
        1440: ['d', 'day', 'days', '天', '日'],
    };
    const digit = parseFloat(time);
    const unit = time.replace(/[0-9]/g, '').trim();
    const unitMatch = Object.keys(units).find((key) => units[key].includes(unit)) ?? '1';
    return digit * parseInt(unitMatch, 10);
}

function stepIngredients(step: IStep) {
    const jsonString = encodeURIComponent(JSON.stringify(Array.from(step.ingredients.values())));
    return Buffer.from(jsonString, 'binary').toString('base64');
}

export function cookToMarkdown(recipe: Recipe, extraMeta: Record<string, unknown> = {}) {
    return `---
recipe: true
course: ${recipe.metadata.course}
time: ${normalizeTime(recipe.metadata.time ?? '0')}
ingredients: ${recipe.steps.reduce((acc, map) => {
        map.ingredients.forEach((ingredient) => acc.add(ingredient.name));
        return acc;
    }, new Set()).size}
description: ${recipe.description}
yield: ${recipe.metadata.yield ?? 'null'}
servings: ${recipe.metadata.servings ?? 'null'}
variants: ${recipe.variants.map((v) => `\n  - ${v}`).join('') || 'null'}
${Object.entries(extraMeta).map(([key, value]) => `${key}: ${value}`).join('\n')}
---

# ${recipe.name}

### Instruction

<Steps>

${recipe.steps.map((step) => `<Step ingredients="${stepIngredients(step)}">

${step.instructions.map((instruction) => `<Instruction variant="${instruction.variants?.join(',')}">

${instruction.content}

</Instruction>`).join('\n\n')}

</Step>`).join('\n\n')}

</Steps>

${recipe.metadata.storage ? `### Storage\n\n${recipe.metadata.storage}` : ''}
`;
}
