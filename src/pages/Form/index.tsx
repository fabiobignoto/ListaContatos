//Bibliotecas do React
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Reducers associados aos contatos
import { addContact } from '../../store/reducers/reducerContact'

//Tipos enumerados da categoria do contato e do tipo de telefone
import * as enumsCategory from '../../utils/enums/Categorias'
import * as enumsPhoneType from '../../utils/enums/PhoneType'

//Importação dos componentes criados para esta aplicação
import Button from '../../components/Button'
import Input from '../../components/Input'
import SelectCategory from '../../components/SelectCategory'
import Tag from '../../components/Tag'

//Importação do componente Container, que define as dimensões máximas da aplicação
//Mantida no arquivo styles.ts mais externo (juntamente com o createGlobalStyle())
import { Dflex } from '../../styles'

//Importação dos componentes de estilos criados com styled.components
import { FormStyle } from './styles'

const Form = () => {
  //Variáveis para armazenar e alterar os valores inseridos e selecionados
  //no formulário de novo contato
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneType, setPhoneType] = useState(enumsPhoneType.PhoneType.MOBILE)
  const [category, setCategory] = useState(enumsCategory.Categorias.TODOS)

  //Criação do dispatcher para chamar os reducers
  const dispatcher = useDispatch()

  //variavel para navegar entre as páginas
  const navigate = useNavigate()

  //Função para combinar os valores inseridos em um objeto da classe ContactClass e
  //enviar esse novo contato via dispatcher para store
  const createNewContact = (e: FormEvent) => {
    e.preventDefault()
    const newContact = {
      name: name,
      phone: {
        phoneType: phoneType,
        phoneNumber: phone
      },
      email: email,
      categoria: category
    }
    dispatcher(addContact(newContact))
    navigate('/')
  }

  //Função a ser chamada ao clicar em cancelar neste formulário,
  //fazendo a aplicação retornar a páginad e lista de contatos (ContactList)
  const cancelButtonFunction = () => {
    navigate('/')
  }

  //useEffect para selecionar o tipo de telefone a partir do terceiro digito do número
  //sempre que o número de telefone for alterado
  useEffect(() => {
    if (phone.slice(2, 3)[0] === '9') {
      setPhoneType(enumsPhoneType.PhoneType.MOBILE)
    } else {
      setPhoneType(enumsPhoneType.PhoneType.LANDLINE)
    }
  }, [phone])

  //Retorna o formulário de novo usuário completo.
  //No campo de telefone, o setPhone recebe o resultado da expressão regular, removendo assim
  //os símbolos inseridos pela máscara.
  return (
    <FormStyle onSubmit={(e) => createNewContact(e)}>
      <h2>Novo Contato</h2>

      <Input
        placeholder="Nome do contato (obrigatório)"
        isRequired={true}
        currentValue={name}
        desiredFunc={(newName: string) => setName(newName)}
        type="text"
      />

      <Input
        placeholder="E-mail do contato"
        currentValue={email}
        desiredFunc={(newEmail: string) => setEmail(newEmail)}
        type="text"
      />
      <Dflex>
        <Tag>{phoneType}</Tag>
        <Input
          isRequired={true}
          placeholder="Telefone"
          currentValue={phone}
          desiredFunc={(newPhone: string) =>
            setPhone(newPhone.replace(/\D/g, ''))
          }
          type="phone"
          isMobile={phoneType === enumsPhoneType.PhoneType.MOBILE}
        />
      </Dflex>
      <SelectCategory
        type="category"
        desiredFunction={(e) => setCategory(e as enumsCategory.Categorias)}
      />

      <Dflex>
        <Button>Salvar</Button>
        <Button desiredFunction={cancelButtonFunction}>Cancelar</Button>
      </Dflex>
    </FormStyle>
  )
}
export default Form
