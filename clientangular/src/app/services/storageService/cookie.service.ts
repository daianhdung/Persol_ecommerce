import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private cookieStore: { [key: string]: string } = {};

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string) {
    this.parseCookies();
    return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  remove(key: string) {
    document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string, expiresInMinutes: number) {
    const date = new Date();
    date.setTime(date.getTime() + expiresInMinutes * 60 * 1000);
    const expires = date.toUTCString();
    let cookieString = `${key}=${value}; expires=${expires}; path=/`;
    document.cookie = cookieString;
  }

  setCookieNoExpired(key: string, value: string){
    document.cookie = `${key}=${value}`;
  }
}
