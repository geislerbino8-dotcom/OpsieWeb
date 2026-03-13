import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useApiState = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const startLoading = () => {
    setStatus('loading');
    setMessage('');
  };

  const setSuccess = (msg: string) => {
    setStatus('success');
    setMessage(msg);
  };

  const setError = (msg: string) => {
    setStatus('error');
    setMessage(msg);
  };

  const reset = () => {
    setStatus('idle');
    setMessage('');
  };

  return {
    status,
    message,
    startLoading,
    setSuccess,
    setError,
    reset,
  };
};