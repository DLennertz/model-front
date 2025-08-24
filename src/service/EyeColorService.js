import api from "./api";

const EyeColorService = {
  getEyeColor: () => api.get("/eyecolor"),
};

export default EyeColorService;
