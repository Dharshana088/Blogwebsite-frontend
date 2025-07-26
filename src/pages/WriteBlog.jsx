import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

axios.defaults.baseURL = "http://localhost:5000/api";

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const WriteBlog = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files || []);

    if (files.length + imageCount > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validImages = files.filter(
      (file) => file?.type?.startsWith("image/") && file?.size <= MAX_IMAGE_SIZE
    );

    if (validImages.length !== files.length) {
      setError("Only image files under 5MB are allowed");
      return;
    }

    validImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const quill = quillRef?.current?.getEditor?.();
        if (quill) {
          const range = quill?.getSelection?.(true);
          if (range) {
            quill?.insertEmbed?.(range.index, "image", reader?.result);
            quill?.setSelection?.(range.index + 1);
            setImageCount((prev) => prev + 1);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    setError(null);
    if (e?.target) {
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!title?.trim?.()) {
      setError("Please enter a title");
      return;
    }

    if (!content?.trim?.()) {
      setError("Please enter some content");
      return;
    }

    const token = localStorage?.getItem?.("token");
    if (!token) {
      setError("Please log in to publish a blog");
      navigate?.("/login");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData?.append?.("title", title);
      formData?.append?.("tags", tags);
      formData?.append?.("content", content);

      if (coverImageFile) {
        formData?.append?.("coverImage", coverImageFile);
      }

      await axios?.post?.("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate?.("/blogs");
    } catch (err) {
      if (err?.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        navigate?.("/login");
      } else {
        setError(err?.response?.data?.message || "Failed to publish blog");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Write a New Blog Post
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError?.(null)}>
          {error}
        </Alert>
      )}

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle?.(e?.target?.value)}
        sx={{ mb: 3 }}
      />

      <TextField
        label="Tags (comma separated)"
        variant="outlined"
        fullWidth
        value={tags}
        onChange={(e) => setTags?.(e?.target?.value)}
        sx={{ mb: 3 }}
        placeholder="technology, programming, web development"
      />

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Cover Image (optional, max 5MB):
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e?.target?.files?.[0];
            if (file?.size > MAX_IMAGE_SIZE) {
              setError?.("Cover image must be under 5MB");
            } else {
              setCoverImageFile?.(file);
              setError?.(null);
            }
          }}
        />
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            style={{ display: "none" }}
          />
          <IconButton
            onClick={() => {
              if (fileInputRef?.current?.click) fileInputRef.current.click();
            }}
          >
            <ImageIcon />
          </IconButton>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Insert Image ({imageCount}/{MAX_IMAGES})
          </Typography>
        </Box>

        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your content here..."
        />
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
      >
        {isSubmitting ? "Publishing..." : "Publish Blog"}
      </Button>
    </Box>
  );
};

export default WriteBlog;
