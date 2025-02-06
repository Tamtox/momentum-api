export const AUTH_PROVIDERS = ['email', 'google', 'facebook', 'twitter', 'github'] as const;
export type AuthProvider = (typeof AUTH_PROVIDERS)[number];
