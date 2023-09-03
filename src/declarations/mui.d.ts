import {ColorPartial} from "@mui/material/styles/createPalette"
declare module "@mui/material/styles" {
  interface PaletteOptions {
    primary?: PaletteColorOptions;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
    lighter?: string;
  }
  interface PaletteColor {
    darker?: string;
    lighter?: string;
  }
  type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;


}
