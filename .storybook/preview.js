import { theme, darkTheme } from '../src/themes/theme';
import { withThemesProvider } from "themeprovider-storybook";

// import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "./global.css";

export const decorators = [withThemesProvider([darkTheme, theme])];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}