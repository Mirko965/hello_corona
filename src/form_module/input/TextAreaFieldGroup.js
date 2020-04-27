import React from 'react'
import classNames from 'classnames'

const TextAreaFieldGroup = (
  name,
  value,
  onChange,
  error,
  cols,
  rows,
  info,
  placeholder,
  disabled,
  label,
) => {
  return (
    <React.Fragment key={name}>
      <textarea
        className={classNames('input-placeholder', { input__invalid: error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        cols={cols}
        rows={rows}
        disabled={disabled}
      />
      {error && <div className="input__invalid--feedback">{error}</div>}
      {info && <small className="form__info">{info}</small>}
    </React.Fragment>
  )
}

export default TextAreaFieldGroup
