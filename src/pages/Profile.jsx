import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { Edit, PhotoCamera, Save, Cancel } from "@mui/icons-material";
import {
  getUserProfile,
  updateUserProfile,
  getUserBlogs,
} from "../services/user";
import MyBlogCard from "../components/MyBlogCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "", bio: "" });
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, blogsRes] = await Promise.all([
          getUserProfile(),
          getUserBlogs(),
        ]);
        setUser(profileRes.data.user);
        setBlogs(blogsRes.data.blogs);
        setFormData({
          username: profileRes.data.user.username,
          bio: profileRes.data.user.bio || "",
        });

        if (profileRes.data.user.avatar) {
          if (typeof profileRes.data.user.avatar === "string") {
            setAvatarUrl(profileRes.data.user.avatar);
          } else if (profileRes.data.user.avatar.filename) {
            setAvatarUrl(
              `http://localhost:5000/uploads/blogs${profileRes.data.user.avatar.filename}`
            );
          }
        }
        console.log("User avatar data:", profileRes.data.user.avatar);
        console.log("Avatar URL set to:", profileRes.data.user.avatar);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await updateUserProfile(formData);
      setUser(res.data.user);

      if (res.data.user.avatar) {
        let newAvatarUrl;
        if (typeof res.data.user.avatar === "string") {
          newAvatarUrl = `${res.data.user.avatar}?t=${Date.now()}`;
        } else if (res.data.user.avatar.filename) {
          newAvatarUrl = `http://localhost:5000/uploads/blogs/${
            res.data.user.avatar.filename
          }?t=${Date.now()}`;
        }
        setAvatarUrl(newAvatarUrl);
        console.log("New avatar uploaded, URL:", newAvatarUrl);
      }
    } catch (err) {
      console.error("Failed to update avatar:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUserProfile(formData);
      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleDeleteBlog = (deletedId) => {
    setBlogs(blogs.filter((blog) => blog._id !== deletedId));
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "white",
        }}
      >
        <CircularProgress size={60} sx={{ color: "black" }} />
      </Box>
    );
  }

  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white", color: "black" }}>
      <Box sx={{ bgcolor: "white", borderBottom: "1px solid #ddd", py: 8 }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={avatarUrl}
                  alt={user.username}
                  sx={{
                    width: 200,
                    height: 200,
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    bgcolor: "#f5f5f5",
                  }}
                  onError={(e) => {
                    console.log("Avatar failed to load:", avatarUrl);
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    bgcolor: "#f5f5f5",
                    color: "#666",
                    border: "1px solid #ddd",
                    "&:hover": { bgcolor: "#eee", color: "#333" },
                    width: 40,
                    height: 40,
                  }}
                >
                  <PhotoCamera />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              {editMode ? (
                <Box>
                  <TextField
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{
                      mb: 3,
                      "& .MuiInputLabel-root": { color: "#666" },
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#999" },
                        "&.Mui-focused fieldset": { borderColor: "black" },
                      },
                    }}
                  />
                  <TextField
                    name="bio"
                    label="Bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      mb: 3,
                      "& .MuiInputLabel-root": { color: "#666" },
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#999" },
                        "&.Mui-focused fieldset": { borderColor: "black" },
                      },
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSubmit}
                      sx={{
                        bgcolor: "black",
                        color: "white",
                        "&:hover": { bgcolor: "#333" },
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={() => setEditMode(false)}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          borderColor: "#333",
                          bgcolor: "rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="h2"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: "black" }}
                  >
                    {user.username}
                  </Typography>
                  {user.bio && (
                    <Typography
                      variant="h6"
                      sx={{ mb: 3, color: "#666", lineHeight: 1.6 }}
                    >
                      {user.bio}
                    </Typography>
                  )}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => setEditMode(true)}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          borderColor: "#333",
                          bgcolor: "rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, py: 6 }}>
        <Card
          sx={{
            mb: 4,
            borderRadius: 4,
            bgcolor: "white",
            border: "1px solid #ddd",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight={600}
              gutterBottom
              sx={{ color: "black" }}
            >
              My Blogs ({blogs.length})
            </Typography>

            {blogs.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  No blogs yet
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {blogs.map((blog) => (
                  <Grid item xs={12} md={6} lg={4} key={blog._id}>
                    <MyBlogCard blog={blog} onDelete={handleDeleteBlog} />
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
