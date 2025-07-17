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
      <button (click)="logout()" class="btn-login">Cerrar sesión</button>
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

  logout() {
    this.http
      .post<{ redirectUrl: string; samlLogoutRequest: string }>(
        'http://localhost:3000/logout',
        {}
      )
      .subscribe((res) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = res.redirectUrl;

        // Puedes agregar otros campos si el SP lo requiere
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'logoutRequest';
        input.value = res.samlLogoutRequest;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
      });
  }
}
