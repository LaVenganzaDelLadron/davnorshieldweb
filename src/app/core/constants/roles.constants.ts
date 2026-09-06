export const ROLES = {
    SUPER_ADMIN:'super_admin',
    CITIZEN:'citizen',
    BARANGAY_ADMIN:'barangay_admin',
    MUNICIPALITY_ADMIN:'municipality_admin',
    SCHOOL_ADMIN:'school_admin',
} as const;
export type UserRole = typeof ROLES[keyof typeof ROLES];
