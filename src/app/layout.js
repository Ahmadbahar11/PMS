"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./globals.css";

const theme = createTheme();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
