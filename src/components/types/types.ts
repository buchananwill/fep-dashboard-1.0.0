import { HeatMapSerie } from '@nivo/heatmap';

export interface HeatMapDatumWithLabel {
  entityId: string;
  x: string;
  y: number | null;
}

export type HeatMapDataSeries = HeatMapSerie<HeatMapDatumWithLabel, any> & {
  entityId: string;
};
