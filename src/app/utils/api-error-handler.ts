import { HttpErrorResponse } from '@angular/common/http';

export function extractApiErrorMessage(error: HttpErrorResponse | any): string {
    if (error instanceof HttpErrorResponse) {
        if (error.error && typeof error.error === 'object' && error.error.message) {
            return error.error.message;
        }
        if (typeof error.error === 'string') {
            return error.error;
        }
    }
    if (error && error.message) {
        return error.message;
    }
    return 'Une erreur inattendue est survenue.';
}
