import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { contactsStore, contactsFilterStore, favoritesStore } from '../../store'
import './ContactsPage.css'

const ContactsPage = observer(() => {
  const { contacts, groups, isLoading, error } = contactsStore
  const filter = contactsFilterStore
  const { contactIds: favoriteIds } = favoritesStore

  const handleFilterChange = (field, value) => {
    contactsFilterStore.setFilter({ [field]: value })
  }

  const toggleFavorite = (contactId) => {
    if (favoriteIds.includes(contactId)) {
      favoritesStore.removeFromFavorites(contactId)
    } else {
      favoritesStore.addToFavorites(contactId)
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesName = contact.name.toLowerCase().includes(filter.name.toLowerCase())
    const matchesGroup = !filter.groupId || groups.some(
      (g) => g.id === filter.groupId && g.contactIds?.includes(contact.id)
    )
    return matchesName && matchesGroup
  })

  const getContactGroups = (contactId) =>
    groups.filter((g) => g.contactIds?.includes(contactId))

  if (isLoading) {
    return <div className="loading">Загрузка контактов...</div>
  }

  if (error) {
    return <div className="error">Ошибка: {error.message}</div>
  }

  return (
    <div className="contacts-page">
      <h2>Все контакты</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={filter.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="filter-input"
        />
        <select
          value={filter.groupId || ''}
          onChange={(e) =>
            handleFilterChange('groupId', e.target.value || null)
          }
          className="filter-select"
        >
          <option value="">Все группы</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="contacts-grid">
        {filteredContacts.map((contact) => {
          const contactGroups = getContactGroups(contact.id)
          const isFavorite = favoriteIds.includes(contact.id)

          return (
            <div key={contact.id} className="contact-card">
              <div className="contact-header">
                <img
                  src={contact.photo}
                  alt={contact.name}
                  className="contact-avatar"
                />
                <button
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(contact.id)}
                  title={
                    isFavorite
                      ? 'Удалить из избранного'
                      : 'Добавить в избранное'
                  }
                >
                  {isFavorite ? '★' : '☆'}
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

      {filteredContacts.length === 0 && (
        <div className="no-results">Контакты не найдены</div>
      )}
    </div>
  )
})

export default ContactsPage
