export default {
  async addTrash(_, { code }) {
    try {
      const wpObject = {
        slug: code,
        status: 'published',
        title: code,
      };

      const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/trash/', {
        method: 'POST',
        body: JSON.stringify(wpObject),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    return 1;
  },
  async getMaterials({ commit }) {
    try {
      const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/material?per_page=100');
      const data = await response.json();
      console.log(data);
      commit('ADD_MATERIALS', data);
    } catch (error) {
      console.error('Error:', error);
    }
    return 1;
  },
  async getTrashDetails({ commit }, payload) {
    try {
      const response = await fetch(`https://recyklovanie.vladovic.sk/wp-json/wp/v2/trash?slug=${payload}`);
      const data = await response.json();
      console.log(data);
      commit('ADD_TRASH_DETAILS', data);
    } catch (error) {
      console.error('Error:', error);
    }
    return 1;
  },
  async loadPins({ commit }) {
    try {
      const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/bin/');
      const data = await response.json();
      console.log(data);
      commit('ADD_BINS', data);
    } catch (error) {
      console.error('Error:', error);
    }
  },
};
