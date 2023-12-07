//Bibliotecas do React
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Tipos enumerados da categoria do contato
import * as enums from '../../utils/enums/Categorias'

//Reducers associados aos contatos
import { setFilterCategory, setTerm } from '../../store/reducers/reducerFilter'

//Importação dos componentes criados para esta aplicação
import Input from '../Input'
import FilterTag from '../FilterTag'
import Button from '../Button'

//Importação dos componentes de estilos criados com styled.components
import { FirstDivHeader, HeaderStyle } from './styles'

const Header = () => {
  //Variaveis a serem passadas via dispatcher para alterar valores no filterReducer
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState(enums.Categorias.TODOS)

  //Criando variavel para alterar estados dos reducers
  const dispatcher = useDispatch()

  //variavel para navegar entre as páginas
  const navigate = useNavigate()

  //useEffects para atualizar o estado dos reducers em tempo real
  //o search é alterado e tempo real via onChange no input
  useEffect(() => {
    dispatcher(setTerm(search))
  }, [search])

  useEffect(() => {
    dispatcher(setFilterCategory(activeFilter))
  }, [activeFilter])

  //Navega para página de criação de novo contato
  const goToForm = () => {
    navigate('/form')
  }
  return (
    <HeaderStyle>
      <FirstDivHeader>
        <Input
          data-testid={'headerInput'}
          type="text"
          placeholder="Buscar"
          currentValue={search}
          desiredFunc={(newSearch: string) => setSearch(newSearch)}
        />
        <Button desiredFunction={goToForm}>Novo</Button>
      </FirstDivHeader>
      <ul>
        {Object.values(enums.Categorias).map((item) => (
          <FilterTag value={item} key={item}></FilterTag>
        ))}
      </ul>
    </HeaderStyle>
  )
}

export default Header
