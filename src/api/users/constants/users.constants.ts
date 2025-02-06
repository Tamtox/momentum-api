export const USER_TYPES = ['admin', 'user', 'guest'] as const;
export type UserType = (typeof USER_TYPES)[number];
