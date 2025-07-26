import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/users/me");
  return response;
};

export const updateUserProfile = async (data) => {
  if (data instanceof FormData) {
    return await api.put("/users/me", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return await api.put("/users/me", data);
};

export const getUserBlogs = async () => {
  const response = await api.get("/users/blogs");
  return response;
};