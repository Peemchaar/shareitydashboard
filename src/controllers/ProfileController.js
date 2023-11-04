import ServerCall from "./ServerCall";

const ProfileController = {
  updateDataUser: async (data) => {
    try {
      const response = await ServerCall.post("/user/update/", {
        id: data.id,
        firstName: data.firstname,
        lastName: data.lastName,
        username: data.username,
        bio: data.bio,
        email: data.email,
        gender: data.gender,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updatePassUser: async (email, data) => {
    try {
      const response = await ServerCall.post("/user/update-password/", {
        email: email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  userAvatar: async (data) => {
    try {
      let fileData = new FormData();
      fileData.append("file", data.file);
      fileData.append("id", data.id);
      const response = await ServerCall.post("/user/update-photo", fileData);
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default ProfileController;
