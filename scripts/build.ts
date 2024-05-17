import {
    readFileSync, writeFileSync,
    existsSync, mkdirSync,
    copyFileSync,
} from 'fs';
import { resolve, join } from 'path';
import { sync } from 'fast-glob';
import * as sharp from 'sharp';
import { getCreatedTime } from '@vuepress/plugin-git';
import { Recipe, IRecipeDependency } from './recipe';
import { CATEGORIES } from './categories';
import { cookToMarkdown, IDependency } from './cook-to-md';

let recipeCount = 0;
let variantsCount = 0;

const dependencyMap = new Map<string, IRecipeDependency[]>();

function getDeps(recipe: string): IDependency[] | null {
    if (dependencyMap.has(recipe)) {
        const children = dependencyMap.get(recipe)!;
        return children.map((dep) => ({ deps: getDeps(dep.name), name: dep.name, link: dep.recipe }));
    }
    return null;
}

Promise.all(sync('./recipes/**/*.cook').map((file) => {
    const [, course] = file.match(/recipes\/(.+)\/(.+)\.cook$/)!;
    const source = `>> course: ${course}\n${readFileSync(file, 'utf8')}`;
    const name = file.split('/').pop()?.replace('.cook', '') ?? '';
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
    const path = resolve(__dirname, '../docs/recipes', course);
    const createdTime = await getCreatedTime(resolve(__dirname, '../recipes', course, `${recipe.name}.cook`), process.cwd());
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
    const deps = getDeps(recipe.name);
    const md = cookToMarkdown(recipe, { createdTime }, deps);
    writeFileSync(join(path, `${recipe.name}.md`), md, 'utf-8');
    recipeCount += 1;
    variantsCount += recipe.variants.length ? recipe.variants.length - 1 : 0;
    return recipe;
})).then((recipes) => {
    recipes.reduce((acc, recipe) => {
        const { name } = recipe;
        const { course = 'other' } = recipe.metadata;
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

    writeFileSync(resolve(__dirname, '../docs/recipes/README.md'), `---\nfinder: all\ncount: ${recipeCount}\nvariants: ${variantsCount}\n---`, 'utf-8');

    sync('./recipes/**/*.md').forEach((file) => {
        copyFileSync(file, file.replace('./', 'docs/'));
    });
});

Promise.all(sync('./docs/.vuepress/public/recipe-static/*.jpg').map((file) => new Promise((r) => {
    const path = resolve(__dirname, `.${file}`);
    sharp(path)
        .resize(320)
        .toFile(path.replace('recipe-static', 'thumbnail'))
        .then(r);
}))).then(() => {
    console.log('files generated');
});
