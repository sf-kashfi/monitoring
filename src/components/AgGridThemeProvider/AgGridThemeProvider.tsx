import { Box, Theme } from "@mui/material";
import React, { PropsWithChildren } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const AgGridThemeProvider = ({ children }: PropsWithChildren) => {
  const getCssVars = (theme: Theme) => ({
    "--ag-font-family ": theme.typography.fontFamily,
    "--ag-header-background-color": theme.palette.primary.light,
    "--ag-selected-row-background-color": theme.palette.primary.lighter,
    "--ag-alpine-active-color": theme.palette.primary.main,
    "--ag-row-hover-color": theme.palette.primary.lighter,
    "--ag-borders": "none",
  });
  return (
    <Box
      sx={(theme) => ({
        "&.ag-theme-alpine": {
          flex: 1,
          ...getCssVars(theme),
          "* .ag-theme-alpine": {
            ...getCssVars(theme),
            "--ag-header-background-color": theme.palette.grey,
          },
        },
      })}
      className="ag-theme-alpine"
    >
      {children}
    </Box>
  );
};
