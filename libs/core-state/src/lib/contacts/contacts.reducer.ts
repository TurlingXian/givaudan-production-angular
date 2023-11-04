import { Contact } from '@givaudan-production-angular/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ContactsActions from './contacts.actions';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<Contact> {
  selectedId?: string | number; // which contacts record has been selected
  loaded: boolean; // has the contacts list been loaded
  error?: string | null; // last known error (if any)
}

export const contactsAdapter: EntityAdapter<Contact> = createEntityAdapter();

export const initialContactsState: ContactsState = contactsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _contactsReducer = createReducer(
  initialContactsState,
  on(ContactsActions.selectContact, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(ContactsActions.resetSelectedContact, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(ContactsActions.resetContacts, (state) => contactsAdapter.removeAll(state)),
  // Load contacts
  on(ContactsActions.loadContacts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContactsActions.loadContactsSuccess, (state, { contacts }) =>
    contactsAdapter.setAll(contacts, { ...state, loaded: true })
  ),
  on(ContactsActions.loadContactsFailure, onFailure),
  // Load contact
  on(ContactsActions.loadContact, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContactsActions.loadContactSuccess, (state, { contact }) =>
    contactsAdapter.upsertOne(contact, { ...state, loaded: true })
  ),
  on(ContactsActions.loadContactFailure, onFailure),
  // Add contact
  on(ContactsActions.createContactSuccess, (state, { contact }) =>
    contactsAdapter.addOne(contact, state)
  ),
  on(ContactsActions.createContactFailure, onFailure),
  // Update contact
  on(ContactsActions.updateContactSuccess, (state, { contact }) =>
    contactsAdapter.updateOne({ id: contact.id, changes: contact }, state)
  ),
  on(ContactsActions.updateContactFailure, onFailure),
  // Delete contact
  on(ContactsActions.deleteContactSuccess, (state, { contact }) =>
    contactsAdapter.removeOne(contact.id, state)
  ),
  on(ContactsActions.deleteContactFailure, onFailure)
);

export function contactsReducer(
  state: ContactsState | undefined,
  action: Action
) {
  return _contactsReducer(state, action);
}