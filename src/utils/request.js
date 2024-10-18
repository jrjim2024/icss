import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/utils/token.js";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 0,
});

// 攔截 request
service.interceptors.request.use(
  (config) => {
    config.headers["accept"] = "application/json";
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (
      config.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      // 轉data為URL編碼格式
      const formData = new URLSearchParams();
      for (const key in config.data) {
        formData.append(key, config.data[key]);
      }
      config.data = formData.toString();
    } else if (config.headers["Content-Type"] != "multipart/form-data") {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

// 攔截 response
service.interceptors.response.use((response) => {
  if (
    response.data &&
    response.data.code === 401 &&
    response.data.content === "Unauthorized"
  ) {
    removeAccessToken();
    window.location.href = "/login";
  } else if (
    response.data &&
    response.data.code === 403 &&
    response.data.content.startsWith("License error")
  ) {
    const [title, msg] = response.data.content.split(":");
    errorStore.setValue({
      show: true,
      title: "License error",
      message: msg,
    });
  } else if (response.data && response.data.success === false) {
    const content = response.data.content;
    let title = errorStore.title;
    let message;
    if (typeof content === "string") {
      const sp = content.split(":", 1);
      title = errorStore.title
        ? errorStore.title
        : sp.length > 1
        ? sp[0]
        : null;
      message =
        errorStore.title || sp.length <= 1 ? content : sp.slice(1).join(":");
    } else if (content.reason) {
      message = content.reason;
    } else {
      return; // handle usually validation error, handle case-by-case.
    }
    errorStore.setValue({
      show: true,
      title: title,
      message: message,
    });
  } else if (
    response.headers["content-type"] ==
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return response;
  }

  return response.data;
});

export default service;
