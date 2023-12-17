import { CONST } from '@/lib/constant';
import { removeAccessToken } from '@/lib/token';
import { AsyncThunk, PayloadAction, combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import account from './slice/account';
import auth from './slice/auth';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  // whitelist: ['main']
  // blacklist: ['auth']
};

const reducers = combineReducers({
  auth,
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
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
})

export const makeStore = () => store

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });