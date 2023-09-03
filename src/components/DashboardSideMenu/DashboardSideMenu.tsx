import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { persion } from "../../constants/persian";
import { SideMenuItem, SideMenuNavLink } from "./styled";
import { dashboardSideMenuItems } from "./menu-items";

export const DashboardSideMenu = () => {

  return (
    <Box
      component={"aside"}
      height={"100%"}
      sx={(theme) => ({
        border: `2px solid ${theme.palette.primary.main}`,
        px: ".4rem",
      })}
    >
      <Typography textAlign={"center"} fontWeight={"bold"} py={"1rem"}>
        {persion.ASAN_BOURSE}
      </Typography>
      <SideMenuItem className="active" sx={{ fontSize: "1rem" }}>
        {persion.INDEX}
      </SideMenuItem>
      <Box>
        {dashboardSideMenuItems.map(({ title, path, dataAttribute }) => (
          <SideMenuNavLink to={path} key={path} data-cy={dataAttribute}>
            {({ isActive }) => (
              <SideMenuItem className={isActive ? "active" : ""}>
                {title}
              </SideMenuItem>
            )}
          </SideMenuNavLink>
        ))}
      </Box>
    </Box>
  );
};
