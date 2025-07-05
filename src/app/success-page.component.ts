import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-succes-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Return Page</h2>
    <p>Has vuelto de la pasarela SAML.</p>
    <div *ngIf="user; else notAuth">
      <h3>Datos del usuario:</h3>
      <pre>{{ user | json }}</pre>
    </div>
    <ng-template #notAuth>
      <div *ngIf="error" class="error">{{ error }}</div>
    </ng-template>
  `,
})
export class SuccessPageComponent {
  user: any;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ user: any }>('http://localhost:3000/me', { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.user = data.user;
        },
        error: (err) => {
          this.error = 'No autenticado o sesión expirada';
        },
      });
  }
}
