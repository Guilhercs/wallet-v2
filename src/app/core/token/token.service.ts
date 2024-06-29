import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public isTokenExpired(token?: string): boolean {
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === null) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  public getTokenExpirationDate(token: string): Date | null {
    const decoded = jwt_decode.jwtDecode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
