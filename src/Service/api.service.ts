import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../app/Interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiUrlUsers: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlUserAdd: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlUserUpdate: string = 'https://jsonplaceholder.typicode.com/users';
  private apiUrlUserDelete: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.apiUrlUsers);
  }

  // Get request
  getUserById(id: number): Observable<UserInterface> {
    const url = `${this.apiUrlUsers}/${id}`;
    return this.http.get<UserInterface>(url);
  }


  // POST request
  addUser(post: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.apiUrlUserAdd, post);
  }

  // PUT request
  updateUser(id: number, post: UserInterface): Observable<UserInterface> {
    const url = `${this.apiUrlUserUpdate}/${id}`;
    return this.http.put<UserInterface>(url, post);
  }
  

  // DELETE request
  deleteUser(id: number): Observable<UserInterface> {
    const url = `${this.apiUrlUserDelete}/${id}`;
    return this.http.delete<UserInterface>(url);
  }
}
