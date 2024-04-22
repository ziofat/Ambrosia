import algoliasearch from 'algoliasearch';
import { sync } from 'fast-glob';
import {
    readFileSync, writeFileSync,
    existsSync, mkdirSync,
    copyFileSync,
} from 'fs';
import { cookToJson, RecipeRecord } from './cook-to-json';
import { Recipe } from './recipe';

const { ALGOLIA_API_KEY = '' } = process.env;

const client = algoliasearch('52DE6Z0WUS', ALGOLIA_API_KEY);
const index = client.initIndex('ambrosia_recipes');

const existingRecipes: RecipeRecord[] = [];
const records: RecipeRecord[] = [];

function updateIndex() {
    const idMap = existingRecipes.reduce((acc, { objectID, url }) => {
        acc[url] = objectID;
        return acc;
    }, {} as Record<string, string>);

    sync('./recipes/**/*.cook').map((file) => {
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
    }).forEach((recipe) => {
        if (!recipe) return;
        records.push(...cookToJson(recipe, idMap));
    });

    index.saveObjects(records).then(() => {
        console.log('Successfully indexed recipes.');
    }).catch((err) => {
        console.error('Failed to index recipes');
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
