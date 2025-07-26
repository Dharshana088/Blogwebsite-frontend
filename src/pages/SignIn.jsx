import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = "";

    if (name === "email") {
      if (!value) message = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(value)) message = "Invalid email format";
    }

    if (name === "password") {
      if (!value) message = "Password is required";
      else if (value?.length < 6)
        message = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name && value !== undefined) validateField(name, value);
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setApiError("");

    const newErrors = {};

    if (!form?.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form?.email))
      newErrors.email = "Invalid email format";

    if (!form?.password) newErrors.password = "Password is required";
    else if (form?.password?.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors)?.length > 0) return;

    try {
      const res = await loginUser?.(form);
      if (res?.data?.user) {
        localStorage?.setItem?.("user", JSON.stringify(res?.data?.user));
        localStorage?.setItem?.("token", res?.data?.token);
        if (navigate) navigate("/blogs");
      }
    } catch (err) {
      setApiError(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 450 }}>
        <Typography variant="h3" align="center" fontWeight={700} mb={4}>
          WELCOME BACK!
        </Typography>

        {apiError && (
          <Typography color="error" align="center" mb={2}>
            {apiError}
          </Typography>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email *"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form?.email}
            onChange={handleChange}
            error={!!errors?.email}
            helperText={errors?.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password *"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form?.password}
            onChange={handleChange}
            error={!!errors?.password}
            helperText={errors?.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword?.(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              py: 1.2,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            SIGN IN
          </Button>
        </form>

        <Divider sx={{ my: 4 }}>or</Divider>

        <Typography align="center">
          Don't have an account?{" "}
          <Link to="/signup" style={{ fontWeight: 500 }}>
            Join us today
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
