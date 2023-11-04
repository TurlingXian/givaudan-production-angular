import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'givaudan-production-angular-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts = [{
    "id": "5b2eee0a8fdd5b71c8148490",
    "age": 29,
    "name": "Campos York",
    "gender": "male",
    "company": "AVENETRO",
    "email": "camposyork@avenetro.com",
  },
  {
    "id": "5b2eee0a9cd29e820c10edad",
    "age": 20,
    "name": "Esperanza Boone",
    "gender": "female",
    "company": "COSMETEX",
    "email": "esperanzaboone@cosmetex.com",
  },];

  displayedColumns = ['id', 'age', 'name', 'gender', 'company', 'email'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.contacts);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface UserData {
  id: string;
  name: string;
  gender: string;
  company: string;
  email: string;
}
