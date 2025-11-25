import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  imports: [],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
})
export class ToggleTheme implements OnInit {
  private key = 'theme';

  ngOnInit(): void {
    this.initTheme();
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
