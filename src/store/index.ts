import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { authSlice } from './slices/AuthSlice';
import { meetingsSlice } from './slices/MeetingSlice';

const persistConfig = {
  key: 'root', // 持久化的 key
  storage, // 使用的存储引擎
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice.reducer,
    meetings: meetingsSlice.reducer,
  }),
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 的特定 action
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
