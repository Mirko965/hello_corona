import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import InputGroup from '../input/InputGroup';
import SelectListGroup from '../input/SelectListGroup';
import TextAreaFieldGroup from '../input/TextAreaFieldGroup';
import RadioButton from '../input/RadioButton';
import Datalist from '../input/Datalist';
import validator from './validator';
import isEmpty from './isEmpty';
import errors from './actions/errorsAction';
import CheckBoxGroup from '../input/CheckBoxGroup';

export const input = (...inputs) => {
  const _input = Object.assign(...inputs);

  const _type = Object.entries(_input).map(([key, value]) => {
    return { [key]: value.type }
  });
  const type = Object.assign(..._type);

  const _label = Object.entries(_input).map(([key, value]) => {
    return { [key]: value.label }
  });
  const label = Object.assign(..._label);

  const name = Object.entries(type).map(([key]) => key);

  const _initialInput = name.map((name) => ({ [name]: '' }));
  const initialInput = Object.assign(..._initialInput);

  const _initialError = name.map((name) => ({ [name]: '' }));
  const initialError = Object.assign(..._initialError);

  const _initialCheckBox = Object.entries(_input).filter(
    ([_, value]) => value.type === 'checkbox'
  );
  const initialCheckBox = _initialCheckBox.map(([key, value]) => {
    const _values = value.values.map((values) => {
      const _key = { name: values };
      const isChecked = { isChecked: false };
      const _className = { _className: key };
      return Object.assign(_key, isChecked, _className)
    });
    const _value = Object.assign(_values);
    return { [key]: _value }
  });

  const _initialRadio = Object.entries(_input).filter(
    ([_, value]) => value.type === 'radio'
  );
  const initialRadio = _initialRadio.map(([key, value]) => {
    const _values = value.values.map((values) => {
      const key = { name: values };
      const isChecked = { isChecked: false };
      return Object.assign(key, isChecked)
    });
    const _value = Object.assign(_values);
    return { [key]: _value }
  });

  const _validation = Object.entries(_input).map(([key, value]) => {
    return { [key]: value.validation }
  });
  const validation = Object.assign(..._validation);

  const _options = Object.entries(_input).map(([key, value]) => ({
    [key]: value.options,
  }));
  const options = Object.assign(..._options);

  const _values = Object.entries(_input).map(([key, value]) => ({
    [key]: value.values,
  }));
  const values = Object.assign(..._values);

  return {
    name,
    initialInput,
    initialError,
    type,
    label,
    validation,
    options,
    values,
    initialCheckBox,
    initialRadio,
  }
};

export const useForm = ({ input = [] } = {}, callback = () => {}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.errors);
  const _name = input.map((key) => key.name);
  const name = [].concat(..._name);
  const _initialInput = input.map((key) => {
    if (Object.entries(key.initialInput).length > 1) {
      return Object.entries(key.initialInput).map(([key, value]) => {
        return { [key]: value }
      })
    }
    return [key.initialInput]
  });
  const initialInput = Object.assign(..._initialInput.flat(1));

  const _initialError = input.map((key) => key.initialError);
  const initialError = Object.assign(..._initialError);

  const _type = input.map((key) => key.type);
  const type = Object.assign(..._type);

  const _validation = input.map((key) => key.validation);
  const validation = Object.assign(..._validation);

  const _options = input.map((key) => key.options);
  const options = Object.assign(..._options);

  const _valuesInput = input.map((key) => key.values);
  const valuesInput = Object.assign(..._valuesInput);

  const _initialCheckBox = input
    .map((key) => key.initialCheckBox)
    .reduce((prev, curr) => {
      return prev.concat(curr)
    });
  const initialCheckBox = Object.assign({}, ..._initialCheckBox);
  const checkboxName = Object.keys(initialCheckBox);

  const _initialRadio = input
    .map((key) => key.initialRadio)
    .reduce((prev, curr) => {
      return prev.concat(curr)
    });
  const initialRadio = Object.assign({}, ..._initialRadio);

  const [values, setValues] = useState(initialInput);
  const [check, setCheck] = useState(initialCheckBox);
  const [radioIsChecked, setRadioChecked] = useState(initialRadio);
  const [error, setError] = useState(initialError);
  const [eventTarget, setEventTarget] = useState(initialInput);
  
  const focus = () => {
    return name.map(name => {
      if (document.activeElement.id === name) {
        if (error) {
          setError({ ...error, [name]: '' })
        }
      }
    })
  };

  const inputGroup = (input) => {
    return input.name.map((name) => {
      /* const focus = () => {
        if (document.activeElement.id === name) {
          if (error) {
            setError({ ...error, [name]: '' })
          }
        }
      };
      const blur = () => {
        if (document.activeElement.id !== name) {
          const getError = validator(name, values, error, validation[name]);
          if (getError) setError(Object.assign({}, error, ...getError))
        }
      }; */
      return InputGroup(
        name,
        values[name],
        handleChange,
        type[name],
        state[name] ? state[name] : error[name],
        focus,
        /* blur */
      )
    })
  };

  const selectListGroup = (input) => {
    return input.name.map((name) => {
      const focus = () => {
        if (document.activeElement.id === name) {
          if (error) {
            setError({ ...error, [name]: '' })
          }
        }
      };
      const blur = () => {
        if (document.activeElement.id !== name) {
          const getError = validator(name, values, error, validation[name]);
          if (getError) setError(Object.assign({}, error, ...getError))
        }
      };

      return SelectListGroup(
        name,
        values[name],
        name,
        options[name],
        '',
        handleChange,
        false,
        error[name],
        focus,
        blur
      )
    })
  };

  const datalist = (input) => {
    return input.name.map((name) => {
      const focus = () => {
        if (document.activeElement.id === name) {
          if (error) {
            setError({ ...error, [name]: '' })
          }
        }
      };
      const blur = () => {
        if (document.activeElement.id !== name) {
          const getError = validator(name, values, error, validation[name]);
          if (getError) setError(Object.assign({}, error, ...getError))
        }
      };
      return Datalist(
        name,
        input.options[name],
        values[name],
        handleChange,
        input.label[name],
        error[name],
        focus,
        blur
      )
    })
  };

  const textAreaFieldGroup = (input) => {
    return input.name.map((name) => {
      return TextAreaFieldGroup(name, values[name], handleChange, error[name])
    })
  };

  const checkBoxGroup = (input) => {
    return input.name.map(name => {
      return valuesInput[name].map(value => {
        const focus = () => {
          if (document.activeElement.id.split('_')[0] === name) {
            if (error) {
              setError({ ...error, [name]: '' })
            }
          }
        };
        /* const blur = () => {
          if (document.activeElement.id.split('_')[0] !== name) {
            const getError = validator(name, values, error, validation[name])
            setError(Object.assign(error, ...getError))
          }
        }; */
        return Object.values(check[name]).map(_check => {
          if (_check.name === value) {
            return (
              CheckBoxGroup(name, value, handleChange, _check.isChecked, error[name], focus, '', classNames(_check._className))
            )
          }
        })
      });
    })
  };

  const radioButton = (input) => {
    return input.name.map(name => {
      return valuesInput[name].map(value => {
        const focus = () => {
          if (document.activeElement.id.split('_')[0] === name) {
            if (error) {
              setError({ ...error, [name]: '' })
            }
          }
        };
        /* const blur = () => {
          if (document.activeElement.id.split('_')[0] !== name) {
            const getError = validator(name, values, error, validation[name])
            setError(Object.assign(error, ...getError))
          }
        }; */
        return Object.values(radioIsChecked[name]).map(_check => {
          if (_check.name === value) {
            return (
              RadioButton(name, value, handleChange, _check.isChecked, error[name], focus, '', classNames(_check._className))
            )
          }
        })
      });
    })
  };

  const handleChange = (event) => {
    let checkboxValue = {};
    let checkboxValues = [];
    let radioValue = {};

    const { name, value, checked, id, type } = event.target;
    setEventTarget({ name, value, checked, id, type });

    if (type === 'checkbox') {
      check[name].map((input) => {
        if (`${name}_${input.name}` === id) {
          input.isChecked = checked
        }
        if (input.isChecked === true) {
          checkboxValues.push(input.name)
        }
        return input
      });
      checkboxValue = { [name]: checkboxValues }
    }
    if (type === 'radio') {
      radioIsChecked[name].map((input) => {
        if (`${name}_${input.name}` === id) {
          input.isChecked = checked
        } else {
          input.isChecked = !checked
        }
      });
      radioValue = { [name]: value };
    }
    setValues({
      ...values,
      [name]: value,
      ...checkboxValue,
      ...radioValue,
    })
  };

  const _clearErrors = Object.entries(error).map(([key]) => {
    return { [key]: '' }
  });
  const clearErrors = Object.assign({}, ..._clearErrors);

  const getErrors = Object.keys(error)
    .map((names) => {
      return validator(names, values, clearErrors, validation[names])
    })
    .reduce((prev, curr) => {
      return prev.concat(curr)
    }, [])
    .map((prev) => {
      return (
        prev &&
        Object.entries(prev)
          .map(([key, value]) => {
            if (value !== '') {
              return { [key]: value }
            }
          })
          .filter((item) => item)
      )
    })
    .reduce((prev, curr) => {
      return prev.concat(curr)
    }, []);
  const setErrors = Object.assign({}, ...getErrors);

  useEffect(() => {
    dispatch(errors.errors(error))
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ ...error, ...setErrors })
    if (isEmpty(setErrors)) {
      callback(values);
      setValues(initialInput);
      setCheck(initialCheckBox);
      setRadioChecked(initialRadio);
      setEventTarget({})
    }
  };
  const disableSubmitButton = () => !(isEmpty(error) && !isEmpty(values));
  return {
    error,
    values,
    handleChange,
    handleSubmit,
    inputGroup,
    selectListGroup,
    textAreaFieldGroup,
    checkBoxGroup,
    radioButton,
    datalist,
    disableSubmitButton,
  }
};
