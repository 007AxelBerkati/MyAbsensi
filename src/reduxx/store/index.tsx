import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxLogger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import {GlobalReducer, AkunReducer} from '../reducer';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const persistConfig = {
  key: 'root',
  blacklist: ['dataGlobal', 'AkunReducer'],
  storage: AsyncStorage,
};

const rootReducer = {
  dataGlobal: GlobalReducer,
  dataAkun: AkunReducer,
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

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof Store.dispatch;
