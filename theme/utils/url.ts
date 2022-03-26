export function resolveNavLinkItem(linkItem) {
    return Object.assign(linkItem, {
        type: linkItem.children && linkItem.children.length ? 'links' : 'link',
    });
}

export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;

export function isExternal(path: string) {
    return /^[a-z]+:/i.test(path);
}

export function normalize(path) {
    return decodeURI(path)
        .replace(hashRE, '')
        .replace(extRE, '');
}

export function ensureExt(path) {
    if (isExternal(path)) {
        return path;
    }
    const hashMatch = path.match(hashRE);
    const hash = hashMatch ? hashMatch[0] : '';
    const normalized = normalize(path);

    if (endingSlashRE.test(normalized)) {
        return path;
    }
    return `${normalized}.html${hash}`;
}
