import { createContext } from 'react';

export type ContentType = Record<string, any>;

/**
 * Shared published-content context.
 *
 * Split out of `App.tsx` so that consumers can import the context without
 * pulling in the whole App component — this keeps react-refresh happy
 * (one component per module) and lets Fast Refresh preserve state.
 */
export const ContentContext = createContext<ContentType | null>(null);
