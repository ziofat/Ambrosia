import { useThemeData as utd } from '@vuepress/plugin-theme-data/lib/client';
import type { ThemeDataRef } from '@vuepress/plugin-theme-data/lib/client';

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
    rel?: string
    target?: string
    activeMatch?: string
}

/**
   * Navbar types
   */
// user config
export type NavbarItem = NavLink
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]

interface AmborsiaKitchenTheme {
    navbar: false | NavbarConfig;
}

export const useThemeData = (): ThemeDataRef<AmborsiaKitchenTheme> => utd<AmborsiaKitchenTheme>();
