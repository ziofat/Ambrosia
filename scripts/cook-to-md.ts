import { Recipe } from './recipe';
import { IStep } from './type';
import { normalizeTime } from './utils';

function stepIngredients(step: IStep) {
    const jsonString = encodeURIComponent(JSON.stringify(Array.from(step.ingredients.values())));
    return Buffer.from(jsonString, 'binary').toString('base64');
}

export interface IDependency {
    name: string;
    deps: IDependency[] | null;
    link: string;
}

function drawDeps(name: string, dependencies: IDependency[] | null) {
    const defs: string[] = [];
    const lines: string[] = [];
    const links: string[] = [];
    const toString = (root: string, deps?: IDependency[] | null, link?: string) => {
        defs.push(`  ${root}(${root})`);
        if (deps) {
            deps.forEach((d) => {
                lines.push(`  ${d.name} --> ${root}`);
                toString(d.name, d.deps, d.link);
            });
        }
        if (link) {
            links.push(`  click ${root} "${link}"`);
        }
    };
    toString(name, dependencies);
    return `\`\`\`mermaid\ngraph LR\n${defs.concat(lines, links).join('\n')}\n\`\`\``;
}

export function cookToMarkdown(
    recipe: Recipe,
    extraMeta: Record<string, unknown> = {},
    dependencies: IDependency[] | null = [],
) {
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

### <i class="fa-light fa-kitchen-set"></i> Instruction

<Steps>

${recipe.steps.map((step) => `<Step ingredients="${stepIngredients(step)}">

${step.instructions.map((instruction) => `<Instruction variant="${instruction.variants?.join(',')}">

${instruction.content}

</Instruction>`).join('\n\n')}

</Step>`).join('\n\n')}

</Steps>

${recipe.metadata.storage ? `### <i class="fa-light fa-refrigerator"></i> Storage\n\n${recipe.metadata.storage}` : ''}


${(dependencies ?? []).length > 0 ? `### <i class="fa-light fa-jug-bottle"></i> Dependencies\n\n${drawDeps(recipe.name, dependencies)}` : ''}
`;
}
