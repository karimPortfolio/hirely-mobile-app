import { JobQuery, PaginatedResponse } from "@/features/jobs/types/jobs.types";
import { api } from "@/lib/api/axios";
import { APPLIED_JOBS_ROUTES } from "../routes/applied-jobs.routes";
import { AppliedJob } from "../types/applied-jobs.type";

export const getAppliedJobs = (query: JobQuery) => {
  return api.get<PaginatedResponse<AppliedJob>>(
    APPLIED_JOBS_ROUTES.getAppliedJobs,
    { params: query },
  );
};
