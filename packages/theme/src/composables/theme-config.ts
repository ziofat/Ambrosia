export interface NavItem {
    text: string
    ariaLabel?: string
}

/**
   * Base nav group, has nav items children
   */
export interface NavGroup<T> extends NavItem {
    children: T[]
}

/**
   * Props for `<AutoLink>`
   */
export interface NavLink extends NavItem {
    link: string
    icon?: string
    rel?: string
    target?: string
    activeMatch?: string
}

/**
   * Navbar types
   */
// user config
export type NavbarItem = NavLink;
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[];

export type SidebarItem = NavItem & Partial<NavLink>;
export type SidebarGroup = SidebarItem & NavGroup<SidebarItem | SidebarGroup | string>;
export type SidebarGroupCollapsible = SidebarGroup & {
    collapsible?: boolean
};
export type SidebarConfig = (SidebarItem | SidebarGroupCollapsible | string)[];

export interface AmborsiaKitchenTheme {
    navbar?: false | NavbarConfig;
    sidebar?: false | { [key in string]: SidebarConfig };
    categories: { id: string; text: string; icon?: string }[];
}
