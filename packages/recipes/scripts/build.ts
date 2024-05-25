import {
    readFileSync, writeFileSync,
    existsSync, mkdirSync,
    copyFileSync,
} from 'fs';
import { resolve, join } from 'path';
import { sync } from 'fast-glob';
import { Recipe, IRecipeDependency } from './recipe';
import { cookToMarkdown, IDependency } from './cook-to-md';
import { getCreatedTime } from './utils';

const dependencyMap = new Map<string, IRecipeDependency[]>();

function getDeps(recipe: string): IDependency[] | null {
    if (dependencyMap.has(recipe)) {
        const children = dependencyMap.get(recipe)!;
        return children.map((dep) => ({ deps: getDeps(dep.name), name: dep.name, link: dep.recipe }));
    }
    return null;
}

Promise.all(sync('./src/**/*.am').map((file) => {
    const [, course] = file.match(/src\/(.+)\/(.+)\.am$/)!;
    const source = `>> course: ${course}\n${readFileSync(file, 'utf8')}`;
    const name = file.split('/').pop()?.replace('.am', '') ?? '';
    try {
        return new Recipe(name, source);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Failed to parse ${file}`, e);
        return null;
    }
}).filter((recipe): recipe is Recipe => {
    if (!recipe) return false;

    if (recipe.dependencies.length > 0) {
        [...new Set(recipe.variants.concat([recipe.name]))].forEach((v) => {
            dependencyMap.set(v, recipe.dependencies);
        });
    }
    return true;
}).map(async (recipe) => {
    const { course = 'other' } = recipe.metadata;
    const path = resolve(__dirname, '../lib', course);
    const createdTime = await getCreatedTime([resolve(__dirname, '../src', course, `${recipe.name}.am`)], process.cwd());
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
    const deps = getDeps(recipe.name);
    const md = cookToMarkdown(recipe, { createdTime }, deps);
    writeFileSync(join(path, `${recipe.name}.md`), md, 'utf-8');
    return recipe;
})).then(() => {
    sync('./src/**/*.md').forEach((file) => {
        copyFileSync(file, file.replace('./src', './lib/'));
    });
});
