import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RemoteConfigComponent } from './remote-config/remote-config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RemoteConfigComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('shell');
}
