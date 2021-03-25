import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const auth_url: string = "http://localhost/api/auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    private _tokenStorageService: TokenStorageService) { }

  checkAuthenticated() {
    const authenticated = this._tokenStorageService.getToken();
    this.isAuthenticated.next(authenticated!=null && authenticated!='');
    return authenticated!=null && authenticated!='';
  }

  login(data: any): Observable<any> {
    return this._httpClient.post(auth_url, data, httpOptions);
  }
}
