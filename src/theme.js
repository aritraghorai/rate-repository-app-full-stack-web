import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    laguageBackground: "#0366d6",
    mainBackground: "gray",
    errorColor: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: "System",
    android: "Roboto",
    ios: "Arial",
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};
export const font =
  Platform.OS == "android" ? theme.fonts.android : theme.fonts.ios;

export default theme;
