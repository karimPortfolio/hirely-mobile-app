import {
  JobEmploymentTypeOption,
  JobExperienceLevelOption,
  RemoteOnlyOption,
} from "../types/jobs.types";

export const JOB_EMPLOYMENT_TYPE_OPTIONS: JobEmploymentTypeOption[] = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

export const JOB_EXPERIENCE_LEVEL_OPTIONS: JobExperienceLevelOption[] = [
  { label: "Junior", value: "junior" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
  { label: "Lead", value: "lead" },
];

export const REMOTE_ONLY_OPTIONS: RemoteOnlyOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const DEPARTMENTS: string[] = [
  "All",
  "HR",
  "IT",
  "Marketing",
  "Sales",
  "Operations",
  "Legal",
  "R&D",
  "Finance and Accounting",
  "Customer Service",
];
