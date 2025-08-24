import api from "./api";

const formHeaders = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
};

const ModelService = {
  getTotal: () => api.get("/model/count"),
  getAniversariante: () => api.get("/model/aniversariante"),
  getStats: () => api.get("/model/stats"),
  getModelo: (pageNumber, pageSize, orderBy) =>
    api.get("/model", { params: { pageNumber, pageSize, orderBy } }),
  getAll: () => api.get("/model/all"),
  getModeloId: (id) => api.get(`/model/${id}`),
  deleteModeloId: (id) => api.delete(`/model/${id}`),
  createModelo: (newModel) => api.post("/model/save", newModel, formHeaders),
  createModeloSemFoto: (newModel) =>
    api.post("/model/saveSemFoto", newModel, formHeaders),
  updateModelo: (newModel) => api.put("/model/update", newModel, formHeaders),
  updateModeloSemFoto: (newModel) =>
    api.put("/model/updateSemFoto", newModel, formHeaders),
};

export default ModelService;
