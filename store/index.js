import { getApiInstance } from '../utils/api';
import Axios from 'axios'
import moment from "moment"

const state = () => ({
  dolars: null
})

const getters = {
  dolars: state => state.dolars
}

 const mutations = {
   setDolarHistory (state, values) {
     var dataGraph = []
     var date = ''
     values.data.result.fArray.forEach((value, index) => {
       if(index > 2) {
         if(value.fType == 'DATE') date = value.fNum
         if(value.fType == 'NUMBER') {
           if(date) dataGraph.push({
             date: moment(date).format('DD-MM-YYYY'),
             value: value.fNum
           })
         }
       }
     })
     console.log("mutatio");
     state.dolars = dataGraph;
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
       return new Promise((resolve, reject) => {
        Axios.get('http://cne.cloudapi.junar.com/api/v2/datastreams/VALOR-DOLAR-OBSER/data.json/', {params})
        .then(response => {
          commit('setDolarHistory', response)
          resolve(true);
        })
        .catch((error) => {
          reject("Error al intentar hacer la descarga: " + error )
        });
      });

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
