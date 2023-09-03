import { Box, Typography } from "@mui/material";
import React from "react";
import { persion } from "../../constants/persian";
import { Outlet } from "react-router-dom";

export const DashboardMain = () => {
  return (
    <Box
      component={"main"}
      height={"100%"}
      sx={(theme) => ({
        border: `2px solid ${theme.palette.primary.main}`,
        px: ".4rem",
      })}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography textAlign={"center"} fontWeight={"bold"} py={"1rem"}>
        {persion.DASHBOARD}
      </Typography>
      <Box flexGrow={1} display={"flex"}>
        <Outlet />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        p=".5rem"
        borderTop={(theme) => `1px solid ${theme.palette.primary.main}`}
      >
        <Typography fontSize={".7rem"}>{persion.DATX}</Typography>
        <Typography fontSize={".7rem"}>{`${persion.VERSION} 1.0`}</Typography>
      </Box>
    </Box>
  );
};
