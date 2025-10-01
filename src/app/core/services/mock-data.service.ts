import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  ConstituentsResponse, 
  InstrumentDetailResponse, 
  ChartHistoryResponse 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly basePath = 'assets/mock-data';

  constructor(private http: HttpClient) {}

  getConstituents(): Observable<ConstituentsResponse> {
    return this.http.get<ConstituentsResponse>(
      `${this.basePath}/constituents/constituensList.json`
    );
  }

  /**
   * @param symbol - Código del instrumento (ej: 'AGUAS-A')
   */
  getInstrumentHistory(symbol: string): Observable<ChartHistoryResponse> {
    return this.http.get<ChartHistoryResponse>(
      `${this.basePath}/history/history-${symbol}.json`
    );
  }

  /**
   * @param symbol - Código del instrumento (ej: 'AGUAS-A')
   */
  getInstrumentSummary(symbol: string): Observable<InstrumentDetailResponse> {
    return this.http.get<InstrumentDetailResponse>(
      `${this.basePath}/summary/${symbol}.json`
    );
  }
}
