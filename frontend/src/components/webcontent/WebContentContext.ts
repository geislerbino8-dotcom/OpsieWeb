import { createContext } from 'react';

export type ContentType = Record<string, any>;

/**
 * Shared draft/published web-content context for the CMS editors.
 *
 * Split out of `WebContentFrom.tsx` so consumers can import the context
 * without pulling in the component (react-refresh / Fast Refresh).
 */
export const WebContentContext = createContext<ContentType | null>(null);
