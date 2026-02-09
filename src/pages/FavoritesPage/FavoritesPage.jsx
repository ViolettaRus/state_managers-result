import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { contactsStore, favoritesStore } from '../../store'
import './FavoritesPage.css'

const FavoritesPage = observer(() => {
  const { contacts, groups } = contactsStore
  const { contactIds: favoriteIds } = favoritesStore

  const favoriteContacts = contacts.filter((c) => favoriteIds.includes(c.id))

  const getContactGroups = (contactId) =>
    groups.filter((g) => g.contactIds?.includes(contactId))

  const handleRemoveFavorite = (contactId) => {
    favoritesStore.removeFromFavorites(contactId)
  }

  return (
    <div className="favorites-page">
      <h2>Избранные контакты</h2>

      {favoriteContacts.length > 0 ? (
        <div className="contacts-grid">
          {favoriteContacts.map((contact) => {
            const contactGroups = getContactGroups(contact.id)

            return (
              <div key={contact.id} className="contact-card">
                <div className="contact-header">
                  <img
                    src={contact.photo}
                    alt={contact.name}
                    className="contact-avatar"
                  />
                  <button
                    className="favorite-btn active"
                    onClick={() => handleRemoveFavorite(contact.id)}
                    title="Удалить из избранного"
                  >
                    ★
                  </button>
                </div>
                <h3>
                  <Link to={`/contact/${contact.id}`} className="contact-link">
                    {contact.name}
                  </Link>
                </h3>
                <p className="contact-phone">{contact.phone}</p>
                {contact.address && (
                  <p className="contact-address">{contact.address}</p>
                )}
                {contactGroups.length > 0 && (
                  <div className="contact-groups">
                    {contactGroups.map((group) => (
                      <Link
                        key={group.id}
                        to={`/group/${group.id}`}
                        className="contact-group"
                      >
                        <span className="group-badge">{group.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="no-favorites">
          <p>У вас пока нет избранных контактов</p>
          <Link to="/" className="link-to-contacts">
            Перейти к списку контактов
          </Link>
        </div>
      )}
    </div>
  )
})

export default FavoritesPage
