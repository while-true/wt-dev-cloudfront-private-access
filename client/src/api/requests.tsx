import { apiClient, internalApiClient } from "./client";
import { Response } from "./types";
import { LoginRequest } from "./types/request";

export const loginUser = (loginRequest: LoginRequest) => {
  return apiClient.post<Response.JWT>("/login", loginRequest);
};

export const loginInteralUser = () => {
  return internalApiClient.post<Response.JWT>("/login/");
};
