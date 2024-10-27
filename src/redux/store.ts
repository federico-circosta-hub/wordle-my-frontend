import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import gameReducer from "./gameSlice";
import { wordleApi } from "./api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, gameReducer);

export const store = configureStore({
  reducer: {
    game: persistedReducer,
    [wordleApi.reducerPath]: wordleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordleApi.middleware),
});

export const persistor = persistStore(store);
