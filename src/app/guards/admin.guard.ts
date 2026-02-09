import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user';

export const adminGuard = () => {
    const router = inject(Router);
    const authUserService = inject(AuthUserService);

    if (authUserService.isAdmin()) {
        return true;
    }

    router.navigate(['/']);
    return false;
};
