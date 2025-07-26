import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { deleteBlog } from "../services/blog";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const MyBlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window?.confirm?.("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog?.(blog?._id);
        if (onDelete) onDelete(blog?._id);
      } catch (err) {
        console?.error?.("Failed to delete blog:", err);
      }
    }
  };

  return (
    <Card
      onClick={() => navigate?.(`/blogs/${blog?._id}`)}
      sx={{
        mb: 2,
        height: 280,
        display: "flex",
        flexDirection: "column",
        borderTop: "4px solid #191919",
        bgcolor: "#f8f9fa",
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.875rem" }}
            >
              {new Date(blog?.createdAt)?.toLocaleDateString?.("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            mb: 2,
            color: "#111827",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.4,
          }}
        >
          {blog?.title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 2,
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.6,
            flexGrow: 1,
          }}
        >
          {stripHtml?.(blog?.content)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: "auto",
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {blog?.tags?.slice?.(0, 3)?.map?.((tag, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: "#191919",
                  color: "#fff",
                  px: 1,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  borderRadius: 1,
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={(e) => {
                e?.stopPropagation?.();
                navigate?.(`/edit/${blog?._id}`);
              }}
              color="primary"
              size="small"
              sx={{
                "&:hover": {
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e?.stopPropagation?.();
                handleDelete?.();
              }}
              color="error"
              size="small"
              sx={{
                "&:hover": {
                  bgcolor: "rgba(239, 68, 68, 0.1)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyBlogCard;
