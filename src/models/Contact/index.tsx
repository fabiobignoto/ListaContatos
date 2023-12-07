//Criação da classe ContactClass, padronizando assim a forma como as diferentes partes da
//aplicação controlam e manipulam os dados associados aos contatos

//Tipos enumerados do tipo de telefone
import * as enums from '../../utils/enums/PhoneType'

//Propriedades a serem recebidas na chamada do componente
//phoneNumber => o número do telefone
//phoneType => o tipo do telefone a partir dos tipos enumerados
type phone = {
  phoneNumber: string
  phoneType: enums.PhoneType
}

class ContactClass {
  name: string
  phone: phone

  email: string
  categoria: string
  id: number

  constructor(
    name: string,
    phone: phone,

    email: string,
    categoria: string,
    id: number
  ) {
    this.name = name
    this.phone = phone
    this.email = email
    this.categoria = categoria
    this.id = id
  }
}

export default ContactClass
