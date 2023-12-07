import { ButtonStyle } from './styles'

//Propriedades a serem recebidas na chamada deste componente.
type ButtonProps = {
  //children => string a ser exibida como texto dentro do botão
  children: string

  //desiredFunction => função a ser chamada quando o botão for clicado.
  //Esta propriedade é opcional por este componente ser usado para criar
  //um botao de submit do formulário de novo contato, de modo que, neste caso
  //especifico, nenhuma funcao foi chamada por aqui
  desiredFunction?: () => void
}

const Button = ({ children, desiredFunction }: ButtonProps) => {
  return (
    <ButtonStyle
      onClick={desiredFunction}
      //Propriedade para background-color baseado no texto interno do botao
      $buttonColor={children === 'Cancelar' ? 'red' : 'green'}
      //Propriedade de tipo da tag button baseado no texto inserido no botão
      type={children === 'Salvar' ? 'submit' : 'button'}
    >
      {children}
    </ButtonStyle>
  )
}
export default Button
