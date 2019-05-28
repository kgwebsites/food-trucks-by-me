import React, { useState } from 'react';

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const today = new Date();

export const TruckContext = React.createContext();

const TruckContextProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [range, setRange] = useState(0.25);
  const [day, setDay] = useState(week[today.getDay()]);
  const [start24, setStart24] = useState('12:00');
  const [end24, setEnd24] = useState('13:00');
  const [trucks, setTrucks] = useState([]);
  const [geolocation, setGeolocation] = useState({
    lng: 0,
    lat: 0,
  });

  async function getFoodTrucks() {
    setLoaded(false);
    const resp = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        range,
        day,
        start24,
        end24,
      }),
    });
    const data = await resp.json();
    setTrucks(data.trucks);
    setGeolocation({ lng: data.lng, lat: data.lat });
    setLoaded(true);
  }

  return (
    <TruckContext.Provider
      value={{
        loaded,
        address,
        setAddress,
        range,
        setRange,
        day,
        setDay,
        start24,
        setStart24,
        end24,
        setEnd24,
        getFoodTrucks,
        trucks,
        geolocation,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

export default TruckContextProvider;
