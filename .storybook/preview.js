import { theme, darkTheme } from '../src/themes/theme';
import { withThemesProvider } from "themeprovider-storybook";

export const decorators = [withThemesProvider([darkTheme])];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}