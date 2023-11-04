import { Contact } from '@givaudan-production-angular/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedContact = createAction('[Contacts] Reset Selected Contact');
export const resetContacts = createAction('[Contacts] Reset Contacts');

// Select Contact
export const selectContact = createAction(
  '[Contacts] Select Contact',
  props<{ selectedId: string }>()
);

// Load Contacts
export const loadContacts = createAction('[Contacts] Load Contacts');

export const loadContactsSuccess = createAction(
  '[Contacts] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

export const loadContactsFailure = createAction(
  '[Contacts] Load Contacts Failure',
  props<{ error: any }>()
);

// Load Contact
export const loadContact = createAction(
  '[Contacts] Load Contact',
  props<{ contactId: string }>()
);

export const loadContactSuccess = createAction(
  '[Contacts] Load Contact Success',
  props<{ contact: Contact }>()
);

export const loadContactFailure = createAction(
  '[Contacts] Load Contact Failure',
  props<{ error: any }>()
);

// Create Contact
export const createContact = createAction(
  '[Contacts] Create Contact',
  props<{ contact: Contact }>()
);

export const createContactSuccess = createAction(
  '[Contacts] Create Contact Success',
  props<{ contact: Contact }>()
);

export const createContactFailure = createAction(
  '[Contacts] Create Contact Failure',
  props<{ error: any }>()
);

// Update Contact
export const updateContact = createAction(
  '[Contacts] Update Contact',
  props<{ contact: Contact }>()
);

export const updateContactSuccess = createAction(
  '[Contacts] Update Contact Success',
  props<{ contact: Contact }>()
);

export const updateContactFailure = createAction(
  '[Contacts] Update Contact Failure',
  props<{ error: any }>()
);

// Delete Contact
export const deleteContact = createAction(
  '[Contacts] Delete Contact',
  props<{ contact: Contact }>()
);

export const deleteContactCancelled = createAction('[Contacts] Delete Contact Cancelled');

export const deleteContactSuccess = createAction(
  '[Contacts] Delete Contact Success',
  props<{ contact: Contact }>()
);

export const deleteContactFailure = createAction(
  '[Contacts] Delete Contact Failure',
  props<{ error: any }>()
);