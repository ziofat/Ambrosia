import { useThemeData as utd } from '@vuepress/plugin-theme-data/lib/client';
import type { ThemeDataRef } from '@vuepress/plugin-theme-data/lib/client';
import { AmborsiaKitchenTheme } from './theme-config';

export const useThemeData = (): ThemeDataRef<AmborsiaKitchenTheme> => utd<AmborsiaKitchenTheme>();
