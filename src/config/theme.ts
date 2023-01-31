import { darkThemePrimitives, createDarkTheme } from 'baseui';

const overrides = {
  colors: {
    linkHover: "#4e98ec"
  },
};

export const theme = createDarkTheme(darkThemePrimitives, overrides);
