export const PERMISSIONS = {
  USER_VIEW_ME: 'user:view_me',
  USER_VIEW: 'user:view',
  USER_VIEW_ACTIVE: 'user:view_active',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_UPDATE_PROFILE: 'user:update_profile',
  USER_RESET_PASSWORD: 'user:reset_password',
  USER_RESTORE: 'user:restore',
  USER_DELETE: 'user:delete',

  TICKET_VIEW: 'ticket:view',
  TICKET_CREATE: 'ticket:create',
  TICKET_UPDATE: 'ticket:update',
  TICKET_DELETE: 'ticket:delete'
} as const;