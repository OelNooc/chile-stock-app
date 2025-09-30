export interface ChartDataPoint {
    date: Date;
    value: number;
  }
  
  export type ChartPeriod = '1D' | '1S' | '1M' | '3M' | '6M' | '1A' | '5A';
  
  export interface ChartData {
    period: ChartPeriod;
    data: ChartDataPoint[];
  }
  