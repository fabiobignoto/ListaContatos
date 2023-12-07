//Bibliotecas do React
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//Tipos enumerados da categoria do contato
import * as enumsCategory from '../../utils/enums/Categorias'

//Tipo do estado inicial do filtro
type FilterState = {
  term: string
  category: enumsCategory.Categorias
}

//Criando a variável de estado inicial a partir do tipo criado acima
const initialState: FilterState = {
  term: '',
  category: enumsCategory.Categorias.TODOS
}

//Criação do slice deste reducer
const filterReducer = createSlice({
  //Nome do reducer
  name: 'filterReducer',
  //Usando a variável initialState criada anteriormente como estado inicial deste Slice
  initialState,
  reducers: {
    //Reducer para alterar o filtro de texto inserido pelo usuário. Recebe uma string e
    //a salva no state.term
    setTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload
    },
    //Reducer para alterar a categoria do filtro. Recebe uma string e a salva no state.category
    //como um tipo enumerado
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload as enumsCategory.Categorias
    }
  }
})

export default filterReducer.reducer
export const { setFilterCategory, setTerm } = filterReducer.actions
