import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Entry } from "../models/entry.model";
import { EntryDataService } from "../services/entry-data.service";

@Injectable()
export class EntryResolve implements Resolve<Entry> {
    constructor(private _entryDataService: EntryDataService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Entry> {
        let id = route.queryParams.id;
        if (id) return this._entryDataService.getEntryById(id);
        else return null;
    }
}  