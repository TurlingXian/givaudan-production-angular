import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromContacts from './contacts/contacts.reducer';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export const selectRouter = createFeatureSelector<
    AppState,
    fromRouter.RouterReducerState<any>
>('router');

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    [fromContacts.CONTACTS_FEATURE_KEY]: fromContacts.ContactsState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    [fromContacts.CONTACTS_FEATURE_KEY]: fromContacts.contactsReducer,
};