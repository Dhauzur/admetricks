import { getApiInstance } from '../../utils/api';
import Axios from 'axios'
import moment from "moment"

export default {
   async fetchDolar ({ commit }, value) {
     const AxiosInstance = getApiInstance();
     // commit('setLoading');
     try {
       var params = {
         // auth_key: 'f0bcdfab2b575495aa018643b787a120a5aa0f7c',
         auth_key: '7eae9eeb26143831ab55414f6494f694b6e5d795'
       }
       console.log(params);
       return new Promise((resolve, reject) => {
        Axios.get('http://cne.cloudapi.junar.com/api/v2/datastreams/VALOR-DOLAR-OBSER/data.json/', {params})
        .then(response => {
          commit('setDolarHistory', { response, from: value.from, to: value.to })
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
