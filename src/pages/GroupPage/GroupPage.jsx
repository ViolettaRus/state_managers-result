import { observer } from 'mobx-react-lite'
import { useParams, Link } from 'react-router-dom'
import { contactsStore } from '../../store'
import './GroupPage.css'

const getGroupColor = (id) => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#95E1D3',
    '#F38181',
    '#AA96DA',
    '#FCBAD3',
  ]
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

const GroupPage = observer(() => {
  const { id } = useParams()
  const { groups, contacts } = contactsStore

  const group = groups.find((g) => g.id === id)
  const groupContactIds = group?.contactIds ?? []
  const groupContacts = contacts.filter((c) => groupContactIds.includes(c.id))
  const color = group ? getGroupColor(group.id) : null

  if (!group) {
    return (
      <div className="group-page">
        <div className="error">Группа не найдена</div>
        <Link to="/groups" className="back-link">
          ← Вернуться к списку групп
        </Link>
      </div>
    )
  }

  return (
    <div className="group-page">
      <Link to="/groups" className="back-link">
        ← Вернуться к списку групп
      </Link>

      <div className="group-detail">
        <div className="group-detail-header">
          <div
            className="group-detail-color"
            style={{ backgroundColor: color }}
          />
          <div className="group-detail-info">
            <h2>{group.name}</h2>
            <p className="group-detail-description">{group.description}</p>
            <p className="group-detail-count">
              Контактов в группе: {groupContacts.length}
            </p>
          </div>
        </div>

        <div className="group-contacts">
          <h3>Контакты в группе</h3>
          {groupContacts.length > 0 ? (
            <div className="contacts-list">
              {groupContacts.map((contact) => (
                <Link
                  key={contact.id}
                  to={`/contact/${contact.id}`}
                  className="contact-item"
                >
                  <img
                    src={contact.photo}
                    alt={contact.name}
                    className="contact-item-avatar"
                  />
                  <div className="contact-item-info">
                    <h4>{contact.name}</h4>
                    <p>{contact.phone}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-contacts">
              В этой группе пока нет контактов
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default GroupPage
