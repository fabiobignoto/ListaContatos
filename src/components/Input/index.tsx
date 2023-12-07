//Bibliotecas do React
import { ChangeEvent } from 'react'
import InputMask from 'react-input-mask'

//Importação dos componentes de estilos criados com styled.components
import { InputStyle } from './styles'

//Propriedades a serem recebidas na chamada do componente
//type e placeholder => propriedades da tag <input/>
// currentValue => valor atual do campo (para o caso de edição dos contatos; caso contrário, possui valor "")
// desiredFunc => função a ser chamada via onChange do campo input, permitindo salvar os dados digitados conforme o são
// isRequired => Booleano; Se possuir valor é obrigatório nesse campo
//isMobile => Booleano; Se o campo é para celular ou telefone fixo (no caso de type="phone")
type Props = {
  type: string
  placeholder: string
  currentValue: string
  desiredFunc: (value: string) => void
  isRequired?: boolean
  isMobile?: boolean
}

const Input = ({
  type,
  placeholder,
  currentValue,
  desiredFunc,
  isRequired,
  isMobile
}: Props) => {
  //Duas situações para esse componente:

  //1) type="phone". O componente retornado deve ser um InputMask (react-input-mask)
  //possuindo a respectiva máscara para número de telefone

  //2) qualquer outro tipo de <input/>. Retorna um componente estilizado Input
  //(criado via styled-components)

  if (type === 'phone') {
    return (
      <InputMask
        className="inputMaskStyle"
        mask={isMobile ? '(99) 99999-9999' : '(99) 9999-9999'}
        maskChar={null}
        required={isRequired}
        type="text"
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          desiredFunc(e.target.value)
        }
        value={currentValue}
      />
    )
  } else {
    return (
      <InputStyle
        required={isRequired}
        type={type}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          desiredFunc(e.target.value)
        }
        value={currentValue}
      />
    )
  }
}

export default Input
