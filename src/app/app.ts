import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './components/shared/users-list/users-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
}
