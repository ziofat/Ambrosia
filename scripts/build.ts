import {
    readFileSync, writeFileSync,
    existsSync, mkdirSync,
    copyFileSync,
} from 'fs';
import { resolve, join } from 'path';
import { sync } from 'fast-glob';
import { getCreatedTime } from '@vuepress/plugin-git';
import { Recipe } from './parser';
import { CATEGORIES } from './categories';

let recipeCount = 0;
let variantsCount = 0;

Promise.all(sync('./recipes/**/*.cook').map((file) => {
    const [, course] = file.match(/recipes\/(.+)\/(.+)\.cook$/)!;
    const source = `>> course: ${course}\n${readFileSync(file, 'utf8')}`;
    const name = file.split('/').pop()?.replace('.cook', '') ?? '';
    try {
        return new Recipe(name, source);
    } catch (e) {
        console.error(`Failed to parse ${file}`, e);
        return null;
    }
}).map(async (recipe) => {
    if (!recipe) return null;
    const path = resolve(__dirname, '../docs/recipes', recipe.course);
    const createdTime = await getCreatedTime(resolve(__dirname, '../recipes', recipe.course, `${recipe.name}.cook`), process.cwd());
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
    const md = recipe.toMarkdown({ createdTime });
    writeFileSync(join(path, `${recipe.name}.md`), md, 'utf-8');
    recipeCount += 1;
    variantsCount += recipe.variants.length ? recipe.variants.length - 1 : 0;
    return recipe;
})).then((recipes) => {
    recipes.reduce((acc, recipe) => {
        if (!recipe) return acc;
        const { name, course } = recipe;
        const [categories] = acc;
        categories[course] = categories[course] ?? [];
        categories[course].push(name);
        return acc;
    }, [{}])
        .map((acc) => Object.entries<string[]>(acc)
            .forEach(([category, names]) => {
                const md = names.map((name) => `- [${name}](${name}.md)`).join('\n');
                const title = CATEGORIES.find((c) => c.id === category)?.text ?? '';
                writeFileSync(resolve(__dirname, `../docs/recipes/${category}/README.md`), `# ${title}\n\n${md}`, 'utf-8');
            }));

    writeFileSync(resolve(__dirname, '../docs/recipes/README.md'), `---
finder: all
count: ${recipeCount}
variants: ${variantsCount}
---`, 'utf-8');
});

sync('./recipes/**/*.md').forEach((file) => {
    copyFileSync(file, file.replace('./', 'docs/'));
});
