import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Contact } from '@givaudan-production-angular/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import * as ContactsActions from './contacts.actions';
import * as ContactsSelectors from './contacts.selectors';

@Injectable()
export class ContactsFacade {
  loaded$ = this.store.pipe(select(ContactsSelectors.getContactsLoaded));
  allContacts$ = this.store.pipe(select(ContactsSelectors.getAllContacts));
  selectedContact$ = this.store.pipe(select(ContactsSelectors.getSelectedContact));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
      action.type === ContactsActions.createContact({} as any).type ||
      action.type === ContactsActions.updateContact({} as any).type ||
      action.type === ContactsActions.deleteContact({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectContact(selectedId: string) {
    this.dispatch(ContactsActions.selectContact({ selectedId }));
  }

  loadContacts() {
    this.dispatch(ContactsActions.loadContacts());
  }

  loadContact(contactId: string) {
    this.dispatch(ContactsActions.loadContact({ contactId }));
  }

  saveContact(contact: Contact) {
    if (contact.id) {
      this.updateContact(contact);
    } else {
      this.createContact(contact);
    }
  }

  createContact(contact: Contact) {
    this.dispatch(ContactsActions.createContact({ contact }));
  }

  updateContact(contact: Contact) {
    this.dispatch(ContactsActions.updateContact({ contact }));
  }

  deleteContact(contact: Contact) {
    this.dispatch(ContactsActions.deleteContact({ contact }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
