import {createStore} from 'vuex'
const store = createStore({
  state: {
    data: [],
    loading: false,
    error: null,
  },
  getters: {
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchData({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await fetch('http://10.247.254.159:3000/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        commit('setData', data);
      } catch (error) {
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },
});

export default store
