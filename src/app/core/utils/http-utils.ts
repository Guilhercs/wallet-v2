import { HttpHeaders, HttpParams } from '@angular/common/http';

export class Http {
  static createParams = (path: string, bucket: string): HttpParams => {
    return new HttpParams().set('path', path).set('bucket', bucket);
  };

  static createHeaders = (token: string): HttpHeaders => {
    return new HttpHeaders({
      'Content-Type': 'application/octet-stream/json',
      Authorization: `Bearer ${token}`,
    });
  };
}
