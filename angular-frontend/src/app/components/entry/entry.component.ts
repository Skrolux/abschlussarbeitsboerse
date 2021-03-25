import { Component, OnInit } from '@angular/core';
import { EntryDataService } from '../../services/entry-data.service';
import { Entry } from '../../models/entry.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { studies } from '../../assets/studies';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  entry: Entry;
  entryId: string;
  users: User[] = [];
  entryContacts: User[] = [];
  entryStudies: string[] = [];

  constructor(
    private _entryDataService: EntryDataService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(queryParams => this.entryId = queryParams._id);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  ngOnInit() {
    this.users = this.route.snapshot.data.users;
    this.retrieveEntry();
  }

  retrieveEntry() {
    this._entryDataService.getEntryById(this.entryId)
      .subscribe(
        data => {
          this.entry = data[0];
          this.getContacts(this.entry);
          this.getSuitableStudies(this.entry);
        },
        error => {
          console.log(error);
        });
  }

  getContacts(entry: Entry) {
    if (!entry.contact1 && !entry.contact2 && !entry.contact3 && !entry.contact4 && !entry.contact5) {
      this.entryContacts.push(this.users.find(user => user.group+user.matnr == entry.author));
    } else {
      if (this.entry.contact1) {
        this.entryContacts.push(this.users.find(user => user.group+user.matnr == entry.contact1));
      }
      if (this.entry.contact2) {
        this.entryContacts.push(this.users.find(user => user.group+user.matnr == entry.contact2));
      }
      if (this.entry.contact3) {
        this.entryContacts.push(this.users.find(user => user.group+user.matnr == entry.contact3));
      }
      if (this.entry.contact4) {
        this.entryContacts.push(this.users.find(user => user.group+user.matnr == entry.contact4));
      }
      if (this.entry.contact5) {
        this.entryContacts.push(this.users.find(user => user.group+user.matnr == entry.contact5));
      }
    }
  }

  getSuitableStudies(entry: Entry) {
    if (!entry.suitableStudies) {
      return;
    } else {
      entry.suitableStudies.forEach(s => this.entryStudies.push(studies.find(study => study.Studienkennzahl==s).Studienart+' '+studies.find(study => study.Studienkennzahl==s).Studium));
    }
  }
}
