import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../app/Interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiUrlUsers: string = 'https://jsonplaceholder.typicode.com/users';
  apiUrlUserAdd: string = 'https://jsonplaceholder.typicode.com/users';
  apiUrlUserUpdate: string = 'https://jsonplaceholder.typicode.com/users';
  apiUrlUserDelete: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.apiUrlUsers);
  }

  // POST request
  addUser(post: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.apiUrlUserAdd, post);
  }

  // PUT request
  updatePost(id: number, post: UserInterface): Observable<UserInterface> {
    const url = `${this.apiUrlUserUpdate}/${id}`;
    return this.http.put<UserInterface>(url, post);
  }

  // DELETE request
  deletePost(id: number): Observable<UserInterface> {
    const url = `${this.apiUrlUserDelete}/${id}`;
    return this.http.delete<UserInterface>(url);
  }
}
