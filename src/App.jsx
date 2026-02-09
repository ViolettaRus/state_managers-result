import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import ContactPage from './pages/ContactPage/ContactPage'
import GroupsPage from './pages/GroupsPage/GroupsPage'
import GroupPage from './pages/GroupPage/GroupPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactsPage />} />
          <Route path="contact/:id" element={<ContactPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="group/:id" element={<GroupPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
