import { api } from "@/lib/api/axios";
import { PUBLIC_JOBS_ROUTES } from "../routes/jobs.routes";
import { Job, JobQuery, PaginatedResponse } from "../types/jobs.types";

export const getPublicJobs = async (query: JobQuery) => {
  return api.get<PaginatedResponse<Job>>(PUBLIC_JOBS_ROUTES.getPublicJobs, {
    params: query,
  });
};

export const getPublicJob = async (id: string) => {
  return api.get<Job>(PUBLIC_JOBS_ROUTES.getPublicJob(id));
};

export const saveJob = (id: string) => {
  return api.post(PUBLIC_JOBS_ROUTES.saveJob(id));
};

export const unsaveJob = (id: string) => {
  return api.post(PUBLIC_JOBS_ROUTES.unsaveJob(id));
};
