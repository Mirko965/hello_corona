import React from 'react'
import classNames from 'classnames'

const SelectListGroup = (
  name,
  value,
  placeholder,
  options = [],
  info,
  onChange,
  disabled = true,
  error,
  focus,
  blur,
) => {
  const selectOption = options.map((option, index) => {
    if (index === 0) {
      return (
        <option className='form__input--option-first' key={index} value=''>{option}</option>
      )
    }
    return (
      <option className='form__input--option' key={index} value={option}>{option}</option>
    )
  });

  return (
    <React.Fragment key={name}>
      <select
        className={classNames('input__select', { input__invalid: error })}
        id={`${name}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={focus}
        onBlur={blur}
      >
        {selectOption}
      </select>
      {error && <div className="input__invalid--feedback">{error}</div>}
      {info && <small className="form__info">{info}</small>}
    </React.Fragment>
  )
};

export default SelectListGroup
