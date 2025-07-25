import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestSAML } from './request-saml';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private http: HttpClient) {}

  login() {
    this.http
      .post<{ redirectUrl: string; samlRequest: string }>(
        'http://localhost:8080/login',
        {}
      )
      .subscribe((res) => {
        // Redirección por POST (más seguro y estándar en SAML)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = res.redirectUrl;

        const countryInput = document.createElement('input');
        countryInput.type = 'hidden';
        countryInput.name = 'country';
        countryInput.value = 'ES';
        form.appendChild(countryInput);

        // Campo RelayState
        const relayStateInput = document.createElement('input');
        relayStateInput.type = 'hidden';
        relayStateInput.name = 'RelayState';
        relayStateInput.value = 'MyRelayState'; // Puedes cambiar el valor si lo necesitas
        form.appendChild(relayStateInput);

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'SAMLRequest';
        input.value = res.samlRequest;

        console.log('SAMLRequest:', res.samlRequest);

        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
      });
  }
}
