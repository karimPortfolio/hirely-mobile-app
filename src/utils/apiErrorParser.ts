import { ApiErrorState } from "@/types/api-error.types";

export function parseApiError(err: any): ApiErrorState {
  const status = err?.response?.status;
  const data = err?.response?.data;

  switch (status) {
    case 401:
      return {
        title: "Unauthenticated",
        status,
        message: "You need to log in to access this resource.",
      };
    case 403:
      return {
        title: "Forbidden",
        status,
        message: "You do not have permission to access this resource.",
      };
    case 404:
      return {
        title: "Not Found",
        status,
        message: "The requested resource could not be found.",
      };
    case 422:
      return {
        title: "Validation Error",
        status,
        message: data?.message || "There was a problem with your submission.",
        validationErrors: data?.errors ?? {},
      };
    case 429:
      return {
        title: "Too Many Requests",
        status,
        message: "You have made too many requests. Please try again later.",
      };
    case 500:
      return {
        title: "Server Error",
        status,
        message: "An internal server error occurred. Please try again later.",
      };
    default:
      return {
        title: "Unexpected Error",
        status: status ?? null,
        message:
          data?.message || "An unexpected error occurred. Please try again.",
      };
  }
}
