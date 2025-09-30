export interface MarketIndex {
    code: string;
    name: string;
    currentValue: number;
    change: number;
    changePercent: number;
    pointChange: number;
    lastUpdate: Date;
  }
  
  export type IndexType = 'IPSA' | 'IGPA' | 'NASDAQ' | 'DOW_JONES' | 'SP_BVL';
  