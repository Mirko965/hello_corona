import { configureStore, createReducer, createAction } from '@reduxjs/toolkit'

const initialState = {}
const errors = createAction('FORM_ERRORS', (error) => {
  return {
    payload: error
  }
})
const clearErrorsForm = createAction('CLEAR_FORM_ERRORS', (error) => {
  const _errors = Object.entries(error).map(([key]) => {
    return { [key]: '' }
  })
  const errors = Object.assign({}, ..._errors)
  return {
    payload: errors
  }
})
const errorsReducer = createReducer(initialState, {
  [errors]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [clearErrorsForm]: (state, action) => {
    return { ...state, ...action.payload }
  }
})
const store = configureStore({
  reducer: errorsReducer
})

export default store
