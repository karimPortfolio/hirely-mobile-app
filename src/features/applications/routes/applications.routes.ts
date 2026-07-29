
export const APPLICATIONS_ROUTES = {
  createApplication: `${process.env.EXPO_PUBLIC_API_VERSION || ''}/applications`,
  parseResume: `${process.env.EXPO_PUBLIC_API_VERSION || ''}/public-applications/parse-resume`,
} as const;
