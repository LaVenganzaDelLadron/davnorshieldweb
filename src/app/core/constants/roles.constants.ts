export const ROLES = { ADMIN:'admin', LGU:'lgu', SCHOOL:'school', CITIZEN:'citizen' } as const;
export type UserRole = typeof ROLES[keyof typeof ROLES];
