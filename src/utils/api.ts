import axios from "axios";
import User from "../types/user.types";
import { router } from "../routes/routes";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const user: User = JSON.parse(String(localStorage.getItem("user")));

      if (!user || !user.accessToken) {
        router.navigate("/login");
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh-token`,
          { access_token: user.accessToken },
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        );

        const newUser: User = { ...user, accessToken: data.access_token };
        localStorage.setItem("user", JSON.stringify(newUser));

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        // Redirect to login
        router.navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
