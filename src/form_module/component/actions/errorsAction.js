import { createAction } from '@reduxjs/toolkit'

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

export default { errors, clearErrorsForm }
