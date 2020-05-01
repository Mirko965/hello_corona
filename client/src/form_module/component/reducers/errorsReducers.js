import { createReducer, } from '@reduxjs/toolkit'
import errors from '../actions/errorsAction';

const initialState = {}

const errorsReducer = createReducer(initialState, {
  [errors.errors]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [errors.clearErrorsForm]: (state, action) => {
    return { ...state, ...action.payload }
  }
})

export default errorsReducer
