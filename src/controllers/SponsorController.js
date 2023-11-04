import ServerCall from "./ServerCall";

const SponsorController = {
  getAll: async () => {
    try {
      const response = await ServerCall.get("/sponsor/get");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await ServerCall.get(`/sponsor/get/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getByUserId: async (id) => {
    try {
      const response = await ServerCall.get(`/sponsor/getByUser/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (input) => {
    try {
      const response = await ServerCall.post(`/sponsor/create`, input);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const response = await ServerCall.post(`/sponsor/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await ServerCall.delete(`/organization/get/${id}`);
      return response.data;
    } catch (error) {}
  },
};

export default SponsorController;
