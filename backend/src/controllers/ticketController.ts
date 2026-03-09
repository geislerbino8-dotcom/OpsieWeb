import { Request, Response } from 'express';
import { TicketModel } from '../models/ticketModel';

export class TicketController {

  public create = async(req: Request, res: Response) => {
    
    try {
      await TicketModel.create(req.body);
      
      res.status(201).json({ message: 'Ticket created succesfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create ticket' });
    }
  }

  public getAll = async(req: Request, res: Response) => {
    try {
      const tickets = await TicketModel.find().populate('assignee', 'name');

      const formattedTickets = tickets.map((ticket) => ({
        _id: ticket._id,
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        address: ticket.address,
        description: ticket.description,
        platform: ticket.platform,
        platformVersion: ticket.platformVersion,
        category: ticket.category,
        status: ticket.status,
        taskReferenceUrl: ticket.taskReferenceUrl,
        assignee: ticket.assignee
          ? (ticket.assignee as any).name
          : null,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
      }));

      res.json(formattedTickets);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Failed to fetch tickets' });
    }
  }

  public updateStatus = async(req: Request, res: Response) => {
    try {
      await TicketModel.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { returnDocument: 'after' }
      );

      res.json({ message: `Ticket status changed to ${req.body.status}` });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update status' });
    }
  }

  public assign = async (req: Request, res: Response) => {
    try {
      const { assigneeId } = req.body;

      const updatedTicket = await TicketModel.findByIdAndUpdate(
        req.params.id,
        { assignee: assigneeId },
        { returnDocument: 'after' }
      ).populate('assignee', 'name')

      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      res.json({
        message: 'Ticket assigned successfully',
        ticket: {
          id: updatedTicket._id,
          assignee: updatedTicket.assignee
        }
      });

    } catch (error) {
      res.status(400).json({ message: 'Failed to assign ticket' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const deleted = await TicketModel.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete ticket' });
    }
  };
}