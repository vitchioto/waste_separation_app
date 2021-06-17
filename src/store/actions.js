export default {
  async addTrash({ dispatch }, { code, content, parts }) {
    try {
      await Promise.all(
        parts.map(async (part) => {
          const wpObject = {
            content,
            materials: part.material,
            status: 'publish',
            subType: part.title,
            title: code,
          };

          const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/trash/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Basic ZWRpdG9yODUxOjVvekwgZFRNRiA3d01PIDBkbFUgcHZ3QSA2ZGtk',
            },
            body: JSON.stringify(wpObject),
          });
          const data = await response.json();
          console.log(data);
        }),
      );
    } catch (error) {
      console.error('Error:', error);
    }
    await dispatch('getTrashDetails', code);
    return 1;
  },
  async addTrashError(_, { code, content }) {
    try {
      const wpObject = {
        content,
        status: 'publish',
        title: code,
      };

      const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/trash-error/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ZWRpdG9yODUxOjVvekwgZFRNRiA3d01PIDBkbFUgcHZ3QSA2ZGtk',
        },
        body: JSON.stringify(wpObject),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
    return 1;
  },
  async getMaterials({ commit }) {
    try {
      const response = await fetch('https://recyklovanie.vladovic.sk/wp-json/wp/v2/material?per_page=100&_embed&filter[orderby]=id&order=asc');
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
      const response = await fetch(`https://recyklovanie.vladovic.sk/wp-json/wp/v2/trash?search=${payload}`);
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
