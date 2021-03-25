import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Entry } from '../../models/entry.model';
import { EntryDataService } from '../../services/entry-data.service';
import { institutes } from '../../assets/institutes';
import { studies } from '../../assets/studies';
import { COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

  faculties: String[] = ['SOWI', 'RE', 'TNF', 'MED'];
  types: String[] = ['Bachelorarbeit', 'Masterarbeit', 'Diplomarbeit', 'Dissertation'];
  institutes: String[] = institutes;
  languages: String[] = ['Deutsch', 'Englisch', 'Deutsch oder Englisch'];
  studies: String[] = studies.map(x => x.Studienkennzahl+' '+x.Studienart+' '+x.Studium);
  emps: User[];

  submitted = false;
  entry: Entry;
  case: string;
  id: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  tags: string[] = [];
  suitableStudies = new FormControl();
  contacts = new FormControl();
  selectedContacts: string[];
  asOfDate = new FormControl();

  currEntry: Entry = {
    author: '',
    title: '',
    description: '',
    type: '',
    faculty: '',
    institute: '',
    payment: false,
    employment: false,
    industryPartner: {
      name: '',
      website: '',
      text: ''
    },
    tags: [],
    languages: '',
    suitableStudies: [],
    publishedDate: '',
    lastEditedDate: '',
    contact1: '',
    contact2: '',
    contact3: '',
    contact4: '',
    contact5: '',
    visible: false,
    assigned: false,
    specialField: '',
    availableAsOfDate: ''
  };

  constructor(
    private _entryDataService: EntryDataService,
    private _tokenStorageService: TokenStorageService,
    private _userDataService: UserDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.case = x.case);
    this.route.queryParams.subscribe(x => this.id = x.id);
    this.entry = this.route.snapshot.data.entry;
    this.getEmps();
    if (this.entry) {
      if (this.entry[0] != null) {
        this.currEntry = this.entry[0];
        if (!this.entry[0].industryPartner) {
          this.currEntry.industryPartner = {
            name: '',
            website: '',
            text: ''
          }
        }
        this.asOfDate.setValue(new Date(this.currEntry.availableAsOfDate));
      }
    }
  }

  saveEntry(): void {
    var published, edited;
    if (this.case == 'newFromTemplate' || this.case == 'new') {
      published = new Date().toString();
      edited = new Date().toString();
    } else {
      published = this.currEntry.publishedDate;
      edited = new Date().toString();
    }

    const data: Entry = {
      author: this._tokenStorageService.getUser().user.group + this._tokenStorageService.getUser().user.matnr,
      title: this.currEntry.title,
      description: this.currEntry.description,
      type: this.currEntry.type,
      faculty: this.currEntry.faculty,
      institute: this.currEntry.institute,
      payment: this.currEntry.payment,
      employment: this.currEntry.employment,
      industryPartner: {
        name: this.currEntry.industryPartner.name,
        website: this.currEntry.industryPartner.website,
        text: this.currEntry.industryPartner.text
      },
      tags: this.currEntry.tags,
      languages: this.currEntry.languages,
      suitableStudies: this.currEntry.suitableStudies,
      publishedDate: published,
      lastEditedDate: edited,
      contact1: this.currEntry.contact1,
      contact2: this.currEntry.contact2,
      contact3: this.currEntry.contact3,
      contact4: this.currEntry.contact4,
      contact5: this.currEntry.contact5,
      visible: this.currEntry.visible,
      assigned: this.currEntry.assigned,
      specialField: this.currEntry.specialField,
      availableAsOfDate: new Date(this.currEntry.availableAsOfDate).toString()
    };

    if (this.id === undefined || this.id == '') {
      this._entryDataService.createEntry(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      this.submitted = true;
    } else {
      this._entryDataService.updateEntry(this.id, data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      this.submitted = true;
    }
  }

  newEntry(): void {
    this.submitted = false;
    this.currEntry = {
      author: '',
      title: '',
      description: '',
      type: '',
      faculty: '',
      institute: '',
      payment: false,
      employment: false,
      industryPartner: {
        name: '',
        website: '',
        text: ''
      },
      tags: null,
      languages: '',
      suitableStudies: null,
      publishedDate: '',
      lastEditedDate: '',
      contact1: '',
      contact2: '',
      contact3: '',
      contact4: '',
      contact5: '',
      visible: false,
      assigned: false,
      specialField: '',
      availableAsOfDate: ''
    };
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.currEntry.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.currEntry.tags.indexOf(tag);

    if (index >= 0) {
      this.currEntry.tags.splice(index, 1);
    }
  }

  suitableStudiesSelected(event): void {
    this.currEntry.suitableStudies = [];
    this.suitableStudies.value.forEach(element => {
      this.currEntry.suitableStudies.push(element.replace(/\D/g, ""));
    });
  }

  cancel(): void {
    this.newEntry();
  }

  indPartName(event): void {
    this.currEntry.industryPartner.name = event;
  }

  indPartWeb(event): void {
    this.currEntry.industryPartner.website = event;
  }

  indPartText(event): void {
    this.currEntry.industryPartner.text = event;
  }

  getEmps(): void {
    this._userDataService.getAllEmps().toPromise()
      .then(emps => {
        this.emps = emps;
      })
  }

  changedContacts(): void {
    if (this.contacts.value.length < 6) {
      this.selectedContacts = this.contacts.value;
    } else {
      this.contacts.setValue(this.selectedContacts);
    }

    if (this.contacts.value.length==1) {
      this.currEntry.contact1 = this.contacts.value[0].group + this.contacts.value[0].matnr;
    } else if (this.contacts.value.length==2) {
      this.currEntry.contact1 = this.contacts.value[0].group + this.contacts.value[0].matnr;
      this.currEntry.contact2 = this.contacts.value[1].group + this.contacts.value[1].matnr;
    } else if (this.contacts.value.length==3) {
      this.currEntry.contact1 = this.contacts.value[0].group + this.contacts.value[0].matnr;
      this.currEntry.contact2 = this.contacts.value[1].group + this.contacts.value[1].matnr;
      this.currEntry.contact3 = this.contacts.value[2].group + this.contacts.value[2].matnr;
    } else if (this.contacts.value.length==4) {
      this.currEntry.contact1 = this.contacts.value[0].group + this.contacts.value[0].matnr;
      this.currEntry.contact2 = this.contacts.value[1].group + this.contacts.value[1].matnr;
      this.currEntry.contact3 = this.contacts.value[2].group + this.contacts.value[2].matnr;
      this.currEntry.contact4 = this.contacts.value[3].group + this.contacts.value[3].matnr;
    } else if (this.contacts.value.length==5) {
      this.currEntry.contact1 = this.contacts.value[0].group + this.contacts.value[0].matnr;
      this.currEntry.contact2 = this.contacts.value[1].group + this.contacts.value[1].matnr;
      this.currEntry.contact3 = this.contacts.value[2].group + this.contacts.value[2].matnr;
      this.currEntry.contact4 = this.contacts.value[3].group + this.contacts.value[3].matnr;
      this.currEntry.contact5 = this.contacts.value[4].group + this.contacts.value[4].matnr;
    }
  }

  asOfDateChange(event): void {
    this.currEntry.availableAsOfDate = event.value;
  }
}
