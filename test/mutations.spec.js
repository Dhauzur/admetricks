
import mutations from '../store/graph/mutations'

test('TEST 1 DATE: Configurar fecha. ', () => {
  const state = {
    dateMin: '2019-01-01'
  }
  mutations.setStartDate(state, {
    dateMin: '2020-01-01'
  })
  expect(state.dateMin).toStrictEqual({"dateMin": "2020-01-01"})
})

test('TEST 2 DOLARS: No debe añadir nada. ', () => {
  const state = {
    dolars: null
  }
  const values = {
    response: {
      data: {
        result: {
          fArray: ['item1', 'item2']
        }
      }
    }
  }
  mutations.setDolarHistory(state, values)
  expect(state.dolars).toStrictEqual([])
})

test('TEST 3 DOLARS: Items falsos no deben ingresarse. ', () => {
  const state = {
    dolars: null
  }
  const values = {
    response: {
      data: {
        result: {
          fArray: ['item1', 'item2', 'item3', 'itemNOVALIDO']
        }
      }
    }
  }
  mutations.setDolarHistory(state, values)
  expect(state.dolars).toStrictEqual([])
})

test('TEST 4 DOLARS: Se filtra primer dato valido. ', () => {
  const state = {
    dolars: null
  }
  const values = {
    response: {
      data: {
        result: {
          fArray: ['item1', 'item2', {
            fType: 'DATE',
            fNum: '2020-01-01'
          }]
        }
      }
    }
  }
  mutations.setDolarHistory(state, values)
  expect(state.dolars).toStrictEqual([])
})

test('TEST 5 DOLARS: Primer registro valido. ', () => {
  const state = {
    dolars: null
  }
  const values = {
    response: {
      data: {
        result: {
          fArray: [
            'item1',
            'item2',
            'item3',
            {
              fType: 'DATE',
              fNum: '2016-01-01'
            },{
              fType: 'NUMBER',
              fNum: '1234'
            }
          ]
        }
      }
    },
    from: '2015-01-01',
    to: '2019-01-01'
  }
  mutations.setDolarHistory(state, values)
  expect(state.dolars).toStrictEqual([{"date": "2016-01-01", "value": "1234"}])
})
