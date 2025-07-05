import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './app.css',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  login() {
    this.http
      .post<{ redirectUrl: string; samlRequest: string }>(
        'http://localhost:3000/login',
        {}
      )
      .subscribe((res) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = res.redirectUrl;

        const countryInput = document.createElement('input');
        countryInput.type = 'hidden';
        countryInput.name = 'country';
        countryInput.value = 'ES';
        form.appendChild(countryInput);

        const relayStateInput = document.createElement('input');
        relayStateInput.type = 'hidden';
        relayStateInput.name = 'RelayState';
        relayStateInput.value = 'MyRelayState';
        form.appendChild(relayStateInput);

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'SAMLRequest';
        input.value = res.samlRequest;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
      });
  }
}
