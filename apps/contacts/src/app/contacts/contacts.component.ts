import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '@givaudan-production-angular/api-interfaces';
import { ContactsFacade } from '@givaudan-production-angular/core-state';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { CsvService } from '../../shared/csv.service';
// import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'givaudan-production-angular-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  file: File | null = null;

  allContacts$: Observable<Contact[]> = this.contactsFacade.allContacts$;
  selectedContact$: Observable<Contact> = this.contactsFacade.selectedContact$;

  displayedColumns = ['id', 'age', 'name', 'gender', 'company', 'email', 'actions'];
  dataSource: MatTableDataSource<Contact>;
  data: Contact[];
  importedData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef, private contactsFacade: ContactsFacade, private dialog: MatDialog, private _csvService: CsvService) {


  }

  ngOnInit(): void {
    this.reset();
    this.contactsFacade.mutations$.subscribe((_) => this.reset())
    this.cdr.detectChanges();
    // Assign the data to the data source for the table to render
    this.allContacts$.subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);

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

  createContact(contact: Contact) {
    this.contactsFacade.createContact(contact);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDeleteDialog(contact: Contact) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteContact(contact);
      }
    });
  }

  openAddContactDialog(row?: Contact): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '640px', disableClose: true, data: row
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.saveContact(data);
      }
    });
  }

  openContactInfo(row?: Contact): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '640px', data: { ...row, mode: 'look' }
    });
  }

  exportCSV() {
    let csvContent = this._csvService.saveDataInCSV(this.data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'test.csv';
    hiddenElement.click();
  }

  importCSV(): void {
    this.fileInput.nativeElement.click();
  }

  public async importDataFromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);
    this.importedData = this._csvService.importDataFromCSV(fileContent);
    this.importedData.map(el => this.saveContact(el));
  }

  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }

}
