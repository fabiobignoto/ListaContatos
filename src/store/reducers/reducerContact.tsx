//Bibliotecas do React
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//Classe ContactClass
import ContactClass from '../../models/Contact'

//Tipos enumerados da categoria do contato e do tipo de telefone
import * as enumsPhoneType from '../../utils/enums/PhoneType'
import * as enumsCategory from '../../utils/enums/Categorias'

//Função para checar se telefone inserido é condizente com o tipo de telefone recebido
import checkPhone from '../../utils/functions/checkPhone'

//Criando tipo do estado inicial
type ContactState = {
  items: ContactClass[]
}

//Criando a variavel initialState do tipo ContactState criado acima
const initialState: ContactState = {
  items: [
    {
      name: 'Nome do contato',
      phone: {
        phoneNumber: '1234567890',
        phoneType: enumsPhoneType.PhoneType.LANDLINE
      },
      categoria: enumsCategory.Categorias.PROFISSIONAL,
      email: 'usuario@servidor.com',
      id: 0
    }
  ]
}

//Criação do slice deste reducer
const contactsReducer = createSlice({
  //Nome do reducer:
  name: 'contactReducer',
  //Usando a variável initialState criada anteriormente como estado inicial deste Slice
  initialState,
  //Criando os reducers para os contatos
  reducers: {
    //Reducer para adicionar novo contato. Recebe dados do formulário e cria o id
    //baseado no número de contatos existentes
    addContact: (state, action: PayloadAction<Omit<ContactClass, 'id'>>) => {
      //Recuperando o id para o novo contato
      const contactIndex = state.items.length

      //Criando um novo contato baseado na classe ContactClass
      //Aqui já é requisitado o id
      const newContact: ContactClass = {
        ...action.payload,
        id: contactIndex
      }
      //Verifica se o número inserido é válido
      if (
        checkPhone(
          action.payload.phone.phoneNumber,
          action.payload.phone.phoneType
        ) === -1
      ) {
        alert('Número de telefone inválido!')
      } else {
        //Variável para salvar o contato encontrado com o telefone inserido
        const contactFound = state.items.find((contact) => {
          return contact.phone.phoneNumber === action.payload.phone.phoneNumber
        })
        if (
          //Verifica se o número existe na lista de contatos
          contactFound
        ) {
          //Avisa o usuário que o número já existe
          alert(
            `Número de telefone já inserido na lista de contatos sob nome de ${contactFound.name}.`
          )
        } else {
          //Se o número não existir na lista, insere o novo usuário na lista de contatos
          state.items.push(newContact)
        }
      }
    },
    //reducer para edição de contatos existentes
    editContact: (state, action: PayloadAction<ContactClass>) => {
      //Verifica se o número de telefone inserido é válido a partir do tipo
      if (
        checkPhone(
          action.payload.phone.phoneNumber,
          action.payload.phone.phoneType
        ) === -1
      ) {
        //Caso não o seja, notifica o usuário
        alert('Número de telefone inválido!')
      } else {
        //Caso seja válido, realiza busca o index do contato que apresente id igual ao contato
        //editado
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        )
        //Se o index for válido (maior ou igual a zero), substitui o valor existente no items[index]
        //pelo valor recebido por este reducer
        if (index >= 0) {
          state.items[index] = action.payload
        }
      }
    },
    //Reducer para remoção de contato. Recebe um contato, filtra a lista items de maneira
    //a excluir o contato recebido e remapeia os valores de id dos demais contatos
    removeContact: (state, action: PayloadAction<ContactClass>) => {
      const stateLength = state.items.length
      state.items = state.items.filter((item) => item.id !== action.payload.id)
      for (
        let index = action.payload.id + 1;
        index < stateLength - 1;
        index++
      ) {
        state.items[index].id = state.items[index].id - 1
      }
    }
  }
})

export default contactsReducer.reducer
export const { addContact, editContact, removeContact } =
  contactsReducer.actions
