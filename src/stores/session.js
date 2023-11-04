import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export const useSessionStore = defineStore("session", {
  state: () => ({
    userNickname: null,
    userId: null,
    accessToken: null,
    rol: null
  }),
  actions: {
    isLoged() {
      return cookies.get("accessToken");
    },
    getUserId() {
      const usrId = cookies.get("userId");
      return usrId
    },
    getUserNickname() {
      return cookies.get("userNickname");
    },
    getUserRole(){
      return cookies.get("userRole");
    },
    setUserData(id, nickname, token, rol){
      cookies.set("userId",id);
      cookies.set("accessToken",token);
      cookies.set("userNickname",nickname);
      cookies.set("userRole", rol)
    },
    clearUserData(){
      cookies.remove("userId");
      cookies.remove("accessToken");
      cookies.remove("userNickname");
      cookies.remove("userRole");
    }
  },
});
