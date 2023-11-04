import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '@givaudan-production-angular/api-interfaces';
import { ContactsFacade } from '@givaudan-production-angular/core-state';
import { Observable } from 'rxjs';
// import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'givaudan-production-angular-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {


  allContacts$: Observable<Contact[]> = this.contactsFacade.allContacts$;
  selectedContact$: Observable<Contact> = this.contactsFacade.selectedContact$;

  displayedColumns = ['id', 'age', 'name', 'gender', 'company', 'email', 'actions'];
  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef, private contactsFacade: ContactsFacade, private dialog: MatDialog,) {


  }

  ngOnInit(): void {
    this.reset();
    this.contactsFacade.mutations$.subscribe((_) => this.reset())
    this.cdr.detectChanges();
    // Assign the data to the data source for the table to render
    this.allContacts$.subscribe(res => {
      this.dataSource = new MatTableDataSource(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('dataSource', res, this.dataSource);
    });
  }

  reset() {
    this.loadContacts();
    this.selectContact(null);
  }

  resetForm() {
    this.selectContact(null);
  }

  selectContact(contact: Contact) {
    this.contactsFacade.selectContact(contact?.id);
  }

  loadContacts() {
    this.contactsFacade.loadContacts();
  }

  saveContact(contact: Contact) {
    this.contactsFacade.saveContact(contact);
  }

  deleteContact(contact: Contact) {
    this.contactsFacade.deleteContact(contact);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog() {
  }

}
