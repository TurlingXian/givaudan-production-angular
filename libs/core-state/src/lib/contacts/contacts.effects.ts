import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as ContactsActions from './contacts.actions';
import { Contact } from '@givaudan-production-angular/api-interfaces';
import { ContactsService } from '@givaudan-production-angular/core-data';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class ContactsEffects {
  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.loadContacts),
    fetch({
      run: (action) => {
        return this.contactsService
          .all()
          .pipe(
            map((contacts: Contact[]) => {
              return ContactsActions.loadContactsSuccess({ contacts })
            }

            )
          )
      },

      onError: (action, error) => {
        alert('error');
        return EMPTY;
      },
    })
  ));

  loadContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.loadContact),
    fetch({
      run: (action) =>
        this.contactsService
          .find(action.contactId)
          .pipe(
            map((contact: Contact) =>
              ContactsActions.loadContactSuccess({ contact })
            )
          ),
      onError: (action, error) => {
        alert('error');
        return EMPTY;
      },
    })
  ));

  createContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.createContact),
    pessimisticUpdate({
      run: (action) =>
        this.contactsService
          .create(action.contact)
          .pipe(
            map((contact: Contact) =>
              ContactsActions.createContactSuccess({ contact })
            )
          ),
      onError: (action, error) => {
        alert('error');
        return of(EMPTY);
      },
    })
  ));

  updateContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.updateContact),
    pessimisticUpdate({
      run: (action) =>
        this.contactsService
          .update(action.contact)
          .pipe(
            map((contact: Contact) =>
              ContactsActions.updateContactSuccess({ contact })
            )
          ),
      onError: (action, error) => {
        alert('error');
        return EMPTY;
      },
    })
  ));

  deleteContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactsActions.deleteContact),
    pessimisticUpdate({
      run: (action) =>
        this.contactsService
          .delete(action.contact)
          .pipe(
            map((contact: Contact) =>
              ContactsActions.deleteContactSuccess({ contact })
            )
          ),
      onError: (action, error) => {
        alert('error');
        return EMPTY;
      },
    })
  ));

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService
  ) { }
}