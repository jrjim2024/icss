import request from "@/utils/request";

export const postInference = (data, query, signal) => {
  // data: {images: [<binary>]}
  return request({
    url: "/api/inference",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: data,
    params: query,
    signal: signal, //取消信號
  });
};

export const getTempfile = (fileId) => {
  return request({
    url: `/api/tempfile/${fileId}`,
    method: "get",
    responseType: "blob",
  });
};

import request from "@/utils/request";

export const getMe = () => {
  return request({
    url: "/api/users/me",
    method: "get",
  });
};

export const patchMe = (data) => {
  // data: {
  //   email: <str>,
  //   password: <str>,
  //   name: <str>,
  // }
  return request({
    url: "/api/users/me",
    method: "patch",
    data: data,
  });
};

export const postPassword = (data) => {
  // data: {
  //   username: <str>
  //   password: <str>
  //   new_password: <str>,
  //   confirm_password: <str>,
  // }
  return request({
    url: "/api/users/me/password",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data,
  });
};

export const deleteMe = (data) => {
  // data: {
  //   username: <str>
  //   password: <str>
  return request({
    url: "/api/users/me",
    method: "delete",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data,
  });
};

export const getUsers = (data) => {
  return request({
    url: "/api/users",
    method: "get",
    data: data,
  });
};

// admin only
export const postUser = (data) => {
  // data: {
  //   account: <str>,
  //   email: <str>,
  //   password: <str>,
  //   name: <str>,
  //   is_active: <bool>,
  //   is_superuser: <bool>,
  // }
  return request({
    url: "/api/users",
    method: "post",
    data: data,
  });
};

// admin only
export const patchUser = (userId, data) => {
  // data: {
  //   email: <str>,
  //   password: <str>,
  //   name: <str>,
  //   is_active: <bool>,
  //   is_superuser: <bool>,
  // }
  return request({
    url: `/api/users/${userId}`,
    method: "patch",
    data: data,
  });
};

// admin only
export const deleteUser = (userId) => {
  return request({
    url: `/api/users/${userId}`,
    method: "delete",
  });
};
