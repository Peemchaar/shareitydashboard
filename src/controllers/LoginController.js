import ServerCall from "./ServerCall";
import json from "/assets/data/country-codes.json";
import { useSessionStore } from "@/stores/session";

const sessionStore = useSessionStore();

const LoginController = {
  login: async (email, password) => {
    try {
      const response = await ServerCall.post("/user/login", {
        email: email,
        password: password,
      }).then((resp) => {
        const userData = resp.data;
        sessionStore.setUserData(
          userData.user.id,
          userData.user.nickname,
          userData.accessToken,
          userData.user.rol
        );
        return true;
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    sessionStore.clearUserData();
  },
};

export default LoginController;
