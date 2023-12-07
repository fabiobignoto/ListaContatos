//Bibliotecas do React
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

//Importando store, para que os demais componentes tenham acesso aos reducers e estados
import { storeConfigure } from './store'

//Importando rotas das páginas da aplicação
import routes from './routes'

//Importando estilo global criado
import { GlobalStyle } from './styles'

//Importando arquivo de estilo css
import './App.css'

const store = storeConfigure()

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App
