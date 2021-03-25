import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { EntryDataService } from '../../services/entry-data.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Entry } from '../../models/entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Component } from '@angular/core';

import { studies } from '../../assets/studies';

@Component({
  template: ''
})
export class EntryTableDataSource extends DataSource<Entry> {
  entries: Entry[];
  filteredEntries: Entry[];
  users: User[];

  paginator: MatPaginator;
  type: string;
  title: string;
  searchTerm: string = '';
  types: string[] = [];
  faculties: string[] = []

  typeFiltered: boolean = false;
  facultyFiltered: boolean = false;
  instituteFiltered: boolean = false;
  languageFiltered: boolean = false;
  courseFiltered: boolean = false;
  paymentFiltered: boolean = false;
  employmentFiltered: boolean = false;
  industryPartnerFiltered: boolean = false;

  constructor(
    private _entryDataService: EntryDataService,
    private _userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.route.queryParams.subscribe(params => this.type = params.type);
    this.retrieveEntries();
    this.retrieveUsers();
  }

  connect(): Observable<Entry[]> {
    this.filteredEntries = this.entries;

    const dataMutations = [
      observableOf(this.filteredEntries),
      this.paginator.page,
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.filteredEntries]);
    }));
  }

  resetDataSource(): void {
    this.filteredEntries = this.entries;
  }

  resetFilterBools(): void {
    this.typeFiltered = false;
    this.facultyFiltered = false;
    this.instituteFiltered = false;
    this.languageFiltered = false;
    this.courseFiltered = false;
    this.paymentFiltered = false;
    this.employmentFiltered = false;
    this.industryPartnerFiltered = false;
  }

  disconnect() { }

  private getPagedData(data: Entry[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  getFilteredDataBySearchTerm(searchTerm: string): void {
    this.filteredEntries = this.entries.filter(entry =>
      entry.title.trim().toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase()) ||
      entry.description.trim().toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase()) ||
      entry.institute.trim().toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase())
    );

    this.searchTerm = searchTerm;

    //this.paginator.length = this.filteredEntries.length;
  }

  filterType(type): void {
    if (!type) {
      this.typeFiltered = false;
      if (!this.facultyFiltered && !this.instituteFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) this.resetDataSource();
    } else {
      if (this.typeFiltered && !this.facultyFiltered && !this.instituteFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) {
        this.filteredEntries = this.entries.filter(entry => entry.type.trim().toLocaleLowerCase().includes(type.trim().toLocaleLowerCase()));
        this.typeFiltered = true;
      } else {
        this.filteredEntries = this.filteredEntries.filter(entry => entry.type.trim().toLocaleLowerCase().includes(type.trim().toLocaleLowerCase()));
        this.typeFiltered = true;
      }
    }
  }

  filterFaculty(faculty) {
    if (!faculty) {
      this.facultyFiltered = false;
      if (!this.typeFiltered && !this.instituteFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) this.resetDataSource();
    } else {
      if (this.facultyFiltered && !this.typeFiltered && !this.instituteFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) {
        this.filteredEntries = this.entries.filter(entry => entry.faculty.trim().toLocaleLowerCase().includes(faculty.trim().toLocaleLowerCase()));
        this.facultyFiltered = true;
      } else {
        this.filteredEntries = this.filteredEntries.filter(entry => entry.faculty.trim().toLocaleLowerCase().includes(faculty.trim().toLocaleLowerCase()));
        this.facultyFiltered = true;
      }
    }
  }

  filterInstitute(institute) {
    if (!institute) {
      this.instituteFiltered = false;
      if (!this.typeFiltered && !this.facultyFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) this.resetDataSource();
    } else {
      if (this.instituteFiltered && !this.typeFiltered && !this.facultyFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) {
        this.filteredEntries = this.entries.filter(entry => entry.institute.trim().toLocaleLowerCase().includes(institute.trim().toLocaleLowerCase()));
        this.instituteFiltered = true;
      } else {
        this.filteredEntries = this.filteredEntries.filter(entry => entry.institute.trim().toLocaleLowerCase().includes(institute.trim().toLocaleLowerCase()));
        this.instituteFiltered = true;
      }
    }
  }

  filterLanguage(language) {
    if (!language) {
      this.languageFiltered = false;
      if (!this.typeFiltered && !this.facultyFiltered && !this.courseFiltered && !this.instituteFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) this.resetDataSource();
    } else {
      if (this.languageFiltered && !this.typeFiltered && !this.instituteFiltered && !this.languageFiltered && !this.courseFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) {
        this.filteredEntries = this.entries.filter(entry => entry.languages.includes(language));
        this.languageFiltered = true;
      } else {
        this.filteredEntries = this.filteredEntries.filter(entry => entry.languages.includes(language));
        this.languageFiltered = true;
      }
    }
  }

  filterCourse(course) {
    if (!course) {
      this.courseFiltered = false;
      if (!this.typeFiltered && !this.facultyFiltered && !this.languageFiltered && !this.instituteFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) this.resetDataSource();
    } else {
      const study = studies.find(s => (s.Studium+' '+s.Studienart) == course).Studienkennzahl;
      if (this.courseFiltered && !this.typeFiltered && !this.instituteFiltered && !this.languageFiltered && !this.facultyFiltered && !this.paymentFiltered && !this.employmentFiltered && !this.industryPartnerFiltered) {
        this.filteredEntries = this.entries.filter(entry => entry.suitableStudies != null && entry.suitableStudies.includes(study));
        this.courseFiltered = true;
      } else {
        this.filteredEntries = this.filteredEntries.filter(entry => entry.suitableStudies != null && entry.suitableStudies.includes(study));
        this.courseFiltered = true;
      }
    }
  }

  filterPayment(payment) {
    if (payment) {
      this.filteredEntries = this.filteredEntries.filter(entry => entry.payment == payment);
      this.paymentFiltered = true;
    }
    else {
      this.resetDataSource();
      this.paymentFiltered = false;
    }
  }

  filterEmployment(employment) {
    if (employment) {
      this.filteredEntries = this.filteredEntries.filter(entry => entry.employment == employment);
      this.employmentFiltered = true;
    } else {
      this.resetDataSource();
      this.employmentFiltered = false;
    }
  }

  filterIndustryPartner(industryPartner) {
    if (industryPartner) {
      this.filteredEntries = this.filteredEntries.filter(entry => (entry.industryPartner != null) == industryPartner);
      this.industryPartnerFiltered = true;
    } else {
      this.resetDataSource();
      this.industryPartnerFiltered = false;
    }
  }

  retrieveEntries(): void {
    if (this.type == 'bac') {
      this._entryDataService.getBac().subscribe(data => this.entries = data.filter(entry => entry.visible && !entry.assigned));
      this.title = "Bachelorarbeiten";
    } else if (this.type == 'mas') {
      this._entryDataService.getMas().subscribe(data => this.entries = data.filter(entry => entry.visible && !entry.assigned));
      this.title = "Masterarbeiten";
    } else if (this.type == 'dip') {
      this._entryDataService.getDip().subscribe(data => this.entries = data.filter(entry => entry.visible && !entry.assigned));
      this.title = "Diplomarbeiten";
    } else if (this.type == 'dis') {
      this._entryDataService.getDis().subscribe(data => this.entries = data.filter(entry => entry.visible && !entry.assigned));
      this.title = "Dissertationen";
    } else {
      this._entryDataService.getAll().subscribe(data => this.entries = data.filter(entry => entry.visible && !entry.assigned));
    }
  }

  retrieveUsers(): void {
    this._userDataService.getAllUsers().subscribe(data => this.users = data);
  }
}
