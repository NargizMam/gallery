import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import persistStore from 'redux-persist/es/persistStore';
import {usersReducer} from "../features/users/usersSlice.ts";
import {PicturesReducer} from "../features/gallery/gallerySlice.ts";

const usersPersistConfig = {
  key: 'cocktails:users',
  storage: storage,
  whitelist: ['user'],

};
const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  pictures: PicturesReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;