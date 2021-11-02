import { theme, theme2 } from '../src/themes/theme';
import { withThemesProvider } from "themeprovider-storybook";

export const decorators = [withThemesProvider([theme, theme2])];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}