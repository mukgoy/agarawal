import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomSpinnerService } from './custom-spinner.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private spin: CustomSpinnerService) { }

  public prefixUri(uri: string) {
    if (uri.indexOf('://') > -1) {
      return uri;
    }
    return `${environment.apiURL}${uri}`;
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ url: this.prefixUri(request.url) });
    let pathname = new URL(request.url).pathname.replace("/ACE/api/","");
    let isLoader = !["background","app/list","messages","certificates","error-report"].includes(pathname);
    this.spin.show(isLoader);
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.spin.hide(isLoader);
        }
      }),
      catchError(err => {
        this.spin.hide(isLoader);
        return throwError(err);
      })
    );
  }
}
