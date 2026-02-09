import { Link, Outlet } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">Контакты</h1>
          <ul className="nav-links">
            <li>
              <Link to="/">Все контакты</Link>
            </li>
            <li>
              <Link to="/groups">Группы</Link>
            </li>
            <li>
              <Link to="/favorites">Избранное</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
