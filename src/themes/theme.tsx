export const theme = {
  name: "Default",
  backgroundColor: "#fff",
  palette: {
    primary: {
      main: "#556cd6",
      light: "",
      dark: "#d39000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#19857b",
    },
    tertiary: {
      main: "#556cd6",
      light: "",
      dark: "#d39000",
    },
    error: {
      main: "#fff",
    },
    background: {
      default: "#fff",
    },
  },
};

export const darkTheme = {
  name: "Dark",
  backgroundColor: "#121212",
  palette: {
    primary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7000ad",
      light: "#a443e0",
      dark: "#3c007c",
    },
    tertiary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
    },
    error: {
      main: "#ff6b6b",
    },
    background: {
      default: "#121212",
    },
  },
  buttons: {
    corners: "rounded",
    primary: {
      bg: "#fff",
      fg: "#000000",
      hfg: "#fff",
      hbg: "#212121",
      accent: "",
      // bg: "#7000ad",
      // fg: "#fff",
      // hfg: "#fff",
      // hbg: "#a443e0",
      // accent: "",
    },
    secondary: {
      bg: "#484848",
      fg: "#fff",
      hfg: "#212121",
      hbg: "#fff",
      accent: "",
    },
    tertiary: {
      bg: "#212121",
      fg: "#fff",
      hfg: "#fff",
      hbg: "#212121",
      accent: "#484848",
      haccent: "#fff",

      // bg: "#212121",
      // fg: "#fff",
      // hfg: "#a443e0",
      // hbg: "#212121",
      // accent: "#fff",
      // haccent: "#a443e0",
      // hfg: "#212121",
      // hbg: "#fff",
      // accent: "#fff",
    },
  },
  card: {
    border: "",
  },
  formField: {
    style: "",
    labelfg: "",
    labelbg: "",
    inputbg: "",
    outline: "",
    focusOutline: "",
    errorfg: "",
  },
  breakpoints: {
    mobile: `(min-width: 575.98px) and (max-width: 768px)`,
    mobileAndAbove: `(min-width: 575.98px)`,
    tablet: `(min-width: 768px) and (max-width: 992px)`,
    tabletAndAbove: `(min-width: 768px)`,
    desktopAndAbove: `(min-width: 993px)`,
    lgDesktopAndAbove: `(min-width: 1300px)`,
  },
};
