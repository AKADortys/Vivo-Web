import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../../../services/user';
import { UserStats } from '../../../../interfaces/user';

@Component({
    selector: 'app-user-stats',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-stats.component.html',
    styleUrls: ['./user-stats.component.scss'],
})

export class UserStatsComponent implements OnInit {
    stats$: Observable<UserStats | undefined> | null = null;
    error: string | null = null;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.stats$ = this.userService.getGeneralStats().pipe(
            map(response => response.data),
            catchError(err => {
                console.error('Error fetching user stats:', err);
                this.error = 'Failed to load user statistics.';
                return of(undefined);
            })
        );
    }
}
