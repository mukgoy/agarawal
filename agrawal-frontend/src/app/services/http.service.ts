import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiURL.endsWith('/') ? environment.apiURL : environment.apiURL + '/';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  static prefix = '';

  constructor(
    protected httpClient: HttpClient
  ) { }

  static prefixUri(uri: string) {
    if (uri.indexOf('://') > -1) {
      return uri;
    }
    return `${apiURL}${HttpService.prefix}${uri}`;
  }

  public get<T>(uri: string, params = {}, options: object = {}): Observable<T> {
    const httpParams = this.transformQueryParams(params);
    return this.httpClient.get<T>(HttpService.prefixUri(uri), {
      params: httpParams,
      ...options,
    })
      .pipe(
        catchError(err => this.errorHandler(err, { uri, params }, options))
      );
  }

  public post<T>(uri: string, payload: object = {}): Observable<T> {
    return this.httpClient
      .post<T>(HttpService.prefixUri(uri), payload)
      .pipe(catchError(err => this.errorHandler(err, { uri, payload })));
  }

  public put<T>(uri: string, payload: object = {}): Observable<T> {
    payload = this.spoofHttpMethod(payload, 'PUT');
    return this.httpClient
      .put<T>(HttpService.prefixUri(uri), payload)
      .pipe(catchError(err => this.errorHandler(err, { uri, payload })));
  }

  public patch<T>(uri: string, payload: object = {}): Observable<T> {
    payload = this.spoofHttpMethod(payload, 'PUT');
    return this.httpClient
      .patch<T>(HttpService.prefixUri(uri), payload)
      .pipe(catchError(err => this.errorHandler(err, { uri, payload })));
  }

  public delete<T>(uri: string, payload: object = {}): Observable<T> {
    payload = this.spoofHttpMethod(payload, 'DELETE');
    return this.httpClient
      .delete<T>(HttpService.prefixUri(uri), payload)
      .pipe(catchError(err => this.errorHandler(err, { uri, payload })));
  }

  public postWithProgress(uri: string, params: FormData) {
    const req = new HttpRequest(
      'POST',
      HttpService.prefixUri(uri),
      params,
      {
        reportProgress: true,
      }
    );
    return this.httpClient.request(req).pipe(
      catchError(err => this.errorHandler(err, { uri, params })),
      filter(e =>
        [
          HttpEventType.Sent,
          HttpEventType.UploadProgress,
          HttpEventType.Response,
        ].includes(e.type)
      )
    );
  }

  protected transformQueryParams(params: object | null) {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value == null ? '' : value);
      });
    }

    return httpParams;
  }

  protected spoofHttpMethod(
    params: object | FormData,
    method: 'PUT' | 'DELETE'
  ): object | FormData {
    if (params instanceof FormData) {
      // (params as FormData).append('_method', method);
    } else {
      // params['_method'] = method;
    }

    return params;
  }

  public errorHandler(response: HttpErrorResponse, request: any = {}, options: any = {}): Observable<never> {
    // return throwError((ee) => new Error(JSON.stringify({response,request, options})));
    throw response
  }


}
