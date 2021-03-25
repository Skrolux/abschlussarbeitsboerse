import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PortalComponent } from './components/portal/portal.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { EntryComponent } from './components/entry/entry.component';
import { EntryTableComponent } from './components/entry-table/entry-table.component';
import { UsersResolve } from './helpers/users.resolve';
import { EntryResolve } from './helpers/entry.resolve';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'entries', component: EntryTableComponent },
  { path: 'entry', 
    component: EntryComponent,
    resolve: {
      users: UsersResolve
    }
  },
  { path: 'add-entry',
    component: AddEntryComponent,
    resolve: {
      entry: EntryResolve
    }
  },
  { path: 'portal', component: PortalComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
