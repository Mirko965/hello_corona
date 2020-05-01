import React from 'react'
import classNames from 'classnames'

const RadioButton = (name, value, onChange, isChecked, error) => {
  return (
    <React.Fragment key={value}>
      <label htmlFor={name}>
        <input
          className={classNames('checkbox__group', { input__invalid: error })}
          id={`${name}_${value}`}
          type='radio'
          name={name}
          value={value}
          onChange={onChange}
          checked={isChecked}
        />
        {value}
      </label>
      {error && <div className="input__invalid--feedback">{error}</div>}
    </React.Fragment>
  )
};

export default RadioButton
