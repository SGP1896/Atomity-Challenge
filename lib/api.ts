// lib/api.ts

import axios from 'axios';
import {
  RawUser, RawPost, RawComment,
  mapUsersToClusters, mapPostsToNamespaces, mapCommentsToPods,
} from './dataMapper';
import { DrillItem } from '@/types';

const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchClusters(): Promise<DrillItem[]> {
  const { data } = await axios.get<RawUser[]>(`${BASE}/users`);
  return mapUsersToClusters(data);
}

export async function fetchNamespaces(clusterId: string): Promise<DrillItem[]> {
  const { data } = await axios.get<RawPost[]>(
    `${BASE}/posts?userId=${clusterId}`
  );
  return mapPostsToNamespaces(data);
}

export async function fetchPods(namespaceId: string): Promise<DrillItem[]> {
  const { data } = await axios.get<RawComment[]>(
    `${BASE}/comments?postId=${namespaceId}`
  );
  return mapCommentsToPods(data);
}