import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, title, content, coverImage, createdAt, author } = blog ?? {};

  const resolvedCoverImage =
    coverImage?.filename && typeof coverImage?.filename === "string"
      ? `http://localhost:5000/uploads/blogs/${coverImage?.filename}`
      : null;

  const avatarUrl =
    author?.avatar?.filename && typeof author?.avatar?.filename === "string"
      ? `http://localhost:5000/uploads/blogs/${author?.avatar?.filename}`
      : null;

  return (
    <Card
      onClick={() => {
        if (navigate) navigate(`/blogs/${_id}`);
      }}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        minHeight: "280px",
        maxHeight: "350px",
        background: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "#191919",
          zIndex: 1,
        },
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          borderColor: "#d1d5db",
        },
      }}
    >
      <CardContent sx={{ p: 0, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              src={avatarUrl}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #f59e0b",
                bgcolor: "#f3f4f6",
              }}
            >
              {author?.username?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: "#111827", lineHeight: 1 }}
              >
                {author?.username || "Anonymous"}
              </Typography>
            </Box>
          </Stack>

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
              {createdAt
                ? new Date(createdAt)?.toLocaleDateString?.("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            height: "calc(100% - 80px)",
            px: 3,
            pb: 3,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              pr: resolvedCoverImage ? 3 : 0,
              minWidth: 0,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.4,
                mb: 2,
                color: "#111827",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#3b82f6",
                },
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.6,
                flexGrow: 1,
                fontSize: "1rem",
                color: "#6b7280",
              }}
            >
              {stripHtml?.(content)}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "200px",
              height: "100%",
              flexShrink: 0,
              borderRadius: 1.5,
              overflow: "hidden",
              bgcolor: resolvedCoverImage ? "transparent" : "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: resolvedCoverImage ? "none" : "2px dashed #d1d5db",
            }}
          >
            {resolvedCoverImage ? (
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                image={resolvedCoverImage}
                alt="cover"
                onError={(e) => {
                  if (e?.target) {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }
                }}
              />
            ) : (
              <Typography
                variant="body2"
                color="text.disabled"
                sx={{
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                }}
              >
                No Image
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
