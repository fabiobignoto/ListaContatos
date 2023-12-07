//Bibliotecas do React
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

//Reducers associados aos contatos
import { editContact, removeContact } from '../../store/reducers/reducerContact'

//Classe ContactClass
import ContactClass from '../../models/Contact'

//Tipos enumerados da categoria do contato e do tipo de telefone
import * as enumsCategory from '../../utils/enums/Categorias'
import * as enumsPhoneType from '../../utils/enums/PhoneType'

//Importação dos componentes criados para esta aplicação
import Button from '../Button'
import Input from '../Input'
import SelectCategory from '../SelectCategory'
import Tag from '../Tag'
import TagFigure from '../TagFigure'

//Importação dos componentes de estilos criados com styled.components
import {
  CardEditingButton,
  ContactCardStyle,
  DivPhoneTypeAndTag
} from './styles'

const ContactCard = (contact: ContactClass) => {
  //Modo de edição: valor booleano que indica se, no momento, este contato está sendo editado
  const [isEditing, setIsEditing] = useState(false)

  //Conjunto de variáveis e seus respectivos sets() para salvar temporariamente
  // as informações do contato
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState(enumsCategory.Categorias.TODOS)
  const [phone, setPhone] = useState('')
  const [phoneType, setPhoneType] = useState(enumsPhoneType.PhoneType.MOBILE)

  //Dispatcher para chamar os reducers
  const dispatcher = useDispatch()

  //Função para formatar o número de telefone, removendo caracteres especiais
  const preparePhoneToBeSet = (value: string) => {
    setPhone(value.replace(/\D/g, ''))
  }

  //Conjunto de useEffects para salvar os valores atuais do contato em variáveis que poderão ser
  //alteradas pelo usuário. Possibilita retornar facilmente para o valor original, caso o usuário
  //cancele a operação

  useEffect(() => {
    setName(contact.name)
  }, [contact.name])

  useEffect(() => {
    setPhone(contact.phone.phoneNumber)
  }, [contact.phone.phoneNumber])

  //Salva o tipo de telefone obtido como um tipo enumerado
  useEffect(() => {
    setPhoneType(contact.phone.phoneType as enumsPhoneType.PhoneType)
  }, [contact.phone.phoneType])

  useEffect(() => {
    setEmail(contact.email)
  }, [contact.email])

  //Salva a categoria do contato obtido como um tipo enumerado
  useEffect(() => {
    setCategory(contact.categoria as enumsCategory.Categorias)
  }, [contact.categoria])

  //UseEffect para alterar, automaticamente, o tipo de telefone a partir do número inserido,
  //sabendo que celulares no Brasil iniciam com dígito 9 após DDD
  useEffect(() => {
    if (phone.slice(2, 3)[0] === '9') {
      setPhoneType(enumsPhoneType.PhoneType.MOBILE)
    } else {
      setPhoneType(enumsPhoneType.PhoneType.LANDLINE)
    }
  }, [phone])

  //UseEffect para resetar os valores no caso do isEditing se alterar (dependencia do useEffect)
  //e seu novo valor for falso.
  useEffect(() => {
    if (isEditing === false) {
      resetChanges()
    }
  }, [isEditing])

  //Função para salvar o contato editado.
  const saveEditedContact = () => {
    //Chama o reducer editContact para salvar as informações alteradas
    dispatcher(
      editContact({
        name: name,
        categoria: category,
        email: email,
        phone: {
          phoneNumber: phone,
          phoneType: phoneType as enumsPhoneType.PhoneType
        },
        id: contact.id
      })
    )

    //Altera o valor da variável isEditing para falso
    setIsEditing(false)
  }

  //Função para formatar o número de telefone, colocando DDD entre parenteses e separando
  //o número com hifen
  const formatPhoneNumber = () => {
    if (contact.phone.phoneNumber.length === 11) {
      return `(${contact.phone.phoneNumber.substring(
        0,
        2
      )}) ${contact.phone.phoneNumber.substring(
        2,
        7
      )}-${contact.phone.phoneNumber.substring(7, 11)}`
    } else {
      return `(${contact.phone.phoneNumber.substring(
        0,
        2
      )}) ${contact.phone.phoneNumber.substring(
        2,
        6
      )}-${contact.phone.phoneNumber.substring(6, 10)}`
    }
  }

  //Função para retornar os valores das variáveis temporárias aos do contato salvo
  const resetChanges = () => {
    setPhone(contact.phone.phoneNumber)
    setPhoneType(contact.phone.phoneType)
    setName(contact.name)
    setEmail(contact.email)

    setIsEditing(false)
  }

  //Função para verificar se o campo de e-mail recebeu valor. No caso de não possui valor, o
  //campo e sua etiqueta (Tag) não serão exibidos
  const checkEmailExist = () => {
    if (contact.email !== '') {
      return (
        <div className="email">
          <TagFigure tagType="email" />
          <span>{contact.email}</span>
        </div>
      )
    } else {
      return ''
    }
  }

  //Função para chamar o reducer de remover contato (removeContact())
  const deleteContact = () => {
    dispatcher(removeContact(contact))
  }

  //Retorno do componente. São retornos diferentes para o caso do contato estar sendo exibido
  //(isEditing === false) ou editado (isEditing===true)

  return (
    <ContactCardStyle>
      <>
        {isEditing ? (
          <>
            <div className="name">
              <TagFigure tagType="name" />
              <Input
                currentValue={name}
                desiredFunc={(e) => setName(e)}
                placeholder="Nome do contato (obrigatório)"
                type="text"
                isRequired
              />
            </div>
            <div className="phone">
              <DivPhoneTypeAndTag>
                <TagFigure tagType="phone" />
                <Tag>{phoneType}</Tag>
              </DivPhoneTypeAndTag>
              <Input
                currentValue={phone}
                desiredFunc={(e) => preparePhoneToBeSet(e)}
                placeholder="Telefone"
                type="phone"
                isRequired
                isMobile={phoneType === enumsPhoneType.PhoneType.MOBILE}
              />
            </div>
            <div className="email">
              <TagFigure tagType="email" />
              <Input
                currentValue={email}
                desiredFunc={(e) => setEmail(e)}
                placeholder="E-mail do contato"
                type="text"
              />
            </div>
            <div className="category">
              <TagFigure tagType="category" />
              <SelectCategory
                type="category"
                desiredFunction={(e) =>
                  setCategory(e as enumsCategory.Categorias)
                }
                selectedOption={category as enumsCategory.Categorias}
              />
            </div>
            <div className="button">
              <CardEditingButton
                title="Salvar"
                onClick={saveEditedContact}
                $selectedColour="lightgreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              </CardEditingButton>
              <CardEditingButton
                title="Cancelar"
                onClick={resetChanges}
                $selectedColour="salmon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </CardEditingButton>
              <CardEditingButton
                title="Excluir"
                $selectedColour="transparent"
                onClick={deleteContact}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </CardEditingButton>
            </div>
          </>
        ) : (
          <>
            <div className="name">
              <TagFigure tagType="name" />
              <strong>{contact.name}</strong>
            </div>
            <div className="phone">
              <DivPhoneTypeAndTag>
                <TagFigure tagType="phone" />
                <Tag>{contact.phone.phoneType}</Tag>
              </DivPhoneTypeAndTag>
              <a
                title="Ligar para este contato"
                href={`tel:${formatPhoneNumber()}`}
              >
                {formatPhoneNumber()}
              </a>
            </div>
            {checkEmailExist()}
            {contact.categoria === enumsCategory.Categorias.TODOS ? (
              ''
            ) : (
              <div className="category">
                <TagFigure tagType="category" />

                <Tag>{contact.categoria}</Tag>
              </div>
            )}
            <div className="button">
              <Button desiredFunction={() => setIsEditing(true)}>Editar</Button>
            </div>
          </>
        )}
      </>
    </ContactCardStyle>
  )
}

export default ContactCard
