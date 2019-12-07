import Axios from "axios"

export default {
  async fetchDolar({ commit }, value) {
    try {
      var params = { auth_key: "7eae9eeb26143831ab55414f6494f694b6e5d795" }
      return new Promise((resolve, reject) => {
        Axios.get(
          "http://cne.cloudapi.junar.com/api/v2/datastreams/VALOR-DOLAR-OBSER/data.json/",
          { params }
        )
          .then(response => {
            commit("setDolarHistory", {
              response,
              from: value.from,
              to: value.to
            })
            resolve(true)
          })
          .catch(error => {
            reject("Error al intentar hacer la descarga: " + error)
          })
      })
    } catch (error) {
      console.error("Error al intentar hacer la descarga")
    }
  }
}
