import { CONST } from '@/lib/constant';
import { removeAccessToken } from '@/lib/token';
import { AsyncThunk, PayloadAction, combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, PersistConfig, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import account from './slice/account';
import appKey from './slice/appKey';
import association from './slice/association';
import cards from './slice/cards';
import customerStats from './slice/customerStats';
import graph from './slice/graph';
import organization from './slice/organization';
import smtp from './slice/smtp';
import statistics from './slice/statistics';
import team from './slice/team';
import transactions from './slice/transactions';
import twoFa from './slice/twoFa';
import users from './slice/users';
import wallet from './slice/wallet';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['account', 'appKey', 'smtp', 'twoFa', 'cards'],
};

const reducers = combineReducers({
  association,
  wallet,
  account,
  appKey,
  cards,
  smtp,
  organization,
  transactions,
  team,
  users,
  twoFa,
  statistics,
  customerStats,
  graph,
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

export const logOut = (link?: string) => createAsyncThunk(
  "auth/logout",
  async function (_payload, thunkAPI) {
    console.log('nice oh')
    thunkAPI.dispatch({ type: 'auth/LOGOUT' });
    removeAccessToken()
    window.location.href = link || CONST.LOCATION.LOGIN
  }
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const makeStore = () => store

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
