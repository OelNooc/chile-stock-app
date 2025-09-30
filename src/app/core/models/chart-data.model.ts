export interface ChartDataPoint {
  datetimeLastPrice: string;
  datetimeLastPriceTs: number;
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  volume: number;
  volumeMoney: number;
  performanceRelative: number;
  performanceAbsolute: number;
  tend: 'up' | 'down' | 'same';
}
  
export interface ChartInfo {
  name: string;
  shortName: string;
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  codeInstrument: string;
  hourOpen: string;
  hourClose: string;
}

export interface ChartHistoryResponse {
  success: boolean;
  code: number;
  data: {
    info: ChartInfo;
    chart: ChartDataPoint[];
  };
}

export type ChartPeriod = '1D' | '1S' | '1M' | '3M' | '6M' | '1A' | '5A';

export interface ProcessedChartData {
  period: ChartPeriod;
  points: ChartDataPoint[];
  minPrice: number;
  maxPrice: number;
  priceChange: number;
  priceChangePercent: number;
}