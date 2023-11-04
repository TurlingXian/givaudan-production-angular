// import { NgModule } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { readFirst } from '@nrwl/angular/testing';

// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule, Store } from '@ngrx/store';

// import { NxModule } from '@nrwl/angular';

// import { ContactsEntity } from './contacts.models';
// import { ContactsEffects } from './contacts.effects';
// import { ContactsFacade } from './contacts.facade';

// import * as ContactsSelectors from './contacts.selectors';
// import * as ContactsActions from './contacts.actions';
// import {
//   CONTACTS_FEATURE_KEY,
// } from './contacts.reducer';

// interface TestSchema {
// }

// describe('ContactsFacade', () => {
//   let facade: ContactsFacade;
//   let store: Store<TestSchema>;
//   const createContactsEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as ContactsEntity);

//   beforeEach(() => {});

//   describe('used in NgModule', () => {
//     beforeEach(() => {
//       @NgModule({
//         imports: [
//           StoreModule.forFeature(CONTACTS_FEATURE_KEY, reducer),
//           EffectsModule.forFeature([ContactsEffects]),
//         ],
//         providers: [ContactsFacade],
//       })
//       class CustomFeatureModule {}

//       @NgModule({
//         imports: [
//           NxModule.forRoot(),
//           StoreModule.forRoot({}),
//           EffectsModule.forRoot([]),
//           CustomFeatureModule,
//         ],
//       })
//       class RootModule {}
//       TestBed.configureTestingModule({ imports: [RootModule] });

//       store = TestBed.get(Store);
//       facade = TestBed.get(ContactsFacade);
//     });

//     /**
//      * The initially generated facade::loadAll() returns empty array
//      */
//     it('loadAll() should return empty list with loaded == true', async (done) => {
//       try {
//         let list = await readFirst(facade.allContacts$);
//         let isLoaded = await readFirst(facade.loaded$);

//         expect(list.length).toBe(0);
//         expect(isLoaded).toBe(false);

//         facade.dispatch(ContactsActions.loadContacts());

//         list = await readFirst(facade.allContacts$);
//         isLoaded = await readFirst(facade.loaded$);

//         expect(list.length).toBe(0);
//         expect(isLoaded).toBe(true);

//         done();
//       } catch (err) {
//         done.fail(err);
//       }
//     });

//     /**
//      * Use `loadContactsSuccess` to manually update list
//      */
//     it('allContacts$ should return the loaded list; and loaded flag == true', async (done) => {
//       try {
//         let list = await readFirst(facade.allContacts$);
//         let isLoaded = await readFirst(facade.loaded$);

//         expect(list.length).toBe(0);
//         expect(isLoaded).toBe(false);

//         facade.dispatch(
//           ContactsActions.loadContactsSuccess({
//             contacts: [
//               createContactsEntity('AAA'),
//               createContactsEntity('BBB'),
//             ],
//           })
//         );

//         list = await readFirst(facade.allContacts$);
//         isLoaded = await readFirst(facade.loaded$);

//         expect(list.length).toBe(2);
//         expect(isLoaded).toBe(true);

//         done();
//       } catch (err) {
//         done.fail(err);
//       }
//     });
//   });
// });
