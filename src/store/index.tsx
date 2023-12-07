import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import reducerContact from './reducers/reducerContact'
import reducerFilter from './reducers/reducerFilter'

const rootReducer = combineReducers({
  contact: reducerContact,
  filter: reducerFilter
})

export function storeConfigure(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer> //Da acesso ao estado (valores)
export type AppStore = ReturnType<typeof storeConfigure> // Da acesso a toda Store, com reducers, middlewares e estados
