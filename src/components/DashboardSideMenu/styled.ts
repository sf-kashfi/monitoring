import { Box, Typography, styled } from "@mui/material";
import {NavLink} from "react-router-dom"
export const SideMenuNavLink = styled(NavLink)(({theme})=>({
 textDecoration:"none",
 color:"black",
 fontFamily:theme.typography.fontFamily
}))
export const SideMenuItem = styled(Typography)(({theme})=>({
    textAlign:"center",
    padding:".7rem",
    backgroundColor:theme.palette.primary.light,
    marginBottom:".4rem",
    fontSize:".8rem",
    "&:hover":{
        backgroundColor:theme.palette.primary.main,
        cursor:"pointer"

    },
    "&.active":{
        backgroundColor:theme.palette.primary.main,    fontWeight:"bold",


    }
}))

 