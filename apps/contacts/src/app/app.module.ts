import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@givaudan-production-angular/core-data';
import { CoreStateModule } from '@givaudan-production-angular/core-state';
import { MaterialModule } from '@givaudan-production-angular/material';
import { AppComponent } from './app.component';
import { AddDialogComponent } from './contacts/add-dialog/add-dialog.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DeleteDialogComponent } from './contacts/delete-dialog/delete-dialog.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    DeleteDialogComponent,
    AddDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent
  ],
})
export class AppModule { }