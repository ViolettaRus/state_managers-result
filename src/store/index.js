import { contactsStore } from './contactsStore'
import { contactsFilterStore } from './contactsFilterStore'
import { favoritesStore } from './favoritesStore'

export const rootStore = {
  contacts: contactsStore,
  contactsFilter: contactsFilterStore,
  favorites: favoritesStore,
}

export { contactsStore, contactsFilterStore, favoritesStore }
