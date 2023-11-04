import ServerCall from "./ServerCall";
import { useSessionStore } from "@/stores/session";

const sessionStore  = useSessionStore();


const AnimationController = {
    getAll: async () => {
      try {
        const response = await ServerCall.get("/animation/get");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    create: async (animationData) => {
      try {
        console.log("animation data to send: ", animationData)
        const usrId = sessionStore.getUserId()
        const ms = parseInt(animationData.duration) * 1000;
        const response = await ServerCall.post(`/animation/create`, {
          idUsr: parseInt(usrId),
          name: animationData.name,
          duration: ms.toString(),
          format: animationData.format,
          recource: animationData.recource,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
}

export default AnimationController;

