import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FeedbackService } from './services/feedback.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'abschlussarbeitsboerse-frontend';
  isAuthenticated: boolean;
  isStudent: boolean;
  message: string = '';
  feedbackSubmitted: boolean = false;

  constructor(
    public _authService: AuthService,
    public _tokenStorageService: TokenStorageService,
    public router: Router,
    public _feedbackService: FeedbackService) {
    this._authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  ngOnInit(): void {
    this.isAuthenticated = this._authService.checkAuthenticated();
    this.isStudent = this._tokenStorageService.getUser().user.group == 'k';
    console.log(this.router.getCurrentNavigation.toString());
  }

  logOut(): void {
    this._tokenStorageService.signOut();
    this._authService.isAuthenticated.next(false);
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  sendFeedback(): void {
    var data = {
      timestamp: new Date().toString(),
      currentUrl: this.router.url,
      feedbackMessage: this.message
    };
    this._feedbackService.sendFeedback(data).subscribe();

    this.feedbackSubmitted = true;
    setTimeout(() => { this.feedbackSubmitted = false; this.message = '' }, 2500);
  }
}
