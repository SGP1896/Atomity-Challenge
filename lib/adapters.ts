// lib/adapters.ts

import { DrillItem } from '@/types';
import { BarChartItem } from '@/components/BarChart';
import { CostRow } from '@/components/CostTable';

export function toBarChartItems(items: DrillItem[]): BarChartItem[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.costs.total,
  }));
}

export function toCostRows(items: DrillItem[]): CostRow[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    cpu: item.costs.cpu,
    ram: item.costs.ram,
    storage: item.costs.storage,
    network: item.costs.network,
    gpu: item.costs.gpu,
    efficiency: item.costs.efficiency,
    total: item.costs.total,
  }));
}