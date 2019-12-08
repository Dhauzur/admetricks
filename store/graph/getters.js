export default {
  dolars: state => state.dolars,
  dateMin: state => state.dateMin,
  dateMax: state => state.dateMax,
  loading: state => state.loading,
  variation: state => {
    if(state.dolars) {
      if(state.dolars.length > 0) {
        var variation = ((state.dolars[state.dolars.length-1].value - state.dolars[0].value)/state.dolars[0].value).toFixed(2)
        return '' + variation
      }
    }
    return 'Sin datos'
  }
}
