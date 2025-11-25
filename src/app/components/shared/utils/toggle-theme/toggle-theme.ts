import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-theme',
  imports: [FormsModule],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
})
export class ToggleTheme implements OnInit {
  private key = 'theme';
  currentTheme = signal<boolean>(true);

  ngOnInit(): void {
    this.initTheme();
    this.currentTheme.set(this.isDark());
  }
  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.key, theme);
  }

  initTheme() {
    const saved = localStorage.getItem(this.key) as 'light' | 'dark' | null;
    this.setTheme(saved ?? 'light');
  }

  toggle() {
    const current = document.documentElement.getAttribute('data-bs-theme') as
      | 'light'
      | 'dark';
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
  isDark() {
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  }
}
