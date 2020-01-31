import React from 'react';

const TextArea = ({
  input,
  name,
  label,
  placeholder,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <div className="field">
        <textarea
          {...input}
          name={name}
          rows="5"
          className="form-control"
          placeholder={placeholder}
        />

        {touched &&
          ((error && <p className="text-danger">{error}</p>) ||
            (warning && <p className="text-danger">{warning}</p>))}
      </div>
    </div>
  );
};

export default TextArea;
