// hooks/useClusterData.ts

import { useQuery } from '@tanstack/react-query';
import { fetchClusters, fetchNamespaces, fetchPods } from '@/lib/api';

// Hook 1 — top level clusters (always fetched on mount)
export function useClusters() {
  return useQuery({
    queryKey: ['clusters'],
    queryFn: fetchClusters,
  });
}

// Hook 2 — namespaces for a specific cluster
// Only runs when clusterId is provided
export function useNamespaces(clusterId: string | null) {
  return useQuery({
    queryKey: ['namespaces', clusterId],
    queryFn: () => fetchNamespaces(clusterId!),
    enabled: !!clusterId, // don't fetch until we have an id
  });
}

// Hook 3 — pods for a specific namespace
export function usePods(namespaceId: string | null) {
  return useQuery({
    queryKey: ['pods', namespaceId],
    queryFn: () => fetchPods(namespaceId!),
    enabled: !!namespaceId,
  });
}