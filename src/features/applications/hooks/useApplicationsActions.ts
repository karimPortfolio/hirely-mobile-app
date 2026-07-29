import { use, useState } from "react";
import { useApiError } from "@/hooks/useApiError";
import { createApplication } from "../services/applications.service";
import { CreateApplicationPayload } from "../types/applications.types";

export function useApplicationsActions(refetch?: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();

  const create = async (payload: CreateApplicationPayload) => {
    setLoading(true);
    try {
      const res = await createApplication(payload);
      return res.data;
    } catch (err) {
      handleError(err);
      console.log("Api error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    create,

    apiError: error,
    clearApiError: clearError,
  };
}
