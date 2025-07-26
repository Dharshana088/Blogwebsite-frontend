import API from './api'

export const registerUser = (data) => {
  return API.post('/auth/register', data)
}

export const loginUser = (data) => {
  return API.post('/auth/login', data)
}

export const forgotPassword = (email) => {
  return API.post('/auth/forgot-password', { email });
};

export const resetPassword = (token, newPassword) => {
  return API.post('/auth/reset-password', { token, newPassword });
};