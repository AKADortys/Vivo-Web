import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TimeRange {
    start: string;
    end: string;
}

export interface OpeningHour {
    dayOfWeek: number;
    isOpen: boolean;
    morning: TimeRange;
    afternoon: TimeRange;
}

export interface PlannedClosure {
    start: Date | string;
    end: Date | string;
    reason?: string;
}

export interface SiteInfo {
    address: string;
    phone: string;
    email: string;
    description: string;
    aboutUsContent: string;
}

export interface Socials {
    facebook: string;
    instagram: string;
    twitter: string;
}

export interface StoreConfig {
    _id?: string;
    isStoreOpen: boolean;
    openingHours: OpeningHour[];
    plannedClosures: PlannedClosure[];
    siteInfo?: SiteInfo;
    socials?: Socials;
    deliveryArea?: {
        center: { lat: number; lng: number };
        radiusInMeters: number;
    };
    // Deprecated
    closingSchedule?: {
        start: string | null;
        end: string | null;
    };
    reason?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private readonly baseUrl = `${environment.apiUrl}config`;
    private http = inject(HttpClient);

    // Initial default state with safe defaults
    private storeStatusSubject = new BehaviorSubject<StoreConfig>({
        isStoreOpen: true,
        openingHours: [],
        plannedClosures: []
    });

    public storeStatus$ = this.storeStatusSubject.asObservable();

    constructor() {
        this.refreshConfig();
    }

    refreshConfig(): void {
        this.getConfig().subscribe();
    }

    getConfig(): Observable<any> {
        return this.http.get<{ data: StoreConfig }>(this.baseUrl).pipe(
            tap(response => {
                if (response.data) {
                    this.storeStatusSubject.next(response.data);
                }
            })
        );
    }

    updateConfig(data: Partial<StoreConfig>): Observable<any> {
        return this.http.patch<{ data: StoreConfig }>(this.baseUrl, data).pipe(
            tap(response => {
                if (response.data) {
                    this.storeStatusSubject.next(response.data);
                }
            })
        );
    }

    isStoreOpen(config: StoreConfig = this.storeStatusSubject.value): boolean {
        // 1. Manual Close
        if (!config.isStoreOpen) return false;

        const now = new Date();

        // 2. Planned Closures
        if (config.plannedClosures && config.plannedClosures.length > 0) {
            const activeClosure = config.plannedClosures.find(closure => {
                const start = new Date(closure.start);
                const end = new Date(closure.end);
                return now >= start && now <= end;
            });
            if (activeClosure) return false;
        }

        // 3. Opening Hours
        if (config.openingHours && config.openingHours.length > 0) {
            const currentDay = now.getDay();
            const todayConfig = config.openingHours.find(day => day.dayOfWeek === currentDay);

            if (!todayConfig || !todayConfig.isOpen) return false;

            const parseTime = (timeStr: string) => {
                const [hours, minutes] = timeStr.split(':').map(Number);
                const date = new Date(now);
                date.setHours(hours, minutes, 0, 0);
                return date;
            };

            const morningStart = parseTime(todayConfig.morning.start);
            const morningEnd = parseTime(todayConfig.morning.end);
            const afternoonStart = parseTime(todayConfig.afternoon.start);
            const afternoonEnd = parseTime(todayConfig.afternoon.end);

            const isMorningOpen = now >= morningStart && now <= morningEnd;
            const isAfternoonOpen = now >= afternoonStart && now <= afternoonEnd;

            if (!isMorningOpen && !isAfternoonOpen) return false;
        }

        // Fallback if no specific rules block it
        return true;
    }

    // Helper to get closure reason
    getClosureReason(config: StoreConfig = this.storeStatusSubject.value): string {
        if (!config.isStoreOpen) return config.reason || "Fermeture manuelle.";

        const now = new Date();

        if (config.plannedClosures && config.plannedClosures.length > 0) {
            const activeClosure = config.plannedClosures.find(closure => {
                const start = new Date(closure.start);
                const end = new Date(closure.end);
                return now >= start && now <= end;
            });
            if (activeClosure) return activeClosure.reason || "Fermeture exceptionnelle.";
        }

        if (config.openingHours && config.openingHours.length > 0) {
            const currentDay = now.getDay();
            const todayConfig = config.openingHours.find(day => day.dayOfWeek === currentDay);
            if (!todayConfig || !todayConfig.isOpen) return "Fermé aujourd'hui.";

            // If we are here, it means we are outside of opening hours but not in a planned closure
            // and not manually closed. Logic in isStoreOpen determines we are closed.
            return "Fermé à cette heure-ci.";
        }

        return "Le magasin est fermé.";
    }
}
