export interface Instrument {
    symbol: string;
    name: string;
    lastPrice: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
    high: number;
    low: number;
    open: number;
    previousClose: number;
}

export interface InstrumentDetail extends Instrument {
    bid: number;
    ask: number;
    dayRange: { min: number; max: number };
    yearRange: { min: number; max: number };
    avgVolume: number;
  }
  