/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { useThemeData as utd } from '@vuepress/plugin-theme-data/client';
// @ts-ignore
import type { ThemeDataRef } from '@vuepress/plugin-theme-data/client';
import { AmborsiaKitchenTheme } from './theme-config';

export const useThemeData = (): ThemeDataRef<AmborsiaKitchenTheme> => utd<AmborsiaKitchenTheme>();
