import { createTheme } from "@mui/material/";
import { colors } from "../../constants/colors";
const palette = ({
  primary: {
    main: colors.gold.main,
    light: colors.gold.light,
    lighter: colors.gold.lighter,
    dark: colors.gold.dark,
    darker: colors.gold.darker,
  },
});

export const theme = createTheme({
  direction: "rtl",

  palette,
  typography: {
    fontFamily: [
      "IRANSans",
      "IRANSansFaNum",
      "tahoma",
      "arial",
      "verdana",
      "sans-serif",
    ].join(","),
  },
});
