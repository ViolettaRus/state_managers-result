import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { contactsStore } from '../../store'
import './GroupsPage.css'

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

const GroupsPage = observer(() => {
  const { groups, isLoading, error } = contactsStore

  const getGroupContactsCount = (groupId) => {
    const group = groups.find((g) => g.id === groupId)
    return group?.contactIds?.length ?? 0
  }

  if (isLoading) {
    return <div className="loading">Загрузка групп...</div>
  }

  if (error) {
    return <div className="error">Ошибка: {error.message}</div>
  }

  return (
    <div className="groups-page">
      <h2>Все группы</h2>

      <div className="groups-grid">
        {groups.map((group) => {
          const contactsCount = getGroupContactsCount(group.id)
          const color = getGroupColor(group.id)

          return (
            <Link key={group.id} to={`/group/${group.id}`} className="group-card">
              <div
                className="group-color-bar"
                style={{ backgroundColor: color }}
              />
              <div className="group-content">
                <h3>{group.name}</h3>
                <p className="group-description">{group.description}</p>
                <p className="group-count">
                  Контактов: {contactsCount}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {groups.length === 0 && (
        <div className="no-results">Группы не найдены</div>
      )}
    </div>
  )
})

export default GroupsPage
