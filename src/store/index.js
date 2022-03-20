import { createStore } from 'vuex';

const getDefaultState = () => ({
  grid: [[0]],
});

export default createStore({
  state: getDefaultState,
  mutations: {
    increaseColumn(state) {
      state.grid.forEach((row) => row.push(0));
    },
    setGrid(state, grid) {
      state.grid = [...grid];
    },
    decreaseColumn(state) {
      state.grid.forEach((row) => row.splice(row.length - 1, 1));
    },
    increaseRow(state) {
      state.grid.push([]);
      const last = state.grid.length - 1;
      for (let i = 0; i < state.grid[0].length; i += 1) {
        state.grid[last].push(0);
      }
    },
    decreaseRow(state) {
      state.grid.splice(state.grid.length - 1, 1);
    },
    setPoint(state, { c, r }) {
      const va = state.grid[r][c];
      state.grid[r][c] = va ? 0 : 1;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    numberColumns: (state) => state.grid[0].length,
    numberRows: (state) => state.grid.length,
  },
  actions: {
    setColumnRow({ commit, getters }, { c, r }) {
      if (!c || !r) return;

      if (c > getters.numberColumns) {
        const d = c - getters.numberColumns;
        for (let i = 0; i < d; i += 1) commit('increaseColumn');
      } else {
        const d = getters.numberColumns - c;
        for (let i = 0; i < d; i += 1) commit('decreaseColumn');
      }

      if (r > getters.numberRows) {
        const d = r - getters.numberRows;
        for (let i = 0; i < d; i += 1) commit('increaseRow');
      } else {
        const d = getters.numberRows - c;
        for (let i = 0; i < d; i += 1) commit('decreaseRow');
      }
    },
  },
  modules: {
  },
});
