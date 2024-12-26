import axios from "axios";

const BASE_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: BASE_URL
});

export default api;

export const getFlowsList = async () => {
  const { data } = await api.get(`v1/flows/list`);
  return data;
};

export const getFlow = async (path: string) => {
  const { data } = await api.get(`v1/flows?path=${path}`);
  return data;
};