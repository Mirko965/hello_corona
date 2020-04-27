import React from 'react'
import classNames from 'classnames'

const InputGroup = (
  name = '',
  value,
  onChange,
  type = 'text',
  error,
  focus,
  blur,
  disabled = false,
  autoComplete = ''
) => {
  return (
    <React.Fragment key={name}>
      <input
        className={classNames('input__group', { input__invalid: error })}
        id={name}
        type={type}
        name={name}
        placeholder={name}
        value={value}
        onChange={onChange}
        onFocus={focus}
        onBlur={blur}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {error && <div className="input__invalid--feedback">{error}</div>}
    </React.Fragment>
  )
};

export default InputGroup
