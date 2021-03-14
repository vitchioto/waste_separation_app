export default {
  ADD_BINS(state, payload) {
    state.bins = payload;
  },
  ADD_MATERIALS(state, payload) {
    state.materials = payload;
  },
  ADD_TRASH_DETAILS(state, payload) {
    state.trashDetails = payload;
  },
};
