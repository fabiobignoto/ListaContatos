//Importação dos componentes de estilos criados com styled.components
import { TagStyle } from './styles'

//Propriedades a serem recebidas na chamada do componente
//gridAreaClass => propriedade para atribuir uma classe ao componente
//children => valor exibido no componente
type TagProps = {
  gridAreaClass?: string
  children: string
}

const Tag = ({ gridAreaClass, children }: TagProps) => {
  return <TagStyle className={gridAreaClass}>{children}</TagStyle>
}

export default Tag
