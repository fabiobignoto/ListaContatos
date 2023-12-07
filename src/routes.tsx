import { createBrowserRouter } from 'react-router-dom'
import Form from './pages/Form'
import ContactsList from './pages/ContactsList'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <ContactsList />
  },
  {
    path: '/form',
    element: <Form />
  }
])

export default routes
