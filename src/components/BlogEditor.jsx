import React, { useState, useRef, useEffect } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const BlogEditor = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageCount, setImageCount] = useState(
    (initialData?.content?.match(/<img /g) || [])?.length || 0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData?.content) {
      setContent(initialData?.content);
    }
  }, [initialData]);

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files || []);

    if ((files?.length || 0) + imageCount > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validImages = files?.filter(
      (file) => file?.type?.startsWith("image/") && file?.size <= MAX_IMAGE_SIZE
    );

    if (validImages?.length !== files?.length) {
      setError("Only image files under 5MB are allowed");
      return;
    }

    validImages?.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const quill = quillRef?.current?.getEditor?.();
        if (quill) {
          const range = quill?.getSelection?.(true);
          if (range) {
            quill?.insertEmbed?.(range?.index, "image", reader?.result);
            quill?.setSelection?.(range?.index + 1);
            setImageCount((prev) => prev + 1);
          }
        }
      };
      reader?.readAsDataURL?.(file);
    });

    setError(null);
    if (e?.target) {
      e.target.value = "";
    }
  };

  const getFirstImageFromContent = (html) => {
    const match = html?.match?.(/<img[^>]+src=["']([^"']+)["']/);
    return match ? match[1] : "";
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

    const formData = new FormData();
    formData?.append?.("title", title);
    formData?.append?.("tags", tags);
    formData?.append?.("content", content);
    formData?.append?.("coverImage", getFirstImageFromContent(content));

    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (err) {
      setError("Failed to submit blog", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? "Edit Blog" : "Write a New Blog Post"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e?.target?.value)}
        sx={{ mb: 3 }}
      />

      <TextField
        label="Tags (comma separated)"
        variant="outlined"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e?.target?.value)}
        sx={{ mb: 3 }}
        placeholder="technology, programming, web development"
      />

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
          <IconButton onClick={() => fileInputRef?.current?.click?.()}>
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
        {isEditMode ? "Update Blog" : "Publish Blog"}
      </Button>
    </Box>
  );
};

export default BlogEditor;
