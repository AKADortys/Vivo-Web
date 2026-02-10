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
            if (!config) return true; // Default open if no config

            // Check manual status
            if (!config.isStoreOpen) {
                alert(config.reason || "Le magasin est fermé.");
                router.navigate(['/']);
                return false;
            }

            // Check schedule
            if (config.closingSchedule && config.closingSchedule.start && config.closingSchedule.end) {
                const now = new Date();
                const start = new Date(config.closingSchedule.start);
                const end = new Date(config.closingSchedule.end);
                if (now >= start && now <= end) {
                    alert(config.reason || "Le magasin est fermé selon les horaires définis.");
                    router.navigate(['/']);
                    return false;
                }
            }

            return true;
        })
    );
};
