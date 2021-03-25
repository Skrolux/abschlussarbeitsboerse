import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from 'src/app/models/entry.model';
import { EntryDataService } from 'src/app/services/entry-data.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { EntryTableDataSource } from './entry-table-datasource';
import { institutes } from '../../assets/institutes';
import { studies } from '../../assets/studies';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css']
})
export class EntryTableComponent implements AfterViewInit, OnInit {
  dataSource: EntryTableDataSource;

  expand: boolean = false;
  isCollapsed: boolean = true;

  types: String[] = ['Bachelorarbeit', 'Masterarbeit', 'Diplomarbeit', 'Dissertation'];
  selectedType = new FormControl();
  typeInitial = '';

  faculties: String[] = ['SOWI', 'RE', 'TNF', 'MED'];
  selectedFaculty = new FormControl();
  facultyInitial = '';

  institutes: String[] = institutes;
  filteredInstitutes: String[] = institutes;
  selectedInstitutes = new FormControl();
  instituteInitial = '';

  selectedLanguages = new FormControl();
  languageInitial = '';

  allStudies: String[] = studies.map(s => s.Studium+' '+s.Studienart);
  filteredStudies: String[] = studies.map(s => s.Studium+' '+s.Studienart);
  selectedStudies = new FormControl();
  courseInitial = '';

  payment = false;
  employment = false;
  industryPartner = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatTable) table: MatTable<Entry>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'type', 'institute', 'author'];

  constructor(
    private _entryDataService: EntryDataService,
    private _userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataSource = new EntryTableDataSource(this._entryDataService, this._userDataService, this.router, this.route);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onKeyInstitute(value) { 
    this.filteredInstitutes = this.searchInstitute(value);
  }
    
  searchInstitute(value: string) { 
    let filter = value.trim().toLocaleLowerCase();
    return this.institutes.filter(option => option.trim().toLocaleLowerCase().includes(filter));
  }

  onKeyStudy(value) { 
    this.filteredStudies = this.searchStudy(value);
  }

  searchStudy(value: string) { 
    let filter = value.trim().toLocaleLowerCase();
    return this.allStudies.filter(option => option.trim().toLocaleLowerCase().includes(filter));
  }

  applySearchTerm(value: string) {
    this.dataSource.getFilteredDataBySearchTerm(value);
  }

  filterType(event) {
    this.dataSource.filterType(event.value);
  }

  filterFaculty(event) {
    this.dataSource.filterFaculty(event.value);
  }

  filterInstitute(event) {
    this.dataSource.filterInstitute(event.value);
  }

  filterLanguage(event) {
    this.dataSource.filterLanguage(event.value);
  }

  filterCourse(event) {
    this.dataSource.filterCourse(event.value);
  }

  filterPayment(event) {
    this.dataSource.filterPayment(event.checked);
  }

  filterEmployment(event) {
    this.dataSource.filterEmployment(event.checked);
  }

  filterIndustryPartner(event) {
    this.dataSource.filterIndustryPartner(event.checked);
  }

  reset() {
    this.dataSource.resetDataSource();
    this.dataSource.resetFilterBools();
    this.typeInitial = '';
    this.facultyInitial = '';
    this.instituteInitial = '';
    this.languageInitial = '';
    this.courseInitial = '';
    this.payment = false;
    this.employment = false;
    this.industryPartner = false;
  }
}
