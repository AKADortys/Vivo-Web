import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';
import { FormatDatePipe } from '../../../pipes/format-date-pipe';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, FormatDatePipe],
  standalone: true,
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  user = input.required<User>();
  @Output() editUser = new EventEmitter<User>();
  @Output() removeUser = new EventEmitter<string>();

  public onEdit() {
    this.editUser.emit(this.user());
  }

  public onRemove() {
    this.removeUser.emit(this.user()._id);
  }
}
