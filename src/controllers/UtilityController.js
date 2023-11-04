import ServerCall from "./ServerCall";

const UtilityController = {
  upload: async (input) => {
    let fileData = new FormData();
    fileData.append("file", input.file);
    fileData.append("name", input.name);
    fileData.append("location", input.location);
    try {
      const response = await ServerCall.post("/uploader/create", fileData);
      console.log("response-upload", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UtilityController;
