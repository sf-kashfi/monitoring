import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";
import { DashboardSideMenu } from "../../components/DashboardSideMenu";
import { DashboardHeader } from "../../components/DashboardHeader";
import { DashboardMain } from "../../components/DashboardMain";

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <Grid container direction={"column"} height={"100vh"}  >
      <Grid item>
        <DashboardHeader />
      </Grid>
      <Grid item container columns={10} gap={".5rem"} xs p=".5rem">
        <Grid item xs={2}>
          <DashboardSideMenu />
        </Grid>
        <Grid item xs>
          <DashboardMain />
        </Grid>
      </Grid>
    </Grid>
  );
};
