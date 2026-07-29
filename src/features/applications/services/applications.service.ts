import { api } from "@/lib/api/axios";
import { CreateApplicationPayload } from "../types/applications.types";
import { APPLICATIONS_ROUTES } from "../routes/applications.routes";

export const createApplication = (payload: CreateApplicationPayload | FormData) => {
  return api.post(APPLICATIONS_ROUTES.createApplication, payload, {
    headers:{ "Content-Type": "multipart/form-data" }
  });
};

export const parseResume = async (payload: FormData, signal?: AbortSignal) => {
  try {
    return await api.post<Record<string, any>>(
      APPLICATIONS_ROUTES.parseResume,
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
        signal,
      },
    );
  } catch (error) {
    throw error;
  }
};
