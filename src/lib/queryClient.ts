// src/lib/queryClient.ts

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 5 minutes — no refetch on revisit
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Don't retry on error for this project
      retry: 1,
      // Don't refetch just because user switched browser tabs
      refetchOnWindowFocus: false,
    },
  },
});