import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { getBlogById } from "../services/blog";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery?.("(max-width:600px)");

  useEffect?.(() => {
    const fetchBlog = async () => {
      try {
        if (getBlogById) {
          const res = await getBlogById(id);
          if (setBlog) setBlog(res?.data?.blog);
        }
      } catch (err) {
        console?.error?.("Failed to fetch blog", err);
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    fetchBlog?.();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="error">
          Blog not found.
        </Typography>
      </Container>
    );
  }

  const renderContentWithImages = () => {
    const parts = blog?.content?.split?.(/\[IMAGE\]/gi);
    const elements = [];

    parts?.forEach?.((part, idx) => {
      if (part?.trim?.()) {
        elements?.push?.(
          <Typography
            key={`text-${idx}`}
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              fontSize: "1.125rem",
              color: "#374151",
              lineHeight: 1.8,
              mb: 4,
            }}
            dangerouslySetInnerHTML={{
              __html: part?.replace?.(/\n/g, "<br/>"),
            }}
          />
        );
      }

      if (idx === 0 && blog?.coverImage) return;

      if (blog?.images?.[idx]) {
        elements?.push?.(
          <Box
            key={`image-${idx}`}
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "90%",
                maxWidth: "800px",
                height: "380px",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={`http://localhost:5000/uploads/blogs/${blog?.images?.[idx]?.filename}`}
                alt={`blog-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Box>
        );
      }
    });

    return elements;
  };

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.3,
              color: "#111827",
              textAlign: isMobile ? "center" : "left",
              mb: isMobile ? 2 : 0,
            }}
          >
            {blog?.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#6b7280",
            }}
          >
            <Avatar
              src={
                blog?.author?.avatar?.filename
                  ? `http://localhost:5000/uploads/blogs/${blog?.author?.avatar?.filename}`
                  : "/default-avatar.png"
              }
              sx={{ width: 42, height: 42, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle2" color="#111827" fontWeight={600}>
                {blog?.author?.username || "Unknown"}
              </Typography>
              <Typography variant="caption">
                {new Date(blog?.createdAt)?.toLocaleDateString?.("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#d1d5db" }} />

        {blog?.coverImage && (
          <Box
            sx={{
              width: "100%",
              maxWidth: "750px",
              mx: "auto",
              mb: 5,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          ></Box>
        )}

        <Box
          sx={{
            width: "100%",
            maxWidth: "750px",
            mx: "auto",
            textAlign: "left",
          }}
        >
          {renderContentWithImages?.()}
        </Box>

        {blog?.tags?.length > 0 && (
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: "1px solid #e5e7eb",
              textAlign: "left",
              maxWidth: "750px",
              mx: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontSize: "1rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Keywords:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {blog?.tags?.map?.((tag, i) => (
                <Box
                  key={i}
                  sx={{
                    backgroundColor: "#111827",
                    color: "#fff",
                    px: 2,
                    py: 0.5,
                    fontSize: "1rem",
                    fontWeight: 500,
                    borderRadius: "999px",
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogDetails;
