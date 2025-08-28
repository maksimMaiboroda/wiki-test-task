import { configureStore } from '@reduxjs/toolkit';
import { wikiApi } from '@services/wikiApi';

export const store = configureStore({
  reducer: {
    [wikiApi.reducerPath]: wikiApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wikiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
