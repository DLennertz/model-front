import api from "./api";

const CountryService = {
  getCountry: () => api.get("/country"),
};

export default CountryService;
