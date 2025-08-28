import { configureStore } from '@reduxjs/toolkit';
import { wikiApi } from '@services/wikiApi';

export const middlewareConfigurator = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(wikiApi.middleware);

export const store = configureStore({
  reducer: {
    [wikiApi.reducerPath]: wikiApi.reducer,
  },
  middleware: middlewareConfigurator,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
