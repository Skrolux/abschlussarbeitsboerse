import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const feedback_url: string = "http://localhost:5200/api/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  sendFeedback(data): Observable<any> {
    return this._http.post(feedback_url, data);
  }
}
