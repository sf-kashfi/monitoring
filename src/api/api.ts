import axios from "axios";

export const api = axios.create({
  baseURL: "/asan-bource-monitoring/api/v1",
  method: "GET",
});
