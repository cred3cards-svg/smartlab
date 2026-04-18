import { UserRole } from "@prisma/client";

export type Permission = 
  | 'bookings.read'
  | 'bookings.update'
  | 'tests.update'
  | 'referrals.approve'
  | 'reports.upload'
  | 'users.read'
  | 'content.update'
  | 'audit.read'
  | 'settings.update'
  | 'super_admin.access';

export const RolePermissions: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'bookings.read', 'bookings.update', 'tests.update', 'referrals.approve', 
    'reports.upload', 'users.read', 'content.update', 'audit.read', 
    'settings.update', 'super_admin.access'
  ],
  ADMIN: [
    'bookings.read', 'bookings.update', 'tests.update', 'referrals.approve', 
    'reports.upload', 'users.read', 'content.update', 'audit.read', 
    'settings.update', 'super_admin.access'
  ],
  OPERATIONS: [
    'bookings.read', 'bookings.update', 'reports.upload', 'referrals.approve'
  ],
  CONTENT: [
    'tests.update', 'content.update'
  ],
  SUPPORT: [
    'bookings.read', 'users.read'
  ],
  PATHOLOGIST: [
    'bookings.read', 'reports.upload'
  ],
  PATIENT: [] // Patient has no admin dashboard access
};

export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  const permissions = RolePermissions[userRole] || [];
  return permissions.includes(permission) || permissions.includes('super_admin.access');
};
