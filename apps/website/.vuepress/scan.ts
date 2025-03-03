import { sync } from 'fast-glob';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import Jimp from "jimp";
import { CATEGORIES } from './categories';

Object.entries(sync('./recipes/**/*.md').reduce((acc, file) => {
    const match = /\.\/recipes\/(?<main>[^\/]+)\/(?<sub>[^\/]+)\/(?<title>[^\.]+)\.md$/.exec(file);
    if (match) {
        const [, main, sub, title ] = match;
        if (title === 'README') return acc;
        const category = `${main}/${sub}`;
        acc[category] = acc[category] ?? [];
        acc[category].push(title);
    }
    return acc;
}, {} as Record<string, string[]>)).forEach(([category, titles]) => {
    const md = titles.map((name) => `- [${name}](${name}.md)`).join('\n');
    const title = CATEGORIES.find((c) => c.id === category)?.text ?? '';
    writeFileSync(resolve(__dirname, `../recipes/${category}/README.md`), `# ${title}\n\n${md}`, 'utf-8');
});

writeFileSync(resolve(__dirname, '../recipes/README.md'), `---\nfinder: all\n---`, 'utf-8');

Promise.all(sync('./.vuepress/public/recipe-static/*.jpg').map((file) => new Promise((r) => {
    const path = resolve(__dirname, `.${file}`);
    Jimp.read(path).then((image) => {
        image
          .resize(320, 320)
          .quality(60)
          .write(path.replace('recipe-static', 'thumbnail'));
        r(true);
    }).catch(e => {
        console.error(e);
    })
}))).then(() => {
    console.log('files generated');
});
