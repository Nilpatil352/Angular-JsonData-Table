import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header class="bar">
      <h1>Acme – UserData Table</h1>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
