import { observer } from 'mobx-react-lite'
import { useParams, Link } from 'react-router-dom'
import { contactsStore, favoritesStore } from '../../store'
import './ContactPage.css'

const ContactPage = observer(() => {
  const { id } = useParams()
  const { contacts, groups } = contactsStore
  const { contactIds: favoriteIds } = favoritesStore

  const contact = contacts.find((c) => c.id === id)
  const contactGroups = contact
    ? groups.filter((g) => g.contactIds?.includes(contact.id))
    : []
  const isFavorite = favoriteIds.includes(id)

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesStore.removeFromFavorites(id)
    } else {
      favoritesStore.addToFavorites(id)
    }
  }

  if (!contact) {
    return (
      <div className="contact-page">
        <div className="error">Контакт не найден</div>
        <Link to="/" className="back-link">
          ← Вернуться к списку контактов
        </Link>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <Link to="/" className="back-link">
        ← Вернуться к списку контактов
      </Link>

      <div className="contact-detail">
        <div className="contact-detail-header">
          <img
            src={contact.photo}
            alt={contact.name}
            className="contact-detail-avatar"
          />
          <div className="contact-detail-info">
            <h2>{contact.name}</h2>
            <button
              className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '★ В избранном' : '☆ Добавить в избранное'}
            </button>
          </div>
        </div>

        <div className="contact-detail-body">
          <div className="detail-item">
            <span className="detail-label">Телефон:</span>
            <span className="detail-value">{contact.phone}</span>
          </div>
          {contact.address && (
            <div className="detail-item">
              <span className="detail-label">Адрес:</span>
              <span className="detail-value">{contact.address}</span>
            </div>
          )}
          {contact.birthday && (
            <div className="detail-item">
              <span className="detail-label">День рождения:</span>
              <span className="detail-value">{contact.birthday}</span>
            </div>
          )}
          {contactGroups.length > 0 && (
            <div className="detail-item">
              <span className="detail-label">Группы:</span>
              <div className="detail-groups">
                {contactGroups.map((group) => (
                  <Link
                    key={group.id}
                    to={`/group/${group.id}`}
                    className="group-badge-large"
                  >
                    {group.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default ContactPage
