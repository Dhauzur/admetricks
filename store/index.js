import { getApiInstance } from '../utils/api';

const state = () => ({
  dolars: null
})

const getters = {
  dolars: state => state.dolars
}

 const mutations = {
   setDolarHistory (state, values) {
     state.dolars = values;
   },
}

 const actions = {
   async fetchDolar ({ commit }, value) {
     const AxiosInstance = getApiInstance();
     // commit('setLoading');
     try {
       var params = {
         // auth_key: 'f0bcdfab2b575495aa018643b787a120a5aa0f7c',
         auth_key: '7eae9eeb26143831ab55414f6494f694b6e5d795',
         from: value.from,
         to: value.to,
       }
       new Promise((resolve, reject) => AxiosInstance.get('/api/v2/datastreams/VALOR-DOLAR-OBSER/data.json/',{ params })
       .then(response => {
         commit('setDolarHistory', response.data.dolares)
         resolve(true)
       })
       .catch(error => reject(false)))
     } catch(error) {
       // commit('setError', error);
       console.error("Error al intentar hacer la descarga");
     }
   },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
