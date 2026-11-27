import crypto from 'crypto';
import axios from 'axios';
import { Request, Response } from 'express';

type MailchimpRequest = {
  email_address: string;
  status_if_new: 'subscribed';
  merge_fields?: {
    FNAME?: string;
  };
};

export class NewsletterController {
  public subscribe = async (req: Request, res: Response) => {
    const email =
      typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const name =
      typeof req.body.name === 'string' ? req.body.name.trim().slice(0, 100) : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: 'A valid email address is required.' });
      return;
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      res.status(503).json({
        message: 'Newsletter subscriptions are temporarily unavailable.',
      });
      return;
    }

    const dataCenter = apiKey.split('-').pop();
    if (!dataCenter) {
      res.status(503).json({
        message: 'Newsletter subscriptions are temporarily unavailable.',
      });
      return;
    }

    const subscriberHash = crypto
      .createHash('md5')
      .update(email)
      .digest('hex');
    const payload: MailchimpRequest = {
      email_address: email,
      status_if_new: 'subscribed',
    };

    if (name) {
      payload.merge_fields = { FNAME: name };
    }

    try {
      await axios.put(
        `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
        payload,
        {
          auth: {
            username: 'opsie-web',
            password: apiKey,
          },
          timeout: 10000,
        },
      );

      res.status(200).json({
        message: 'You are subscribed to the Opsie newsletter.',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          res.status(400).json({
            message: 'This email could not be subscribed. Please check it and try again.',
          });
          return;
        }
      }

      console.error('Mailchimp subscription failed');
      res.status(502).json({
        message: 'We could not complete your subscription. Please try again.',
      });
    }
  };
}
