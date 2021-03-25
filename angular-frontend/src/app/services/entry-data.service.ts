import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';

const entries_url: string = "http://localhost:5200/api/entries";

@Injectable({
  providedIn: 'root'
})
export class EntryDataService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this._http.get<Entry[]>(entries_url);
  }

  getBac(): Observable<Entry[]> {
    return this._http.get<Entry[]>(entries_url+"/bac");
  }

  getMas(): Observable<Entry[]> {
    return this._http.get<Entry[]>(entries_url+"/mas");
  }

  getDip(): Observable<Entry[]> {
    return this._http.get<Entry[]>(entries_url+"/dip");
  }

  getDis(): Observable<Entry[]> {
    return this._http.get<Entry[]>(entries_url+"/dis");
  }
  
  createEntry(data: any): Observable<any> {
    return this._http.post(entries_url, data);
  }

  getEntryById(id: string): Observable<Entry> {
    let params = new HttpParams();
    params = params.set('_id', id);
    return this._http.get<Entry>(entries_url, { params });
  }

  getEntriesForAuthor(author: string): Observable<Entry[]> {
    let params = new HttpParams();
    params = params.set('author', author);
    return this._http.get<Entry[]>(entries_url, { params });
  }

  updateEntry(entryId: any, entry: any): Observable<any> {
    return this._http.put(entries_url, { entryId, entry });
  } 

  delete(id: string): boolean {
    let params = new HttpParams();
    params = params.set('_id', id);
    this._http.delete(entries_url, { params })
      .subscribe(res => console.log(res));
    return true;
  }
}
