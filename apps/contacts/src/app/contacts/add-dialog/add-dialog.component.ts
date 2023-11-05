import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'givaudan-production-angular-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public id: string;
  public name: string = ``;
  public company: string = ``;
  public email: string = ``;
  public gender: string = '1';
  public age: number;
  public addContactForm: FormGroup;
  public isLook = false;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      console.log('data', data);
      this.id = data.id;
      this.name = data.name;
      this.age = data.age;
      this.email = data.email;
      this.gender = data.gender === 'male' ? '1' : '2';
      this.company = data.company;
      this.isLook = data.mode;
    }
  }

  ngOnInit(): void {
    this.addContactForm = this.fb.group({
      name: [this.name, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      age: [this.age, [Validators.required, Validators.min(0)]],
      email: [this.email, [Validators.required, Validators.email]],
      company: [this.company],
      gender: [this.gender, [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddContact(): void {
    this.markAsDirty(this.addContactForm);
    if (this.addContactForm.valid) {
      const formdata = this.addContactForm.getRawValue();
      const data = {
        id: this.id,
        name: formdata.name,
        age: Number(formdata.age),
        email: formdata.email,
        company: formdata.company,
        gender: formdata.gender === '1' ? 'male' : 'female'
      };
      this.dialogRef.close(data);
    }
  }

  openDialog(): void {
    console.log(this.wasFormChanged);
    if (this.addContactForm.dirty) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {
          message: 'Are you sure want to discard?',
          buttonText: {
            ok: 'Discard',
          }
        },
        width: '340px',
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.closeDialog();
        }
      });
    } else {
      this.closeDialog();
    }
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  closeDialog() {
    this.dialog.closeAll();
  }


}
