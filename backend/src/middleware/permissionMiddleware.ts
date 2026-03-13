import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { ROLE_PERMISSIONS } from '../constants/rolePermissions';

export const requirePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {

    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const rolePermissions = ROLE_PERMISSIONS[user.role] || [];

    if (!rolePermissions.includes(permission)) {
      return res.status(403).json({
        message: `Permission ${permission} required`
      });
    }

    next();
  };
};

