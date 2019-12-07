import moment from "moment"

export default {
  setStartDate (state, date) {
    console.log("date");
    console.log(date);
    state.dateMin = date;
  },
  setEndDate (state, date) {
    console.log("datex");
    console.log(date);
    state.dateMax = date;
  },

  setDolarHistory (state, values) {
    var dataGraph = []
    var date = ''
    values.response.data.result.fArray.forEach((value, index) => {
      if(index > 2) {
        if(value.fType == 'DATE') date = moment(value.fNum).format('YYYY-MM-DD') 
        if(value.fType == 'NUMBER') {
          if(date && moment(date).isSameOrAfter(values.from) && moment(date).isSameOrBefore(values.to))
            dataGraph.push({
            date: date,
            value: value.fNum
          })
        }
      }
    })
    console.log("mutatio");
    state.dolars = dataGraph;
  },
}
