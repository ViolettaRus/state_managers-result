import { makeAutoObservable, runInAction } from 'mobx'

class ContactsStore {
  contacts = []
  groups = []
  isLoading = false
  error = null

  constructor() {
    makeAutoObservable(this)
  }

  async loadContacts() {
    this.isLoading = true
    this.error = null
    try {
      const res = await fetch('/contact.json')
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      runInAction(() => {
        this.contacts = data
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.error = e
        this.isLoading = false
      })
    }
  }

  async loadGroups() {
    try {
      const res = await fetch('/groups.json')
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      runInAction(() => {
        this.groups = data
      })
    } catch (e) {
      runInAction(() => {
        this.error = e
      })
    }
  }

  async load() {
    this.isLoading = true
    this.error = null
    try {
      const [contactsRes, groupsRes] = await Promise.all([
        fetch('/contact.json'),
        fetch('/groups.json'),
      ])
      if (!contactsRes.ok) throw new Error(contactsRes.statusText)
      if (!groupsRes.ok) throw new Error(groupsRes.statusText)
      const [contacts, groups] = await Promise.all([
        contactsRes.json(),
        groupsRes.json(),
      ])
      runInAction(() => {
        this.contacts = contacts
        this.groups = groups
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.error = e
        this.isLoading = false
      })
    }
  }
}

export const contactsStore = new ContactsStore()
