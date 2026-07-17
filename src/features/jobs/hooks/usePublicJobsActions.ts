import { useState } from "react";
import { useApiError } from "@/hooks/useApiError";
import { getPublicJob, saveJob, unsaveJob } from "../services/jobs.service";

export function usePublicJobActions(refetch?: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();

  const findJob = async (id: string) => {
    setLoading(true);
    try {
      const res = await getPublicJob(id);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const savePublicJob = async (id: string) => {
    setLoading(true);
    try {
      const response = await saveJob(id);
      return response?.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unsavePublicJob = async (id: string) => {
    setLoading(true);
    try {
      const response = await unsaveJob(id);
      return response?.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    findJob: findJob,
    savePublicJob,
    unsavePublicJob,

    apiError: error,
    clearApiError: clearError,
  };
}
