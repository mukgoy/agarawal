import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { UtilService } from '../services/util.service';
import { ErrorLogService } from '../services/error-log.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		@Inject(PLATFORM_ID) public platformId: Object,
		public authService: AuthService,
		public utilService: UtilService,
		public errorLog: ErrorLogService
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			this.errorLog.handleError(new Error(JSON.stringify({ response: err, request })), 'http');
			if (!request.url.includes(environment.apiURL)) {
				return throwError(err);
			}
			if ([401, 403].indexOf(err.status) !== -1) {
				let errorMsg = typeof err.error == 'string' ? err.error : err.message
				this.utilService.openSnackBar(errorMsg || 'Unauthorized');
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				if (!request.url.includes('auth')) {
					// this.authService.logout();
				}
			} else {
				// console.log(err);
				this.utilService.openSnackBar(typeof err.error == 'string' ? err.error : err.message);
			}
			return throwError(err);
		}))
	}
}