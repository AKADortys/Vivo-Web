import { Component, EventEmitter, input, Output } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { RemoveUser } from '../remove-user/remove-user';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tr[app-user-table]',
  imports: [CommonModule, FormatDatePipe, RemoveUser],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {
  user = input.required<User>();
  @Output() editUser = new EventEmitter<User>();
  @Output() removeUser = new EventEmitter<boolean>();

  public onEdit() {
    this.editUser.emit(this.user());
  }

  public onRemove() {
    this.removeUser.emit(true);
  }
}
