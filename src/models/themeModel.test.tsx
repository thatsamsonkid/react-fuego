import { ThemeValue } from "./themeModel";

export const sampleTheme = {
  formField: {
    style: "",
    bg: "#212121",
    fg: "#fff",
    labelfg: "",
    labelbg: "",
    inputbg: "",
    outline: "",
    focusOutline: "",
    errorfg: "",
  },
};

describe("Theme Value Accessor", () => {
  it("Return valid value if theme and path exist", () => {
    const result = ThemeValue(sampleTheme, ["formField", "bg"]);
    expect(result).toMatch("#212121");
  });

  it("Return empty string when theme null", () => {
    const result = ThemeValue(null, ["formField", "bg"]);
    expect(result).toMatch("");
  });

  it("Return empty string when path does not exist in theme", () => {
    const result = ThemeValue(sampleTheme, ["formField", "rando"]);
    expect(result).toMatch("");
  });
});
