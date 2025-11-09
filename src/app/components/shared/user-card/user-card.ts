import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  @Input() user!: User | null;
}
