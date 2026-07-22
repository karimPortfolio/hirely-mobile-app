import { ApplicationStatus } from "../types/applied-jobs.type";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  {
    label: "All",
    value: "all",
    bgColorClass: "bg-red-100 dark:bg-red-900",
    textColorClass: "text-red-800 dark:text-red-200",
  },
  {
    label: "Applied",
    value: "applied",
    bgColorClass: "bg-gray-100 dark:bg-gray-900",
    textColorClass: "text-gray-800 dark:text-gray-200",
  },
  {
    label: "In Review",
    value: "in_review",
    bgColorClass: "bg-blue-100 dark:bg-blue-900",
    textColorClass: "text-blue-800 dark:text-blue-200",
  },
  {
    label: "Interview",
    value: "interview",
    bgColorClass: "bg-yellow-100 dark:bg-yellow-900",
    textColorClass: "text-yellow-800 dark:text-yellow-200",
  },
  {
    label: "Offer",
    value: "offer",
    bgColorClass: "bg-green-100 dark:bg-green-900",
    textColorClass: "text-green-800 dark:text-green-200",
  },
  {
    label: "Hired",
    value: "hired",
    bgColorClass:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    textColorClass: "text-purple-800 dark:text-purple-200",
  },
  {
    label: "Rejected",
    value: "rejected",
    bgColorClass: "bg-red-100 dark:bg-red-900",
    textColorClass: "text-red-800 dark:text-red-200",
  },
];
