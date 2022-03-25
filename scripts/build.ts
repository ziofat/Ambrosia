import {
    readFileSync, writeFileSync,
    existsSync, mkdirSync,
    copyFileSync,
} from 'fs';
import { resolve, join } from 'path';
import { sync } from 'fast-glob';
import { Recipe } from './parser';

sync('./recipes/**/*.cook').map((file) => {
    const source = readFileSync(file, 'utf8');
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
});

sync('./recipes/**/*.md').forEach((file) => {
    copyFileSync(file, file.replace('./', 'docs/'));
});

if (!existsSync('./docs/.vuepress')) {
    mkdirSync('./docs/.vuepress', { recursive: true });
}
copyFileSync('./scripts/config.ts', 'docs/.vuepress/config.ts');
