import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StoreConfig {
    _id?: string;
    isStoreOpen: boolean;
    closingSchedule: {
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
    // Initial default state
    private storeStatusSubject = new BehaviorSubject<StoreConfig>({
        isStoreOpen: true,
        closingSchedule: { start: null, end: null }
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

    isStoreOpen(): boolean {
        const config = this.storeStatusSubject.value;
        if (!config.isStoreOpen) return false;

        if (config.closingSchedule && config.closingSchedule.start && config.closingSchedule.end) {
            const now = new Date();
            const start = new Date(config.closingSchedule.start);
            const end = new Date(config.closingSchedule.end);
            if (now >= start && now <= end) return false;
        }
        return true;
    }
}
