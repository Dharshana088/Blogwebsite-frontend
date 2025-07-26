import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/blog";
import BlogEditor from "../components/BlogEditor";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (getBlogById) {
          const res = await getBlogById(id);
          if (setBlog) setBlog(res?.data?.blog);
        }
      } catch (err) {
        if (console?.error) console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    if (fetchBlog) fetchBlog();
  }, [id]);

  const handleUpdate = async (formData) => {
    const token = localStorage?.getItem?.("token");
    if (updateBlog) await updateBlog(id, formData, token);
    if (navigate) navigate("/blogs");
  };

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <BlogEditor initialData={blog} onSubmit={handleUpdate} isEditMode={true} />
  );
};

export default EditBlog;
