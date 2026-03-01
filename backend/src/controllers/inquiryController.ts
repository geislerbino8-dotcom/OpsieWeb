import { Request, Response } from 'express';
import { InquiryModel } from '../models/inquiryModel';

export class InquiryController {

  public create = async(req: Request, res: Response) => {
    try {
      const inquiry = await InquiryModel.create(req.body);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create inquiry' });
    }
  }

  public getAll = async(req: Request, res: Response) => {
    try {
      const inquiries = await InquiryModel.find()
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch inquiries' });
    }
  }
}