export function resolveNavLinkItem(linkItem) {
    return Object.assign(linkItem, {
        type: linkItem.children && linkItem.children.length ? 'links' : 'link',
    });
}

export function resolveSidebarItem(linkItem) {
    return Object.assign(linkItem, {
        type: linkItem.children && linkItem.children.length ? 'group' : 'link',
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

export const isActiveLink = (link: string, route): boolean => {
    if (route.hash === link) {
        return true;
    }
    const currentPath = normalize(route.path);
    const targetPath = normalize(link);
    return currentPath === targetPath;
};

export const isActiveSidebarItem = (item, route): boolean => {
    if (item.link && isActiveLink(item.link, route)) {
        return true;
    }

    if (item.children) {
        return item.children.some((child) => isActiveSidebarItem(child, route));
    }

    return false;
};
