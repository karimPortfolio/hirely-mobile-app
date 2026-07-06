import { parseApiError } from "@/utils/apiErrorParser";
import { toastBridge } from "@/utils/toastBridge";
import axios from "axios";


export const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`,

  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "x-client-type":"mobile"
  },
});

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase();
    const endpoint = response.config?.url || "";
    const message = response.data?.message;

    if (
      method &&
      method !== "get" &&
      method !== "options" &&
      !endpoint.includes("/auth/login") &&
      !endpoint.includes("/auth/logout")
    ) {
      toastBridge.emitSuccess(message ?? "Request completed successfully");
    }

    return response;
  },
  (error) => {
    const parsedError = parseApiError(error);
    
    toastBridge.emitError(parsedError);

    return Promise.reject(error);
  },
);
