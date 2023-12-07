//Bibliotecas do React
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

//Importação do tipo RootState a ser utilizado no useSelector para recuperar a lista
//de contatos
import { RootState } from '../../store'

//Importação da classe ContactClass
import ContactClass from '../../models/Contact'

//Importação dos componentes criados para esta aplicação
import Header from '../../components/Header'
import ContactCard from '../../components/ContactCard'

//Importação do componente Container, que define as dimensões máximas da aplicação
//Mantida no arquivo styles.ts mais externo (juntamente com o createGlobalStyle())
import { Container } from '../../styles'

//Importação dos componentes de estilos criados com styled.components
import { SummarySearch } from './styles'

//Tipos enumerados da categoria do contato
import * as enumsCategory from '../../utils/enums/Categorias'

const ContactsList = () => {
  //variável para salvar e alterar a mensagem a ser exibida quando algum filtro estiver ativo
  const [message, setMessage] = useState('')

  //Recuperando contatos salvos e armazenando na variavel items
  const { items } = useSelector((rootState: RootState) => rootState.contact)

  //Recuperando os valores dos filtros ativos
  const { category, term } = useSelector(
    (rootState: RootState) => rootState.filter
  )

  //Função utilizando .filter() para filtrar os dados segundo os filtros de busca selecionados
  //Retorna o array de contatos com apenas os contatos que respeitam os filtros selecionados
  const filterItems = () => {
    let filteredItems = items

    if (term.length > 0) {
      filteredItems = filteredItems.filter(
        (contact: ContactClass) =>
          contact.name.toLowerCase().search(term.toLowerCase()) >= 0
      )
    }

    if (category !== enumsCategory.Categorias.TODOS) {
      filteredItems = filteredItems.filter(
        (contact: ContactClass) =>
          (contact.categoria as enumsCategory.Categorias) ===
          (category as enumsCategory.Categorias)
      )
    }

    return filteredItems
  }

  //Variavel para armazenar os contatos filtrados
  const filteredContacts = filterItems()

  //useEffect para gerar a mensagem resumo do resultado da filtragem dos contatos
  useEffect(() => {
    let temporaryMessage = `${filteredContacts.length} contato(s) encontrado(s)`

    if (term.length > 0) {
      temporaryMessage = `${temporaryMessage} na busca por "${term}"`
    }
    if (category !== enumsCategory.Categorias.TODOS) {
      temporaryMessage = `${temporaryMessage} na categoria "${category}"`
    }
    temporaryMessage = `${temporaryMessage}.`
    setMessage(temporaryMessage)
  }, [category, filteredContacts, filteredContacts.length, message, term])

  //Variavel booleana para definir se a mensagem de resumo da filtragem dos contatos
  //deve ser exibida
  const showMessage = term !== '' || category !== enumsCategory.Categorias.TODOS

  //Função de comparação para .sort(), organizando os contatos exibidos em ordem alfabética
  const compareFunction = (a: ContactClass, b: ContactClass) => {
    return a.name.localeCompare(b.name)
  }

  // Retorna <ContactCard/> para cada contato mapeado a partir da lista de contatos filtrados
  //(variável filteredContacts)
  return (
    <div>
      <Header />
      <Container>
        {showMessage ? <SummarySearch>{message}</SummarySearch> : ''}
        {filteredContacts
          .slice()
          .sort(compareFunction)
          .map((item) => (
            <ContactCard
              key={item.id}
              name={item.name}
              phone={item.phone}
              categoria={item.categoria}
              email={item.email}
              id={item.id}
            />
          ))}
      </Container>
    </div>
  )
}

export default ContactsList
