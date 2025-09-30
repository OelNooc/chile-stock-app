export interface ConstituentInstrument {
    codeInstrument: string;
    name: string;
    shortName: string;
    pctDay: number;
    pct30D: number;
    pctCY: number;
    pct1Y: number;
    lastPrice: number;
    datetimeLastPrice: string;
    volumeMoney: number;
    accumulatedVolumeMoney: number;
    tend: 'up' | 'down' | 'same';
    performanceAbsolute: number;
    performanceRelative: number;
}

export interface ConstituentsResponse {
    success: boolean;
    code: number;
    data: {
      info: {
        name: string;
        shortName: string;
        countryName: string;
        codeInstrument: string;
      };
      constituents: ConstituentInstrument[];
    };
}

export interface InstrumentDetail {
    info: {
      name: string;
      shortName: string;
      countryName: string;
      currencyName: string;
      currencySymbol: string;
      codeInstrument: string;
      marketName: string;
      hourOpen: string;
      hourClose: string;
      trading: boolean;
      exchangeRate: number;
    };
    price: {
      lastPrice: number;
      datetimeLastPrice: string;
      openPrice: number;
      closePrice: number;
      datetimeClosePrice: string;
      performanceAbsolute: number;
      performanceRelative: number;
      bid: number;
      bidVolume: number;
      bidDatetime: string;
      ask: number;
      askVolume: number;
      askDatetime: string;
      volumeMoney: number;
      accumulatedVolumeMoney: number;
      volumeInstrument: number;
      accumulatedVolumeInstrument: number;
      tend: 'up' | 'down' | 'same';
      maxDay: number;
      minDay: number;
      min52W: number;
      max52W: number;
      pct30D: number;
      pctRelW52: number;
      pctRelCY: number;
    };
}

export interface InstrumentDetailResponse {
    success: boolean;
    code: number;
    data: InstrumentDetail;
}
