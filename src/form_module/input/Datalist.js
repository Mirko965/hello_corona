import React from 'react'
import classNames from 'classnames'

const Datalist = (
  name,
  options = [],
  value,
  onChange,
  label,
  error,
  focus,
  blur,
  info
) => {
  const selectData = options.map((option, index) => {
    return (
      <option className='form__input--option' key={index} value={option} />
    )
  });

  return (
    <div className='datalist' key={name}>
      <label htmlFor={name}>{label}</label>
      <input
        list={`_${name}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={focus}
        onBlur={blur}
      />
      <datalist
        id={`_${name}`}
        className={classNames('input__select', { input__invalid: error })}
        onChange={onChange}
      >
        {selectData}
      </datalist>
      {error && <div className="input__invalid--feedback">{error}</div>}
      {info && <small className="form__info">{info}</small>}
    </div>
  )
};

export default Datalist
