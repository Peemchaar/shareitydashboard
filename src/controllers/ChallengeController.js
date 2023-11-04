import ServerCall from "./ServerCall";
import { useSessionStore } from "@/stores/session";

const sessionStore = useSessionStore();

const ChallengeController = {
  getAll: async () => {
    try {
      const response = await ServerCall.get("/challenge/get-all");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await ServerCall.get(`/challenge/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getChallenges: async (id) => {
    try {
      const response = await ServerCall.get(`/challenge/get-challenge/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getChallengesStats: async (id) => {
    try {
      const response = await ServerCall.get(`/stats/challenge/${id}`);
      console.log("response-stats", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getChallengesUpdate: async (id) => {
    try {
      const response = await ServerCall.get(
        `/user-challenge/get-by-id/dashboard/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUrlChallengeShared: async (id) => {
    try {
      const response = await ServerCall.post("/stats/Challenge/GetShare/", {
        challengeId: id,
        platform: ["twilio"],
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createChallenge: async (challengeData) => {
    try {
      const usrId = sessionStore.getUserId();
      const response = await ServerCall.post("/challenge/create", {
        idUsrCreate: parseInt(usrId),
        name: challengeData.name,
        description: challengeData.description,
        startDate: challengeData.startDate,
        endDate: challengeData.endDate,
        amount: challengeData.amount,
        inviteDonate: challengeData.inviteDonate,
        maxAmount: challengeData.maxAmount,
        lightbeatStartDate: challengeData.lightbeatStartDate,
        lightbeatEndDate: challengeData.lightbeatEndDate,
        lightbeatDesign: challengeData.lightbeatDesign,
        shareMessage: challengeData.shareMessage,
        shareMessageShort: challengeData.shareMessageShort,
        reactions: challengeData.reactions,
        color: challengeData.color,
        badge: challengeData.badge,
        url: challengeData.url,
        qrUrl: challengeData.customQr,
        instructions: challengeData.instructions,
        idOrganization: challengeData.idOrganization,
        idSponsor: challengeData.idSponsor,
        idAnimation: challengeData.idAnimation,
        idResource: challengeData.idResource,
        typeDonation: challengeData.typeDonation,
        typeDonationDescription: challengeData.typeDonationDescription,
        typeDonationIcon: challengeData.typeDonationIcon,
      });
      /*       console.log("SPONSOR DATA: ", response.data.sponsorChallengeData)
      const challengeUpdate = await ServerCall.post(`/challenge/edit-challenge/${response.data.challengeData.id}`,{
        sponsors: [response.data.sponsorChallengeData]
      })  */
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createThumbnail: async (file) => {
    try {
      const response = await ServerCall.postMedia(
        "/challenge/create-thumbnail",
        file
      ).then((resp) => {
        console.log("CORRECTO: ", resp.data);
        return resp.data;
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  changeStatus: async (id, status) => {
    try {
      const response = await ServerCall.put(`/challenge/${id}/status`, {
        status: status,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserChallenge: async (id) => {
    try {
      const response = await ServerCall.post(`/user-challenge/get`, {
        idUser: id,
        items: 100,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ChallengeController;
