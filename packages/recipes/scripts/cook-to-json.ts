import { nanoid } from 'nanoid';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Recipe } from './recipe';
import { normalizeTime } from './utils';

interface RecordIngredient {
    name: string;
    preparation?: string[];
}

export interface RecipeRecord {
    name: string;
    description: string;
    ingredients: RecordIngredient[];
    instructions: string[];
    variantFrom: string;
    courseType: string[];
    time: number;
    url: string;
    objectID: string;
    image?: string;
    createdTime: number;
}

export function cookToJson(recipe: Recipe, idMap: Record<string, string>, createdTime) {
    const recipes: RecipeRecord[] = [];
    if (recipe.variants.length) {
        recipe.variants.forEach((variant) => {
            const url = variant === recipe.name
                ? `/recipes/${recipe.metadata.course}/${recipe.name}.html`
                : `/recipes/${recipe.metadata.course}/${recipe.name}.html?variant=${variant}`;
            const path = resolve(__dirname, '../../../apps/website/.vuepress/public/recipe-static/', `${variant}.jpg`);
            recipes.push({
                objectID: idMap[url] ?? nanoid(8),
                createdTime,
                name: variant,
                description: recipe.description,
                url,
                time: normalizeTime(recipe.metadata.time ?? '0'),
                ingredients: recipe.steps.reduce((list, step) => {
                    step.ingredients.forEach((ingredient) => {
                        if (ingredient.variants?.includes(variant) || ingredient.variants?.length === 0) {
                            list.push({
                                name: ingredient.name,
                                preparation: ingredient.preparation,
                            });
                        }
                    });
                    return list;
                }, [] as RecordIngredient[]),
                instructions: recipe.steps.flatMap((step) => step.instructions
                    .filter(({ variants }) => variants?.includes(variant) || variants?.length === 0)
                    .map((instruction) => instruction.content)),
                courseType: (recipe.metadata.course ?? 'other').split('/'),
                image: existsSync(path) ? `thumbnail/${variant}.jpg` : undefined,
                variantFrom: recipe.name,
            });
        });
    } else {
        const url = `/recipes/${recipe.metadata.course}/${recipe.name}.html`;
        const path = resolve(__dirname, '../../../apps/website/.vuepress/public/recipe-static/', `${recipe.name}.jpg`);
        recipes.push({
            objectID: idMap[url] ?? nanoid(8),
            createdTime,
            name: recipe.name,
            description: recipe.description,
            url,
            time: normalizeTime(recipe.metadata.time ?? '0'),
            ingredients: recipe.steps.reduce((list, step) => {
                step.ingredients.forEach((ingredient) => {
                    list.push({
                        name: ingredient.name,
                        preparation: ingredient.preparation,
                    });
                });
                return list;
            }, [] as RecordIngredient[]),
            instructions: recipe.steps.flatMap(({ instructions }) => instructions.map(({ content }) => content)),
            courseType: (recipe.metadata.course ?? 'other').split('/'),
            image: existsSync(path) ? `thumbnail/${recipe.name}.jpg` : undefined,
            variantFrom: recipe.name,
        });
    }
    return recipes;
}
