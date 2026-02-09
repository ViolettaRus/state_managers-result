import { makeAutoObservable } from 'mobx'

class ContactsFilterStore {
  name = ''
  groupId = null

  constructor() {
    makeAutoObservable(this)
  }

  setFilter(payload) {
    if (payload.name !== undefined) this.name = payload.name
    if (payload.groupId !== undefined) this.groupId = payload.groupId
  }
}

export const contactsFilterStore = new ContactsFilterStore()
