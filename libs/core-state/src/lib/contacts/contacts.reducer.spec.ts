import { ContactsEntity } from './contacts.models';

describe('Contacts Reducer', () => {
  const createContactsEntity = (id: string, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
  } as ContactsEntity);

  beforeEach(() => { });
});
