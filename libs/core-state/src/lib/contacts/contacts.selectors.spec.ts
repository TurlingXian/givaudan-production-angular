import { ContactsEntity } from './contacts.models';
import { State, contactsAdapter, initialState } from './contacts.reducer';
import * as ContactsSelectors from './contacts.selectors';

describe('Contacts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContactsId = (it) => it['id'];
  const createContactsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContactsEntity);

  let state;

  beforeEach(() => {
    state = {
      contacts: contactsAdapter.setAll(
        [
          createContactsEntity('PRODUCT-AAA'),
          createContactsEntity('PRODUCT-BBB'),
          createContactsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Contacts Selectors', () => {
    it('getAllContacts() should return the list of Contacts', () => {
      const results = ContactsSelectors.getAllContacts(state);
      const selId = getContactsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ContactsSelectors.getSelected(state);
      const selId = getContactsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getContactsLoaded() should return the current 'loaded' status", () => {
      const result = ContactsSelectors.getContactsLoaded(state);

      expect(result).toBe(true);
    });

    it("getContactsError() should return the current 'error' state", () => {
      const result = ContactsSelectors.getContactsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
