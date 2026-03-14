// src/types/index.ts

export type DrillLevel = 'cluster' | 'namespace' | 'pod';

export interface ResourceCosts {
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number; // percentage 0–100
  total: number;
}

export interface DrillItem {
  id: string;
  name: string;
  costs: ResourceCosts;
}

export interface DrillState {
  level: DrillLevel;
  selectedId: string | null;
  selectedName: string | null;
  parentId: string | null;
  parentName: string | null;
}