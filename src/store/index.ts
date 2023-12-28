import { CONST } from '@/lib/constant';
import { removeAccessToken } from '@/lib/token';
import { AsyncThunk, PayloadAction, combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import account from './slice/account';
import association from './slice/association';
import customerStats from './slice/customerStats';
import graph from './slice/graph';
import organization from './slice/organization';
import statistics from './slice/statistics';
import wallet from './slice/wallet';
import users from './slice/users';
import appKey from './slice/appKey';
import smtp from './slice/smtp';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['association', 'wallet', 'account', 'appKey', 'smtp', 'organization']
};

const reducers = combineReducers({
  association,
  wallet,
  users,
  statistics,
  smtp,
  organization,
  appKey,
  customerStats,
  graph,
  account,
})

const reducerProxy = (state: any, action: PayloadAction<ReturnType<typeof reducers>>) => {
  if (action.type === 'auth/LOGOUT') {
    return reducers(undefined, action);
  }
  if (action.type === 'auth/CLEAR') {
    state = { ...state, ...action.payload }
    return reducers(state, action);
  }
  return reducers(state, action);
}

const persistedReducer = persistReducer(persistConfig, reducerProxy);

export type AppState = ReturnType<typeof reducers>

export const setStore: AsyncThunk<void, AppState, any> = createAsyncThunk(
  "auth/clear",
  async function (state, thunkAPI) {
    thunkAPI.dispatch({ type: 'auth/CLEAR', payload: state });
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async function (_payload, thunkAPI) {
    thunkAPI.dispatch({ type: 'auth/LOGOUT' });
    removeAccessToken()
    window.location.href = CONST.LOCATION.LOGIN
  }
);

const store = configureStore({
  reducer: persistedReducer,
})

export const makeStore = () => store

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
