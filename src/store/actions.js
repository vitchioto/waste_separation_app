export default {
  async loadPins({ commit }) {
    try {
      const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/bin/');
      const data = await response.json();
      console.log(data);
      commit('ADD_BINS', data);
    } catch (error) {
      console.error('PTT Error:', error);
    }
  },
};
