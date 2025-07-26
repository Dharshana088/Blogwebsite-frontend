import API from "./api";

export const createBlog = (blogData) => {
  const formData = new FormData();
  
  

  formData.append('title', blogData.title);
  formData.append('content', blogData.content);
  
  
  if (blogData.tags) {
    formData.append('tags', blogData.tags);
  }
  
  
  if (blogData.images && blogData.images.length > 0) {
    blogData.images.forEach((image) => {
      formData.append('images', image);
    });
  }

  return API.post('/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const getBlogs = () => API.get("/blogs");
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);
export const updateBlog = (id, formData) =>
  API.put(`/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
