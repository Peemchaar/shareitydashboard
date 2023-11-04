import { useSessionStore } from "@/stores/session";
import axios from "axios";

const sessionStorage = useSessionStore();

const config = {
  headers: {
    Authorization: "Bearer" + sessionStorage.sessionToken,
  },
};

const ServerCall = {
  get: async (route) => {
    return await axios.get(import.meta.env.VITE_API_HOST + route, config);
  },
  post: async (route, data) => {
    return await axios.post(
      import.meta.env.VITE_API_HOST + route,
      data,
      config
    );
  },
  patch: async (route, data) => {
    return await axios.patch(
      import.meta.env.VITE_API_HOST + route,
      data,
      config
    );
  },
  put: async (route, data) => {
    return await axios.put(import.meta.env.VITE_API_HOST + route, data, config);
  },
  delete: async (route) => {
    return await axios.delete(import.meta.env.VITE_API_HOST + route, config);
  },
  postMedia: async (route, data) => {
    const conf = {
      Headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + sessionStorage.sessionToken,
      },
    };
    return await axios.post(import.meta.env.VITE_API_HOST + route, data, conf);
  },
};

export default ServerCall;
