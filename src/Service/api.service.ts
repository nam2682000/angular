import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IToken, IUser } from '../app/Interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiUrlUsers: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlUserAdd: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlUserUpdate: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlUserDelete: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlLogin: string = 'https://localhost:7229/Login';
  private apiUrlStudent: string = 'https://localhost:7229/Student';



  login(payload:ILogin): Observable<IToken> {
    return this.http.post<IToken>(this.apiUrlLogin, payload);
  }

  GetAllUser(): Observable<{data:string}> {
    return this.http.get<{data:string}>(this.apiUrlStudent);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrlUsers);
  }

  // Get request
  getUserById(id: number): Observable<IUser> {
    const url = `${this.apiUrlUsers}/${id}`;
    return this.http.get<IUser>(url);
  }


  // POST request
  addUser(post: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrlUserAdd, post);
  }

  // PUT request
  updateUser(id: number, post: IUser): Observable<IUser> {
    const url = `${this.apiUrlUserUpdate}/${id}`;
    return this.http.put<IUser>(url, post);
  }
  
  // DELETE request
  deleteUser(id: number): Observable<IUser> {
    const url = `${this.apiUrlUserDelete}/${id}`;
    return this.http.delete<IUser>(url);
  }
}
