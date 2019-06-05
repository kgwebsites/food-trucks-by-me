import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { TruckContext } from '../../contexts/TruckContext';

function Address({ className }) {
  const { address, setAddress } = useContext(TruckContext);
  return (
    <div className={className}>
      <Input
        type="text"
        value={address}
        placeholder="353 Sacramento St"
        onChange={e => setAddress(e.target.value)}
        required
      />
    </div>
  );
}

Address.propTypes = {
  className: PropTypes.string,
};

Address.defaultProps = {
  className: '',
};

export default React.memo(Address);
