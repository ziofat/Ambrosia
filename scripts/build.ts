import {
    readFileSync, writeFileSync,
    existsSync, mkdirSync,
    copyFileSync,
} from 'fs';
import { resolve, join } from 'path';
import { sync } from 'fast-glob';
import { Recipe } from './parser';
import { CATEGORIES } from './categories';

sync('./recipes/**/*.cook').map((file) => {
    const [, course] = file.match(/recipes\/(.+)\/(.+)\.cook$/)!;
    const source = `>> course: ${course}\n${readFileSync(file, 'utf8')}`;
    const name = file.split('/').pop()?.replace('.cook', '') ?? '';
    try {
        return new Recipe(name, source);
    } catch (e) {
        console.error(`Failed to parse ${file}`, e);
        return null;
    }
}).map((recipe) => {
    if (!recipe) return null;
    const md = recipe.toMarkdown();
    const path = resolve(__dirname, '../docs/recipes', recipe.course);
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
    writeFileSync(join(path, `${recipe.name}.md`), md, 'utf-8');
    return recipe;
}).reduce((acc, recipe) => {
    if (!recipe) return acc;
    const { name, course } = recipe;
    const [categories] = acc;
    categories[course] = categories[course] ?? [];
    categories[course].push(name);
    return acc;
}, [{}])
    .map((acc) => Object.entries<string[]>(acc)
        .forEach(([category, recipes]) => {
            const md = recipes.map((name) => `- [${name}](${name}.md)`).join('\n');
            const title = CATEGORIES.find((c) => c.id === category)?.text ?? '';
            writeFileSync(resolve(__dirname, `../docs/recipes/${category}/README.md`), `# ${title}\n\n${md}`, 'utf-8');
        }));

sync('./recipes/**/*.md').forEach((file) => {
    copyFileSync(file, file.replace('./', 'docs/'));
});
