import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxLogger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import {GlobalReducer} from '../reducer';

const persistConfig = {
  key: 'root',
  blacklist: ['dataPokemon, dataGlobal, dataPokemonDetail'],
  storage: AsyncStorage,
};

const rootReducer = {
  dataGlobal: GlobalReducer,
};

const configPersist = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const Store = createStore(
  configPersist,
  applyMiddleware(ReduxThunk, reduxLogger)
);

export const Persistore = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
