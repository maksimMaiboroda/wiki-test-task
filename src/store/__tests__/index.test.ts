import { store, middlewareConfigurator } from '../index';
import { wikiApi } from '@services/wikiApi';

describe('Redux store', () => {
  it('should be configured correctly', () => {
    expect(store).toBeDefined();
  });

  it('should include the wikiApi reducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty(wikiApi.reducerPath);
  });

  it('should have wikiApi middleware applied', () => {
    const mockGetDefaultMiddleware = () => [];
    const middlewares = middlewareConfigurator(mockGetDefaultMiddleware);
    expect(middlewares).toEqual(expect.arrayContaining([wikiApi.middleware]));
  });
});
