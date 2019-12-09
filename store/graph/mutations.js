import moment from "moment"

export default {
  setLoading(state, value) {
    state.loading = value
  },

  setStartDate(state, date) {
    state.dateMin = date
  },

  setEndDate(state, date) {
    state.dateMax = date
  },

  setDolarHistory(state, values) {
    var dataGraph = []
    var date = ""
    values.response.data.result.fArray.forEach((value, index) => {
      if (index > 2) {
        if (value.fType == "DATE")
          date = moment(value.fNum).format("YYYY-MM-DD")
        if (value.fType == "NUMBER") {
          if (
            date &&
            moment(date).isSameOrAfter(values.from) &&
            moment(date).isSameOrBefore(values.to)
          )
            dataGraph.push({
              date: date,
              value: value.fNum
            })
        }
      }
    })
    state.dolars = dataGraph
  }
}
