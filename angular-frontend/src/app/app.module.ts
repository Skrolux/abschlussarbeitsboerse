import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteDialog, PortalComponent } from './components/portal/portal.component';
import { EntryComponent } from './components/entry/entry.component';
import { EntryTableComponent } from './components/entry-table/entry-table.component';

import { EntryDataService } from './services/entry-data.service';
import { AppRoutingModule } from '../app/app-routing.module';
import { UserDataService } from './services/user-data.service';
import { AuthService } from './services/auth.service';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UsersResolve } from './helpers/users.resolve';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { EntryResolve } from './helpers/entry.resolve';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips'; 
import { FeedbackService } from './services/feedback.service';

@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    LoginComponent,
    HomeComponent,
    PortalComponent,
    EntryComponent,
    EntryTableComponent,
    DeleteDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  providers: [
    EntryDataService,
    UserDataService,
    AuthService,
    authInterceptorProviders,
    UsersResolve,
    EntryResolve,
    FeedbackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
