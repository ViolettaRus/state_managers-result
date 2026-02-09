import { makeAutoObservable } from 'mobx'

class FavoritesStore {
  contactIds = []

  constructor() {
    makeAutoObservable(this)
  }

  addToFavorites(id) {
    if (!this.contactIds.includes(id)) {
      this.contactIds.push(id)
    }
  }

  removeFromFavorites(id) {
    this.contactIds = this.contactIds.filter((cid) => cid !== id)
  }
}

export const favoritesStore = new FavoritesStore()
