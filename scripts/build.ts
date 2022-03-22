import { readFileSync } from 'fs';
import { sync } from 'fast-glob';
import { Recipe } from './parser';

const recipes = sync('./recipes/**/*.cook').map((file) => {
  const source = readFileSync(file, 'utf8');
  const name = file.split('/').pop()?.replace('.cook', '') ?? '';
  return new Recipe(name, source);
}).forEach(console.log)
