import { HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface HttpParamsObject {
  [key: string]: string | number | boolean;
}

export abstract class BaseRequestService {
  private readonly api = '/api/';
  private readonly http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080';

  protected get<T>(endpoint: string, params?: HttpParams, context?: HttpContext): Observable<T> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;

    return this.http.get<T>(url, {
      params,
      context,
    });
  }

  protected postWithResponse<T, B>(endpoint: string, body?: B, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;
    return this.http.post<T>(url, body, { headers, observe: 'response' });
  }

  protected post<T, B>(endpoint: string, body?: B, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;
    return this.http.post<T>(url, body, { headers });
  }

  protected patch<T, B>(endpoint: string, body: B, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;
    return this.http.patch<T>(url, body, { headers });
  }

  protected put<T, B>(endpoint: string, body: B, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;
    return this.http.put<T>(url, body, { headers });
  }

  protected putWithResponse<T, B>(endpoint: string, body: B, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;
    return this.http.put<T>(url, body, { headers, observe: 'response' });
  }

  protected delete(endpoint: string, headers?: HttpHeaders): Observable<HttpResponse<void>> {
    const url = `${this.baseUrl}${this.api}${endpoint}`;
    return this.http.delete<HttpResponse<void>>(url, { headers });
  }

  protected addParamsToHttp(params: HttpParams, paramObject: HttpParamsObject): HttpParams {
    Object.keys(paramObject).forEach((key) => {
      const value = paramObject[key];
      if (value !== undefined && value !== null) {
        params = params.append(key, value);
      }
    });

    return params;
  }
}
