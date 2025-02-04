import { createStore } from 'vuex';
import storeConfig from '@/store'; // Adjust the path to your store.js

describe('Vuex Store', () => {
  let store;

  beforeEach(() => {
    // Create a new store instance for each test
    store = createStore(storeConfig);
  });

  describe('State', () => {
    it('initializes with default values', () => {
      expect(store.state.data).toEqual([]);
      expect(store.state.loading).toBe(false);
      expect(store.state.error).toBe(null);
    });
  });

  describe('Getters', () => {
    it('getData returns the data state', () => {
      store.state.data = [{ id: 1, name: 'Test Data' }];
      expect(store.getters.getData).toEqual([{ id: 1, name: 'Test Data' }]);
    });

    it('isLoading returns the loading state', () => {
      store.state.loading = true;
      expect(store.getters.isLoading).toBe(true);
    });

    it('getError returns the error state', () => {
      store.state.error = 'Test Error';
      expect(store.getters.getError).toBe('Test Error');
    });
  });

  describe('Mutations', () => {
    it('setData updates the data state', () => {
      store.commit('setData', [{ id: 1, name: 'Test Data' }]);
      expect(store.state.data).toEqual([{ id: 1, name: 'Test Data' }]);
    });

    it('setLoading updates the loading state', () => {
      store.commit('setLoading', true);
      expect(store.state.loading).toBe(true);
    });

    it('setError updates the error state', () => {
      store.commit('setError', 'Test Error');
      expect(store.state.error).toBe('Test Error');
    });
  });

  describe('Actions', () => {
    it('fetchData commits setData and setLoading on success', async () => {
      // Mock the fetch API
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ id: 1, name: 'Test Data' }]),
        })
      );

      await store.dispatch('fetchData');

      expect(store.state.data).toEqual([{ id: 1, name: 'Test Data' }]);
      expect(store.state.loading).toBe(false);
      expect(store.state.error).toBe(null);
    });

    it('fetchData commits setError and setLoading on failure', async () => {
      // Mock the fetch API to simulate an error
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Failed to fetch data'))
      );

      await store.dispatch('fetchData');

      expect(store.state.error).toBe('Failed to fetch data');
      expect(store.state.loading).toBe(false);
    });
  });
});
