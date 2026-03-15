// lib/dataMapper.ts
// Maps JSONPlaceholder responses to our DrillItem shape

import { DrillItem } from '@/src/types';

// Deterministic cost generator from an id number
// Same id always produces same costs — looks realistic
function costsFromId(id: number): DrillItem['costs'] {
  const base = id * 137;
  const cpu      = (base % 1800) + 400;
  const ram      = Math.round(cpu * 0.55);
  const storage  = Math.round(cpu * 0.1);
  const network  = Math.round(cpu * 0.12);
  const gpu      = id % 3 === 0 ? Math.round(cpu * 0.33) : 0;
  const efficiency = ((id * 7) % 60) + 5; // 5–65%
  const total    = cpu + ram + storage + network + gpu;
  return { cpu, ram, storage, network, gpu, efficiency, total };
}

export interface RawUser  { id: number; name: string; }
export interface RawPost  { id: number; userId: number; title: string; }
export interface RawComment { id: number; postId: number; name: string; }

export function mapUsersToClusters(users: RawUser[]): DrillItem[] {
  return users.slice(0, 4).map((u) => ({
    id: String(u.id),
    name: `Cluster ${String.fromCharCode(64 + u.id)}`, // Cluster A, B, C, D
    costs: costsFromId(u.id),
  }));
}

export function mapPostsToNamespaces(posts: RawPost[]): DrillItem[] {
  return posts.slice(0, 4).map((p, i) => ({
    id: String(p.id),
    name: `Namespace ${String.fromCharCode(65 + i)}`, // Namespace A, B, C, D
    costs: costsFromId(p.id),
  }));
}

export function mapCommentsToPods(comments: RawComment[]): DrillItem[] {
  return comments.slice(0, 4).map((c, i) => ({
    id: String(c.id),
    name: `Pod ${String.fromCharCode(65 + i)}`, // Pod A, B, C, D
    costs: costsFromId(c.id),
  }));
}