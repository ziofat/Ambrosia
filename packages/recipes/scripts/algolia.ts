import algoliasearch from 'algoliasearch';
import { sync } from 'fast-glob';
import { getCreatedTime } from '@vuepress/plugin-git';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { cookToJson, RecipeRecord } from './cook-to-json';
import { Recipe } from './recipe';

const secretPath = resolve(__dirname, '../secrets.json');
let ALGOLIA_API_KEY = '';
if (existsSync(secretPath)) {
    const secrets = JSON.parse(readFileSync(secretPath, 'utf-8'));
    ({ ALGOLIA_API_KEY } = secrets);
} else {
    ({ ALGOLIA_API_KEY = '' } = process.env);
}

const client = algoliasearch('52DE6Z0WUS', ALGOLIA_API_KEY);
const index = client.initIndex('ambrosia_recipes');

const existingRecipes: RecipeRecord[] = [];
const records: RecipeRecord[] = [];

function updateIndex() {
    const idMap = existingRecipes.reduce((acc, { objectID, url }) => {
        acc[url] = objectID;
        return acc;
    }, {} as Record<string, string>);

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
    }).map(async (recipe) => {
        if (!recipe) return [];
        const { course = 'other' } = recipe.metadata;
        const createdTime = await getCreatedTime([resolve(__dirname, '../src', course, `${recipe.name}.am`)], process.cwd());
        return cookToJson(recipe, idMap, createdTime);
    })).then((recipes) => {
        recipes.forEach((recipe) => {
            records.push(...recipe);
        });
        index.saveObjects(records).then(() => {
            console.log('Successfully indexed recipes.');
        }).catch((err) => {
            console.error('Failed to index recipes');
        });
        const deleted = existingRecipes.filter((recipe) => {
            const exist = records.some((r) => r.objectID === recipe.objectID);
            return !exist;
        }).map((r) => r.objectID);
        if (deleted.length > 0) {
            console.log(deleted);
            // index.deleteObjects(deleted);
        }
    });
}

index.browseObjects<RecipeRecord>({
    batch: (batch) => {
        existingRecipes.push(...batch);
    },
})
    .catch((err) => console.error(err))
    .then(() => {
        updateIndex();
    });
