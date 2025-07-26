import React, { useState, useEffect } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/user";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getUserProfile) {
          const response = await getUserProfile();
          if (setUser) setUser(response?.data?.user);
        }
      } catch (err) {
        if (console?.error) console.error("Failed to load user:", err);
      }
    };
    if (fetchUser) fetchUser();
  }, []);

  const handleClick = (e) => {
    if (setAnchorEl) setAnchorEl(e?.currentTarget);
  };

  const handleClose = () => {
    if (setAnchorEl) setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar
          src={user?.profilePicture || user?.avatar}
          alt={user?.name || user?.username}
        >
          {!user?.profilePicture &&
            !user?.avatar &&
            (user?.name || user?.username)?.charAt?.(0)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            if (navigate) navigate("/profile");
            if (handleClose) handleClose();
          }}
          sx={{ py: 1.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={user?.profilePicture || user?.avatar}
              alt={user?.name || user?.username}
              sx={{ width: 32, height: 32 }}
            >
              {!user?.profilePicture &&
                !user?.avatar &&
                (user?.name || user?.username)?.charAt?.(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                My Profile
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.name || user?.username}
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (localStorage?.removeItem) localStorage.removeItem("token");
            if (window?.location) window.location.href = "/";
          }}
          sx={{ py: 1.5 }}
        >
          <Typography>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
