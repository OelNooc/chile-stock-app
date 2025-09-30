import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div class="app-container">
      <h1>Chile Stock App</h1>
      <p>Aplicación de seguimiento de mercado de valores chileno</p>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
    }
  `]
})
export class AppComponent {
  title = 'chile-stock-app';
}