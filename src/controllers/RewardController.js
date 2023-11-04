import ServerCall from "./ServerCall";
import { useCookies } from "vue3-cookies";
import { useSessionStore } from "@/stores/session";

const sessionStore  = useSessionStore();
const cookies = useCookies();

const RewardController = {
  getAll: async () => {
    try {
      const response = await ServerCall.get("/reward/list-rewards");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (input) => {
    try {
      const usrId = sessionStore.getUserId() 
      const data = {
        title: input.title,
        description: input.description,
        type: input.type,
        point: input.point,
        imgBgReward: input.imgBgReward,
        imgBadReward: input.imgBadReward,
        userId: usrId,
      };

      const response = await ServerCall.post("/reward/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  giveReward: async (input) => {
    try{
      const data = {
        idUser: input.idUsr,
        idReward: input.reward
      };
      const response = await ServerCall.post("/reward/obtain-reward", data);
      return response.data;
    }catch (error) {
      throw error;
    }
  }
};

export default RewardController;
