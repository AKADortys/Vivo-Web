import { Component, Input } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { LogoutButton } from '../../authentification/logout-button/logout-button';
import { ToggleTheme } from '../../utils/toggle-theme/toggle-theme';
import { CartBadge } from '../../order/cart-badge/cart-badge';

@Component({
  selector: 'app-user-drop-down-menu',
  imports: [LogoutButton, ToggleTheme, CartBadge],
  templateUrl: './user-drop-down-menu.html',
  styleUrl: './user-drop-down-menu.scss',
})
export class UserDropDownMenu {
  @Input() user!: User;
}
