//Tipos enumerados do tipo de telefone
import * as enumsPhoneType from '../enums/PhoneType'

//Função para checar se o número de telefone é condizente com o tipo de telefone enviado para
//a store
const checkPhone = (phone: string, phoneType: enumsPhoneType.PhoneType) => {
  if (
    (phone.length === 10 && phoneType === enumsPhoneType.PhoneType.LANDLINE) ||
    (phone.length === 11 && phoneType === enumsPhoneType.PhoneType.MOBILE)
  ) {
    return phone
  } else {
    return -1
  }
}

export default checkPhone
