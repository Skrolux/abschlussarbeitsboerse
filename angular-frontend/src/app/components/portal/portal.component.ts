import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Entry } from 'src/app/models/entry.model';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { EntryDataService } from '../../services/entry-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})

export class PortalComponent implements OnInit {
  entries: Entry[];
  users: User[];
  currUser: User;

  delete: boolean = false;

  dataSource: MatTableDataSource<Entry>;
  displayedColumns = ['title', 'type', 'institute', 'visible', 'assigned', 'lastEditedDate', 'edit', 'newFromTemplate', 'delete'];


  constructor(
    private _entryDataService: EntryDataService,
    private _userDataService: UserDataService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Entry>();
  }

  ngOnInit(): void {
    this.retrieveEntries();
    this.retrieveUsers();
  }

  retrieveEntries(): void {
    this.currUser = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this._entryDataService.getEntriesForAuthor(this.currUser.group + this.currUser.matnr)
      .subscribe(
        data => {
          this.entries = data;
          this.dataSource.data = this.entries;
        },
        error => {
          console.log(error);
        });
  }

  retrieveUsers(): void {
    this._userDataService.getAllUsers()
      .subscribe(data => this.users = data);
  }

  applySearchTerm(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteEntry(id: string) {
    this._entryDataService.delete(id);
  }

  openDialog(id: string, title: string): void {
    const dialogRef = this.dialog
      .open(DeleteDialog, {
        width: '20%',
        data: {
          id: id,
          title: title
        }
      });

    dialogRef.afterClosed().toPromise()
      .then(() => {
        this.deleteEntry(id);
        setTimeout(() => { window.location.reload() }, 2000 );
      });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

export interface DialogData {
  id: string;
  title: string;
}
