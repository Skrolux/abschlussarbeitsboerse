import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserDataService } from "../services/user-data.service";
import { User } from "../models/user.model";

@Injectable()
export class UsersResolve implements Resolve<User[]> {
  constructor(private _userDataService: UserDataService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this._userDataService.getAllUsers();
  }
}  