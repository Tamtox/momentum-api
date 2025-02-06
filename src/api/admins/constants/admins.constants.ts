export const ADMIN_TYPES = ['admin', 'superadmin'] as const;
export type AdminType = (typeof ADMIN_TYPES)[number];
