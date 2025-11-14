import { Component } from '@angular/core';
import { UsersList } from '../../shared/user/users-list/users-list';

@Component({
  selector: 'app-dashboard-client',
  imports: [UsersList],
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient {}
