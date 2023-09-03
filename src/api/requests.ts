import { CapitalIncrease } from "../models/capital-increase";
import { FinancialStats } from "../models/financial-stats";
import { ServerResponse } from "../models/server-response";
import { Warrant } from "../models/warrant";
import { Dividends } from "../models/dividends";
import { api } from "./api";
import { endpoints } from "./endpoints";
import { Bond } from "../models/bond";

export const getWarrants = (params: string) => {
  return api<ServerResponse<Warrant[]>>(`${endpoints.warrants}?${params}`);
};

export const getFinancialStats = (params: string) => {
  return api<ServerResponse<FinancialStats[]>>(`${endpoints.financialStates}?${params}`);
};

export const getCapitalIncrease = (params: string) => {
  return api<ServerResponse<CapitalIncrease[]>>(`${endpoints.capitalIncrease}?${params}`);
};

export const getDPS = (params: string) => {
  return api<ServerResponse<Dividends[]>>(`${endpoints.dividends}?${params}`);
};

export const getBonds = (params: string) => {
  return api<ServerResponse<Bond[]>>(`${endpoints.bonds}?${params}`);
};
