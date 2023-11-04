import ServerCall from "./ServerCall";

const UserController = {
  getAll: async (id) => {
    try {
      const response = await ServerCall.get(`/user/get-dashboard-users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getSwayScore: async (id) => {
    try {
      const response = await ServerCall.get(`/user/sway-score/${id}`);
      return response.data;
    } catch (error) {}
  },
  delete: async (id) => {
    try {
      const response = await ServerCall.delete(`/user/${id}`);
      return response.data;
    } catch (error) {}
  },
  userAction: async (nickname) => {
    try {
      const response = await ServerCall.get(
        `/user/get-by-nickname/${nickname}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUserName: async (username) => {
    try {
      const response = await ServerCall.get(
        `/user/get-by-username/${username}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getCredit: async (idUser) => {
    try {
      const response = await ServerCall.get(`/user/credit/${idUser}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getCreditHistory: async (idUser, items) => {
    try {
      const response = await ServerCall.post(`/user/get/history`, {
        page: 1,
        items,
        idUser: idUser,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addCredits: async (idUser, token, amount) => {
    try {
      const response = await ServerCall.post(`/user/credit/execute`, {
        amount,
        id: idUser,
        type: "credit",
        transaction: token,
        method_payment: "credit",
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  blockUser: async (idUser, status) => {
    try {
      const response = await ServerCall.get(
        `/user/block/${idUser}/${status ? 1 : 0}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserController;
