import React, { Children } from 'react';
import { Box } from "@mui/material";

const navLinks = [
    {
        name: "Profil"
        icon: ProfileIcon
        link: "/Profil"
    },
    {
        name: "Hjemmeside"
        icon: HomeIcon
        link: "/Main"
    },
    {
        name: "Tilfeldig film"
        icon: MovieIcon
        link: "/Random"
    },
]

const Sidebar = () => {
    const {pathname} ) useLocation();
    return (
        <Box
        sx={{
            backgroundColor: "161d2f",
            padding: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: {
                xs: "column",
                lg: "row",
            },
            color: "white",
            padding: 3,
            gap: 3, 
            overflowY: "hidden",
            height: "100vh",
        }}
        >
            <Sidebar />
            <Box sx={{widht: "100%", overflowY: "scroll"}}>{Children}</Box>
        </Box>
            
        </div>
    );
};

export default Sidebar;