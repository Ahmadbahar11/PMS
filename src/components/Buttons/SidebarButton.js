"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ Add pathname
import { Button } from "@mui/material";

const SidebarButton = ({ label, path }) => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route
  const isActive = pathname === path; // check if current page matches

  const handleClick = () => {
    router.push(path); // ✅ Navigate
  };

  return (
    <Button
      fullWidth
      onClick={handleClick}
      sx={{
        borderRadius: 0,
        border: "none",
        boxShadow: "none",
        justifyContent: "center",
        px: 2,
        py: 1.2,
        fontWeight:800,
        backgroundColor: isActive ? "#0D213CEB" : "white", // 🔥 active = hover style
        color: isActive ? "white" : "black",
        textTransform: "none",
        fontWeight: isActive ? "bold" : 500, // active = bold
        fontSize: "16px",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#0D213CEB",
          color: "white",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default SidebarButton;
