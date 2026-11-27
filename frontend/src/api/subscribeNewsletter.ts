import axiosClient from './axiosClient';

export interface NewsletterSubscription {
  email: string;
  name?: string;
}

export const subscribeNewsletter = async (data: NewsletterSubscription) => {
  const response = await axiosClient.post('/newsletter/subscribe', data);
  return response.data as { message: string };
};
