import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user';

export const authGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthUserService);

    if (authService.isAuthenticated()) {
        return true;
    }
    router.navigate(['/login']);
    return false;
};
