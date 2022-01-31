export type ThemeLevel = "primary" | "secondary" | "tertiary";

export function ThemeValue(theme: any, path: Array<string>) {
  if (!theme || path.length === 0) return "";
  let result = theme;
  for (let i = 0; i < path.length; i++) {
    const property = path[i];
    if (!(result && result[property])) {
      return "";
    } else {
      result = result[property];
    }
  }
  return result;
}
