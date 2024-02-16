import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogin: boolean = true;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
      this.getAuth();
   }

  toggleView() {
    this.isLogin = !this.isLogin;
  }

  getAuth() {
    const token = localStorage.getItem('token');
    const isAuth = token ? true : false;
    this.isAuthenticatedSubject.next(isAuth);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  

  register(email: string, username: string, password: string): Promise<any> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('email', email);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    return this.httpClient
      .post('https://enes.zip:8080/api/auth/register', null, httpOptions)
      .toPromise();
  }

  login(email: string, password: string): Promise<any> {
    let params = new HttpParams().set('password', password).set('email', email);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    return this.httpClient
      .post('https://enes.zip:8080/api/auth/login', null, httpOptions)
      .toPromise();
  }
}
