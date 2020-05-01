import React from 'react'
import classNames from 'classnames'

const TextFieldGroup = (
  name,
  value,
  onChange,
  error,
  info,
  placeholder,
  label,
  disabled,
  type = 'text'
) => {
  return (
    <React.Fragment key={name}>
      {error && <div className="input__invalid--feedback">{error}</div>}
      <input
        type={type}
        className={classNames('input', { input__invalid: error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form__info">{info}</small>}

    </React.Fragment>
  )
}

export default TextFieldGroup
