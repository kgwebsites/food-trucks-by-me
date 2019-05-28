import React from 'react';

const Input = ({ label, ...rest }) => (
  <label>
    {label}
    <input {...rest} />
  </label>
);

export default Input;
