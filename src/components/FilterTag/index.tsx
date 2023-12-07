//Arquivos React
import { useDispatch, useSelector } from 'react-redux'

//Importação do tipo RootState a ser utilizado no useSelector para recuperar a categoria
//do filtro ativo
import { RootState } from '../../store'

//Reducers associados ao filtro
import { setFilterCategory } from '../../store/reducers/reducerFilter'

//Tipos enumerados da categoria do contato
import * as enumsCategory from '../../utils/enums/Categorias'

//Importação dos componentes de estilos criados com styled.components
import { FilterTagStyle } from './styles'

//Propriedades a serem recebidas na chamada do componente
//value=> texto exibido dentro do componente
type Props = {
  value: string
}

const FilterTag = ({ value }: Props) => {
  //Dispatcher para chamar os reducers
  const dispatcher = useDispatch()

  //useSelector para recuperar a categoria (category) do filtro ativo atual
  const { category } = useSelector((rootState: RootState) => rootState.filter)

  //Função para chamar o reducer para alteração da
  // categoria do filtro pelo reducer setFilterCategory()
  const filterCategory = () => {
    dispatcher(setFilterCategory(value as enumsCategory.Categorias))
  }

  //variável isActive para salvar o resultado do teste de comparação entre filtro ativo e valor
  //atual. O resultado foi salvo aqui para ser utilizado como propriedade do estilo FilterTagStyle
  //criada pelo styled.componets
  const isActive = value === category

  if (isActive) {
    return <FilterTagStyle $active={isActive}>{value}</FilterTagStyle>
  } else {
    return (
      <FilterTagStyle onClick={() => filterCategory()} $active={isActive}>
        {value}
      </FilterTagStyle>
    )
  }
}

export default FilterTag
