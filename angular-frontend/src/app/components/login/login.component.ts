import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    public loginInvalid: boolean;
    public isLoggedIn: boolean;
    public isLoginFailed = false
    permissions: string[] = [];
    studies: string[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _authService: AuthService, 
        private _tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            fullMatNr: ['', Validators.required],
            password: ['', Validators.required]
        });
        if (this._tokenStorageService.getToken() && this._authService.checkAuthenticated()) {
            this.isLoggedIn = true;
            this.permissions = this._tokenStorageService.getUser().permissions;
            this.studies = this._tokenStorageService.getUser().studies;
            this.router.navigate(['/home']);
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            const loginData = {
                group: this.form.get('fullMatNr').value.replace(/[^a-zA-Z]+/g, ''),
                matnr: this.form.get('fullMatNr').value.replace(/\D/g, ""),
                password: this.form.get('password').value
            }
            this._authService.login(loginData)
                .subscribe(
                    data => {
                        const helper = new JwtHelperService();

                        this._tokenStorageService.saveToken(data.token);
                        this._tokenStorageService.saveUser(helper.decodeToken(data.token));

                        this.isLoginFailed = false;
                        this.isLoggedIn = true;
                        this.permissions = this._tokenStorageService.getUser().permissions;
                        this.studies = this._tokenStorageService.getUser().studies;
                        this.loginInvalid = false;

                        this._authService.isAuthenticated.next(true);
                        this.reloadPage();
                    },
                    err => {
                        this.loginInvalid = true;
                        this.isLoginFailed = true;
                    });
        }
    }

    reloadPage(): void {
        window.location.reload();
    }
}