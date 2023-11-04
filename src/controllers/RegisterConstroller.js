import ServerCall from "./ServerCall";
import json from "/assets/data/country-codes.json";

const RegisterController = {
  getCountries: () => json.countries,
  sendCode: async (input) => {
    try {
      let ph = input.replace(/[^\d]/g, "");
      const response = await ServerCall.post("/user/send-message", {
        phoneNumber: ph,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  register: async (input) => {
    try {
      let bodyData = {
        firstName: input.firstName,
        lastName: input.lastName,
        rol: input.rol.label.split(" ")[0],
        phone: `${input.phoneCode.id}${input.phone}`.replace(/[^\d]/g, ""),
        email: input.email,
        code: input.code,
        password: input.pass,
        promotional: input.promotional,
      };
      if (input.rol.id == 1) {
        bodyData.organization = input.organization;
      } else if (input.rol.id == 2) {
        bodyData.sponsor = input.sponsor;
      }
      const response = await ServerCall.post("/user/register", bodyData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default RegisterController;
