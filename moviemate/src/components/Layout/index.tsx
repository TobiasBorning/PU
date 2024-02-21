import { ReactNode } from "react";
import { Box } from "@mui/material";

interface LayoutProps {
    children: ReactNode;     
}

import React from 'react';

const Layout = ({ children }: LayoutProps) => {
    return <Box sx={{ 
        backgroundColor: "£10583F",
        display: "flex",
        flexDirection: {
            xs: "coloumn",
            lg: "row",
        },
        color: "white",
        padding: 3,
        gap: 3, 
        overflowY: "hidden",
        height: "100vh",
    }}
    >

    </_Box>;
    
};

export default Layout;