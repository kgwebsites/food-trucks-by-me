import React, { useState, useEffect } from 'react';

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
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState(false);
  const [mapList, setMapList] = useState('map');
  function toggleMapList() {
    if (mapList === 'map') setMapList('list');
    else setMapList('map');
  }
  const [address, setAddressState] = useState(
    localStorage.getItem('address') || '353 sacramento st',
  );
  const [range, setRange] = useState(0.25);
  const [day, setDay] = useState(week[today.getDay()]);
  const [start24, setStart24State] = useState(
    localStorage.getItem('start24') ||
      `${new Date().getHours()}:${new Date().getMinutes()}`,
  );
  const [end24, setEnd24State] = useState(
    localStorage.getItem('end24') ||
      `${new Date().getHours() + 1}:${new Date().getMinutes()}`,
  );
  const [trucks, setTrucks] = useState([]);
  const [geolocation, setGeolocation] = useState({
    lng: 0,
    lat: 0,
  });

  function setAddress(address) {
    localStorage.setItem('address', address);
    setAddressState(address);
  }

  function setStart24(start24) {
    localStorage.setItem('start24', start24);
    setStart24State(start24);
  }

  function setEnd24(end24) {
    localStorage.setItem('end24', end24);
    setEnd24State(end24);
  }

  async function getFoodTrucks() {
    setLoaded(false);
    try {
      const resp = await fetch(`/.netlify/functions/get_food_trucks`, {
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
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        try {
          const resp = await fetch(
            `/.netlify/functions/get_address_from_coor`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lng: position.coords.longitude,
                lat: position.coords.latitude,
              }),
            },
          );
          const data = await resp.json();
          setAddress(data.address);
        } catch (e) {
          setError(e);
        }
      });
    }
    getFoodTrucks();
  }, []);

  return (
    <TruckContext.Provider
      value={{
        error,
        loaded,
        mapList,
        toggleMapList,
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
