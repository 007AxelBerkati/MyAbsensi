import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore, AnyAction} from 'redux';
import reduxLogger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import ReduxThunk, {ThunkDispatch} from 'redux-thunk';
import {GlobalReducer, AkunReducer, AuthReducer} from '../reducer';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const persistConfig = {
  key: 'root',
  // blacklist: ['dataGlobal', 'AkunReducer', 'AuthReducer'],
  storage: AsyncStorage,
};

const rootReducer = {
  dataGlobal: GlobalReducer,
  dataAkun: AkunReducer,
  dataAuth: AuthReducer,
};

const rootReducers = combineReducers(rootReducer);

const configPersist = persistReducer(persistConfig, rootReducers);

export const Store = createStore(
  configPersist,
  applyMiddleware(ReduxThunk, reduxLogger)
);

export const Persistore = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof Store.dispatch;

type AppState = ReturnType<typeof rootReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
