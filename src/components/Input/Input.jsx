import React from 'react';

const Input = ({ label, ...rest }) => (
  <label>
    <span>{label}</span>
    <input {...rest} />
  </label>
);

export default Input;
