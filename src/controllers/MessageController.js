import ServerCall from "./ServerCall";

const MessageController = {
  sendComunity: async (input) => {
    let id = input.challenge.id;
    delete input.challenge;
    try {
      const response = await ServerCall.post(
        "/user-challenge/community-message/" + id,
        input
      );
      console.log("response send-comunity:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default MessageController;
