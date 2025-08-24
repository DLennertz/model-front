import api from "./api";

const HairColorService = {
  getHairColor: () => api.get("/haircolor"),
};

export default HairColorService;
