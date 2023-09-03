import { Grid, Typography } from "@mui/material";
import React from "react";
import { DateTime } from "luxon";
type Props = {};

export const DashboardHeader = (props: Props) => {
  return (
    <Grid
      container
      component={"header"}
      py={".6rem"}
      px={"1rem"}
      sx={(theme) => ({ background: theme.palette.primary.light })}
      justifyContent={"space-between"}
    >
      <Grid item>
        
        <Typography>{DateTime.now().setLocale("fa").toLocaleString()}</Typography></Grid>
    </Grid>
  );
};
