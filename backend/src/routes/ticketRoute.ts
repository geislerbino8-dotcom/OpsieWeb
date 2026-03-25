import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { requirePermission } from '../middleware/permissionMiddleware';
import { PERMISSIONS } from '../constants/permissions';

export default class TicketRoute {
  public readonly router: Router;
  public readonly controller: TicketController;

  constructor() {
    this.router = Router();
    this.controller = new TicketController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.post(
      '/create',
      this.controller.create
    );

    this.router.get(
      '/getAll',
      authMiddleware,
      requirePermission(PERMISSIONS.TICKET_VIEW) || adminMiddleware,
      this.controller.getAll
    );

    this.router.get(
      '/timeline/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.TICKET_VIEW_TIMELINE) || adminMiddleware,
      this.controller.timeline
    );

    this.router.patch(
      '/update/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.TICKET_UPDATE) || adminMiddleware,
      this.controller.updateTicket
    );

    this.router.delete(
      '/delete/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.TICKET_DELETE) || adminMiddleware,
      this.controller.delete
    );
  };
}