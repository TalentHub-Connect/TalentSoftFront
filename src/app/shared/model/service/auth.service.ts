import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../auth/aut.req';
import { TokenResponse } from '../auth/token';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user';
import { tap } from 'rxjs/operators';
import { encrypt } from '../../../utils/encrypt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<TokenResponse> {
    password=encrypt(password);
    console.log(password);
    const authReq: AuthenticationRequest = {
      username: username,
      password: password,
    };

    return this.http
      .post<TokenResponse>(`${environment.authURL}/login`, authReq)
      .pipe(
        tap((response: TokenResponse) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('role', response.role); // Join roles into a single string
          localStorage.setItem('username', username);
        })
      );
  }
  forgotPassword(username: string): Observable<void> {
    return this.http.post<void>(
      `${environment.authURL}/${username}/forgot-password`,
      null
    );
}
  createUser(
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    role:string
  ): Observable<any> {
    const user: User = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: '12345',
      role: role
    };
    return this.http.post<any>(`${environment.authURL}/${role}`, user);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.authURL}/users/${id}`);
  }
  changeUserRole(username: string, roles: string[]): Observable<any> {
    return this.http.put<any>(
      `${environment.authURL}/change-role/${username}`,
      roles
    );
  }
}
