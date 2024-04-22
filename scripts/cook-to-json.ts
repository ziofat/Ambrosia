import { nanoid } from 'nanoid';
import { CATEGORIES } from './categories';
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
    variantFrom?: string;
    courseType: string[];
    time: number;
    url: string;
    objectID: string;
}

function getCategories(course: string): string[] {
    const categories = [
        CATEGORIES.find((c) => c.id === course)?.text ?? undefined,
        CATEGORIES.find((c) => c.id === course.split('/')[0])?.text ?? undefined,
    ].filter((c) => c);
    return categories as string[];
}

export function cookToJson(recipe: Recipe, idMap: Record<string, string>) {
    const recipes: RecipeRecord[] = [];
    if (recipe.variants.length) {
        recipe.variants.forEach((variant) => {
            const url = `/recipes/${recipe.metadata.course}/${recipe.name}.html?variant=${variant}`;
            recipes.push({
                objectID: idMap[url] ?? nanoid(8),
                name: variant,
                description: recipe.description,
                url,
                time: normalizeTime(recipe.metadata.time ?? '0'),
                ingredients: recipe.steps.reduce((list, step) => {
                    step.ingredients.filter((ingredient) => {
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
                    .filter((instruction) => instruction.variants?.includes(variant) || instruction.variants?.length === 0)
                    .map((instruction) => instruction.content)
                ),
                courseType: getCategories(recipe.metadata.course ?? 'other'),
            });
        });
    } else {
        const url = `/recipes/${recipe.metadata.course}/${recipe.name}.html`;
        recipes.push({
            objectID: idMap[url] ?? nanoid(8),
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
            instructions: recipe.steps.flatMap((step) => step.instructions.map((instruction) => instruction.content)),
            courseType: getCategories(recipe.metadata.course ?? 'other'),
        });
    }
    return recipes;
}
