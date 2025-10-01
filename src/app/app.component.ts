import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from './core/services/mock-data.service';
import { ConstituentInstrument, InstrumentDetail, ChartDataPoint } from './core/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-container">
      <header class="header">
        <h1>Chile Stock App - Test de Datos</h1>
      </header>

      <main class="content">
        <section class="test-section">
          <h2>📊 Constituyentes del IPSA ({{ constituents().length }})</h2>
          @if (loading().constituents) {
            <p class="loading">Cargando constituyentes...</p>
          } @else if (error().constituents) {
            <p class="error">Error: {{ error().constituents }}</p>
          } @else {
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Var. Día</th>
                    <th>Var. 30D</th>
                    <th>Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  @for (instrument of constituents(); track instrument.codeInstrument) {
                    <tr (click)="selectInstrument(instrument.codeInstrument)" 
                        [class.selected]="selectedSymbol() === instrument.codeInstrument">
                      <td class="code">{{ instrument.shortName }}</td>
                      <td class="name">{{ instrument.name }}</td>
                      <td class="price">{{ formatNumber(instrument.lastPrice) }}</td>
                      <td [class]="getTrendClass(instrument.pctDay)">
                        {{ formatPercent(instrument.pctDay) }}
                      </td>
                      <td [class]="getTrendClass(instrument.pct30D)">
                        {{ formatPercent(instrument.pct30D) }}
                      </td>
                      <td>
                        <span [class]="'trend-' + instrument.tend">
                          {{ getTrendIcon(instrument.tend) }}
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </section>

        @if (selectedSymbol()) {
          <section class="test-section">
            <h2>📈 Resumen: {{ selectedSymbol() }}</h2>
            @if (loading().summary) {
              <p class="loading">Cargando resumen...</p>
            } @else if (error().summary) {
              <p class="error">Error: {{ error().summary }}</p>
            } @else if (summary()) {
              <div class="summary-grid">
                <div class="summary-card">
                  <h3>{{ summary()!.info.name }}</h3>
                  <p class="market">{{ summary()!.info.marketName }}</p>
                  <div class="price-info">
                    <span class="big-price">
                      {{ summary()!.info.currencySymbol }}{{ formatNumber(summary()!.price.lastPrice) }}
                    </span>
                    <span [class]="getTrendClass(summary()!.price.performanceRelative)">
                      {{ formatPercent(summary()!.price.performanceRelative) }}
                    </span>
                  </div>
                </div>

                <div class="summary-card">
                  <h4>Precios del Día</h4>
                  <div class="info-grid">
                    <div><strong>Apertura:</strong> {{ formatNumber(summary()!.price.openPrice) }}</div>
                    <div><strong>Cierre Ant:</strong> {{ formatNumber(summary()!.price.closePrice) }}</div>
                    <div><strong>Máximo:</strong> {{ formatNumber(summary()!.price.maxDay) }}</div>
                    <div><strong>Mínimo:</strong> {{ formatNumber(summary()!.price.minDay) }}</div>
                  </div>
                </div>

                <div class="summary-card">
                  <h4>Rango 52 Semanas</h4>
                  <div class="info-grid">
                    <div><strong>Máximo 52S:</strong> {{ formatNumber(summary()!.price.max52W) }}</div>
                    <div><strong>Mínimo 52S:</strong> {{ formatNumber(summary()!.price.min52W) }}</div>
                    <div><strong>Var. 52S:</strong> {{ formatPercent(summary()!.price.pctRelW52) }}</div>
                    <div><strong>Var. Año:</strong> {{ formatPercent(summary()!.price.pctRelCY) }}</div>
                  </div>
                </div>

                <div class="summary-card">
                  <h4>Volumen</h4>
                  <div class="info-grid">
                    <div><strong>Volumen $:</strong> {{ formatNumber(summary()!.price.volumeMoney) }}</div>
                    <div><strong>Vol. Acum:</strong> {{ formatNumber(summary()!.price.accumulatedVolumeMoney) }}</div>
                    <div><strong>Bid:</strong> {{ formatNumber(summary()!.price.bid) }}</div>
                    <div><strong>Ask:</strong> {{ formatNumber(summary()!.price.ask) }}</div>
                  </div>
                </div>
              </div>
            }
          </section>

          <section class="test-section">
            <h2>📉 Historial: {{ selectedSymbol() }}</h2>
            @if (loading().history) {
              <p class="loading">Cargando historial...</p>
            } @else if (error().history) {
              <p class="error">Error: {{ error().history }}</p>
            } @else if (history().length > 0) {
              <div class="history-stats">
                <p><strong>Puntos de datos:</strong> {{ history().length }}</p>
                <p><strong>Rango de fechas:</strong> 
                  {{ getFirstDate() }} - {{ getLastDate() }}
                </p>
                <p><strong>Precio inicial:</strong> {{ formatNumber(history()[0].lastPrice) }}</p>
                <p><strong>Precio final:</strong> {{ formatNumber(history()[history().length - 1].lastPrice) }}</p>
                <p><strong>Cambio total:</strong> 
                  <span [class]="getTrendClass(getTotalChange())">
                    {{ formatPercent(getTotalChange()) }}
                  </span>
                </p>
              </div>

              <div class="chart-preview">
                <h4>Vista previa de datos (últimos 10):</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Apertura</th>
                      <th>Cierre</th>
                      <th>Máximo</th>
                      <th>Mínimo</th>
                      <th>Volumen</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (point of getLastPoints(); track point.datetimeLastPriceTs) {
                      <tr>
                        <td>{{ formatDate(point.datetimeLastPrice) }}</td>
                        <td>{{ formatNumber(point.openPrice) }}</td>
                        <td>{{ formatNumber(point.closePrice) }}</td>
                        <td>{{ formatNumber(point.highPrice) }}</td>
                        <td>{{ formatNumber(point.lowPrice) }}</td>
                        <td>{{ formatNumber(point.volume) }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </section>
        }
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: var(--primary-bg);
      color: var(--text-primary);
    }

    .header {
      background: var(--secondary-bg);
      padding: 2rem;
      border-bottom: 1px solid var(--border-color);
    }

    .header h1 {
      margin: 0;
      font-size: 1.8rem;
    }

    .content {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .test-section {
      background: var(--secondary-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .test-section h2 {
      margin-top: 0;
      color: var(--text-primary);
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
    }

    .loading {
      color: #60a5fa;
      font-style: italic;
    }

    .error {
      color: var(--error-color);
      padding: 1rem;
      background: rgba(255, 23, 68, 0.1);
      border-radius: 4px;
    }

    /* Tabla de constituyentes */
    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    th {
      background: rgba(255, 255, 255, 0.05);
      padding: 0.75rem;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid var(--border-color);
    }

    td {
      padding: 0.75rem;
      border-bottom: 1px solid var(--border-color);
    }

    tbody tr {
      cursor: pointer;
      transition: background 0.2s;
    }

    tbody tr:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    tbody tr.selected {
      background: rgba(96, 165, 250, 0.2);
    }

    .code {
      font-family: monospace;
      font-weight: 600;
    }

    .name {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price {
      text-align: right;
      font-weight: 500;
    }

    .positive {
      color: var(--success-color);
    }

    .negative {
      color: var(--error-color);
    }

    .neutral {
      color: var(--text-secondary);
    }

    .trend-up { color: var(--success-color); }
    .trend-down { color: var(--error-color); }
    .trend-same { color: var(--text-secondary); }

    /* Resumen */
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .summary-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1.5rem;
    }

    .summary-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .summary-card h4 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .market {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin: 0 0 1rem 0;
    }

    .price-info {
      display: flex;
      align-items: baseline;
      gap: 1rem;
    }

    .big-price {
      font-size: 2rem;
      font-weight: 600;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      font-size: 0.9rem;
    }

    .info-grid strong {
      color: var(--text-secondary);
      font-weight: 500;
    }

    /* Historial */
    .history-stats {
      background: rgba(255, 255, 255, 0.02);
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }

    .history-stats p {
      margin: 0.5rem 0;
      font-size: 0.95rem;
    }

    .chart-preview {
      margin-top: 1.5rem;
    }

    .chart-preview h4 {
      margin-bottom: 1rem;
      color: var(--text-secondary);
    }
  `]
})
export class AppComponent implements OnInit {
  constituents = signal<ConstituentInstrument[]>([]);
  summary = signal<InstrumentDetail | null>(null);
  history = signal<ChartDataPoint[]>([]);
  selectedSymbol = signal<string>('');
  
  loading = signal({
    constituents: false,
    summary: false,
    history: false
  });

  error = signal({
    constituents: '',
    summary: '',
    history: ''
  });

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadConstituents();
  }

  loadConstituents() {
    this.loading.update(state => ({ ...state, constituents: true }));
    this.error.update(state => ({ ...state, constituents: '' }));

    this.mockDataService.getConstituents().subscribe({
      next: (response) => {
        if (response.success) {
          this.constituents.set(response.data.constituents);
        }
        this.loading.update(state => ({ ...state, constituents: false }));
      },
      error: (err) => {
        this.error.update(state => ({ 
          ...state, 
          constituents: `Error al cargar constituyentes: ${err.message}` 
        }));
        this.loading.update(state => ({ ...state, constituents: false }));
      }
    });
  }

  selectInstrument(symbol: string) {
    this.selectedSymbol.set(symbol);
    this.loadInstrumentSummary(symbol);
    this.loadInstrumentHistory(symbol);
  }

  loadInstrumentSummary(symbol: string) {
    this.loading.update(state => ({ ...state, summary: true }));
    this.error.update(state => ({ ...state, summary: '' }));

    this.mockDataService.getInstrumentSummary(symbol).subscribe({
      next: (response) => {
        if (response.success) {
          this.summary.set(response.data);
        }
        this.loading.update(state => ({ ...state, summary: false }));
      },
      error: (err) => {
        this.error.update(state => ({ 
          ...state, 
          summary: `Error al cargar resumen: ${err.message}` 
        }));
        this.loading.update(state => ({ ...state, summary: false }));
      }
    });
  }

  loadInstrumentHistory(symbol: string) {
    this.loading.update(state => ({ ...state, history: true }));
    this.error.update(state => ({ ...state, history: '' }));

    this.mockDataService.getInstrumentHistory(symbol).subscribe({
      next: (response) => {
        if (response.success) {
          this.history.set(response.data.chart);
        }
        this.loading.update(state => ({ ...state, history: false }));
      },
      error: (err) => {
        this.error.update(state => ({ 
          ...state, 
          history: `Error al cargar historial: ${err.message}` 
        }));
        this.loading.update(state => ({ ...state, history: false }));
      }
    });
  }

  // Migrar luego a shared/utils
  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-CL').format(value);
  }

  formatPercent(value: number): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  getTrendClass(value: number): string {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral';
  }

  getTrendIcon(trend: string): string {
    switch(trend) {
      case 'up': return '▲';
      case 'down': return '▼';
      default: return '■';
    }
  }

  getFirstDate(): string {
    const hist = this.history();
    return hist.length > 0 ? this.formatDate(hist[0].datetimeLastPrice) : '';
  }

  getLastDate(): string {
    const hist = this.history();
    return hist.length > 0 ? this.formatDate(hist[hist.length - 1].datetimeLastPrice) : '';
  }

  getTotalChange(): number {
    const hist = this.history();
    if (hist.length < 2) return 0;
    const first = hist[0].lastPrice;
    const last = hist[hist.length - 1].lastPrice;
    return ((last - first) / first) * 100;
  }

  getLastPoints(): ChartDataPoint[] {
    return this.history().slice(-10);
  }
}
