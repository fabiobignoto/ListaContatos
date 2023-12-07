//Tipos enumerados da categoria do contato e do tipo de telefone
import * as enumsCategory from '../../utils/enums/Categorias'
import * as enumsPhoneType from '../../utils/enums/PhoneType'

//Importação dos componentes de estilos criados com styled.components
import { Select } from './styles'

//Propriedades a serem recebidas na chamada do componente
//desiredFunction => função a ser chamada na modificação do valor da tag <select/>
//selectedOption => valor selecionado (defaultValue) no caso de edição do contato
type Props = {
  desiredFunction: (
    value: enumsCategory.Categorias | enumsPhoneType.PhoneType
  ) => void
  selectedOption?: enumsCategory.Categorias | enumsPhoneType.PhoneType
  type: 'category' | 'phoneType'
}

const SelectCategory = ({ desiredFunction, selectedOption, type }: Props) => {
  //Dois tipos de retorno, um para a seleção da categoria do contato e um para
  //o tipo de telefone
  if (type === 'category') {
    return (
      <Select
        defaultValue={
          selectedOption ? selectedOption : enumsCategory.Categorias.TODOS
        }
        onChange={(e) =>
          desiredFunction(e.target.value as enumsCategory.Categorias)
        }
      >
        {Object.values(enumsCategory.Categorias).map((category) => (
          <option key={category} value={category as enumsCategory.Categorias}>
            {category}
          </option>
        ))}
      </Select>
    )
  } else {
    return (
      <Select
        defaultValue={
          selectedOption ? selectedOption : enumsPhoneType.PhoneType.MOBILE
        }
        onChange={(e) =>
          desiredFunction(e.target.value as enumsPhoneType.PhoneType)
        }
      >
        {Object.values(enumsPhoneType.PhoneType).map((category) => (
          <option key={category} value={category as enumsPhoneType.PhoneType}>
            {category}
          </option>
        ))}
      </Select>
    )
  }
}

export default SelectCategory
