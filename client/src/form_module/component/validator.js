import Validator from 'validator'

const validator = (name, values, error, validation) => {
  return (validation && error && values) && validation.map(valid => {
    const validKey = Object.keys(valid)[0];
    const validValues = Object.values(valid)[0];
    if ((valid === 'require' && values[name] === '' && typeof (values[name] === 'string')) || values[name].length === 0) {
      return { ...error, [name]: `${name} field is required` }
    }
    if (valid === 'isEmail') {
      if (!Validator.isEmail(values[name])) {
        return { ...error, [name]: 'Email is invalid' }
      }
    }
    if (validKey === 'length') {
      const { min, max } = validValues;
      if (!Validator.isLength(values[name], { min, max })) {
        return { ...error, [name]: `${name} must be between ${min} and ${max} characters` }
      }
    }
    if (validKey === 'equals') {
      const [first, second] = validValues;
      const firstValue = values[first];
      const secondValues = values[second];
      if (!Validator.equals(firstValue, secondValues)) {
        return { ...error, [name]: `${name} must match` }
      }
    }
    return error
  })
};

export default validator
