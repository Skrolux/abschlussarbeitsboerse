import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const users_url: string = 'http://localhost/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(users_url);
  }

  getAllEmps(): Observable<User[]> {
    return this._http.get<User[]>(users_url+"/emp");
  }

  getUser(matNr: string): Observable<User> {
    return this._http.post<User>(users_url, { author: matNr });
  }
}
