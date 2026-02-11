import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config';
import { map, take } from 'rxjs';

export const storeOpenGuard = () => {
    const router = inject(Router);
    const configService = inject(ConfigService);

    return configService.getConfig().pipe(
        take(1),
        map(res => {
            const config = res.data;
            if (!config) return true;

            if (!configService.isStoreOpen(config)) {
                const reason = configService.getClosureReason(config);
                alert(reason);
                router.navigate(['/']);
                return false;
            }

            return true;
        })
    );
};
