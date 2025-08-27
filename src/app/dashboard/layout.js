"use client";

import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SidebarButton from "@/components/Buttons/SidebarButton";

const drawerWidth = 260;

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Sidebar
  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      {/* Sidebar Header with logo and title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        <Box
          component="img"
          src="/assets/logo.png"
          alt="Smart Fusion"
          sx={{ width: 85, height: 60 }}
        />
        <Typography variant="subtitle1" sx={{letterSpacing:"0%",fontSize:"18px", fontFamily:"Roboto",fontWeight: "bold" ,color:"#0D213CEB",fontWeight:700 }}>
          Performance Management System
        </Typography>
      </Box>

      {/* Sidebar Menu */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
        <SidebarButton label="Dashboard" path="/dashboard" />
        <SidebarButton label="All Employees" path="/dashboard/employees" />
        <SidebarButton label="Add Employee Records" path="/dashboard/employee-record" />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden", // removes both horizontal + vertical scrollbars
      }}
    >
      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Box sx={{ width: drawerWidth, flexShrink: 0 }}>{drawer}</Box>
      )}

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            minHeight:95
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* Icons aligned right */}
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#fafafa",
            overflow: "auto", // content scrolls only if necessary
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
