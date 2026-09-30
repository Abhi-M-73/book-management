import axios from "axios";

const Axios = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;

    // Login/Register ke 401 ko globally handle mat karo
    if (status === 401 && url !== "/auth/login") {
      console.log("Unauthorized / Session expired");
    }

    return Promise.reject(error);
  }
);

export default Axios;