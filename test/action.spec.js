import actions from '../store/graph/actions'
import moment from "moment"


test('TEST DATES: Descarga de datos de API correctamente', async () => {
  const state = {
    dateMin: '2018-01-01',
    dateMax: '2019-01-01'
  }
  const commit = jest.fn()
  const data = await actions.fetchDolar({ commit }, state);
  expect(data).toBe(true);
}, 30000);
