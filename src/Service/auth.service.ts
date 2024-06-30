import { Injectable } from '@angular/core';
import { ILogin, IToken } from '../app/Interface/user-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  private apiUrlLogin: string = 'https://localhost:7229/Login';

  login(payload:ILogin): Observable<IToken> {
    return this.http.post<IToken>(this.apiUrlLogin, payload);
  }

}
