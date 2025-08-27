"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormTextField from "../components/TextFields/FormTextField";        
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {loginUser} from "../services/Users"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

   const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // ✅ Call wrapper function (uses axiosInstance + makeApiRequest)
      const res = await loginUser({
        email: email,
        password: password,
      });

      if (res?.token) {
        // ✅ Save token in cookie for 1 day
        setCookie("token", res.token, { maxAge: 60 * 60 * 24 });

        // ✅ Redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error(res?.message || "No token returned from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex" }}>
      {/* Left Panel */}
      <Box
        sx={{
          width: "40%",
          backgroundColor: "#073B4C",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "800", mb: 2 }}>
          Performance <br /> Management <br /> System
        </Typography>
        <Box
          component="img"
          src="/assets/smart-fusion-signin.png"
          alt="Smart Fusion Logo"
          sx={{ width: 200, height: 200 }}
        />
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: "60%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sign In
        </Typography>

        <Box width="100%" maxWidth={400}>
          {error && <Alert severity="error">{error}</Alert>}

          <FormTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormTextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box textAlign="right" mt={1} mb={2}>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              Forgot Password?
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              backgroundColor: "#073B4C",
              color: "#fff",
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
