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
import { registerUser } from "../services/auth";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateField = (name, value) => {
    let message = "";

    if (name === "fullName") {
      if (!value) message = "Full name is required";
      else if (value?.trim?.()?.length < 3 || value?.trim?.()?.length > 30)
        message = "Full name must be 3-30 characters";
    }

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
    const { name, value } = e?.target ?? {};
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setErrors({});
    setApiError("");

    const newErrors = {};

    if (!form?.fullName) newErrors.fullName = "Full name is required";
    else if (
      form?.fullName?.trim?.()?.length < 3 ||
      form?.fullName?.trim?.()?.length > 30
    )
      newErrors.fullName = "Full name must be 3-30 characters";

    if (!form?.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form?.email))
      newErrors.email = "Invalid email format";

    if (!form?.password) newErrors.password = "Password is required";
    else if (form?.password?.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await registerUser?.({
        username: form?.fullName,
        email: form?.email,
        password: form?.password,
      });

      if (res?.data?.user) {
        if (login) login(res?.data?.user);
        localStorage?.setItem?.("user", JSON.stringify(res?.data?.user));
        localStorage?.setItem?.("token", res?.data?.token);
        if (navigate) navigate("/blogs");
      }
    } catch (err) {
      const message = err?.response?.data?.message;
      const backendErrors = err?.response?.data?.errors;

      if (backendErrors) {
        setErrors(backendErrors);
      } else {
        setApiError(message || "Registration failed.");
      }
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
          JOIN INKED.
        </Typography>

        {apiError && (
          <Typography color="error" align="center" mb={2}>
            {apiError}
          </Typography>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Full Name *"
            name="fullName"
            fullWidth
            margin="normal"
            value={form?.fullName}
            onChange={handleChange}
            error={!!errors?.fullName}
            helperText={errors?.fullName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

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
            SIGN UP
          </Button>
        </form>

        <Divider sx={{ my: 4 }}>or</Divider>

        <Typography align="center">
          Already a member?{" "}
          <Link to="/signin" style={{ fontWeight: 500 }}>
            Sign in here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
