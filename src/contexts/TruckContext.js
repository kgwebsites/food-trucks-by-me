import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import filterTrucks from '../utils/filterTrucks';

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

const TruckContextProvider = ({ children, history }) => {
  const [error, setError] = useState();

  const [loaded, setLoaded] = useState(false);

  const [mapOrList, setMapOrList] = useState('map');
  function toggleMapOrList() {
    if (mapOrList === 'map') setMapOrList('list');
    else setMapOrList('map');
  }

  const [address, setAddressState] = useState(
    localStorage.getItem('address') || '353 sacramento st',
  );

  const [range, setRange] = useState(0.25);

  const [cookies, setCookie] = useCookies(['day']);
  const [day, setDayState] = useState(
    cookies.day ? cookies.day : week[today.getDay()],
  );
  function setDay(newDay) {
    const end = today;
    end.setHours(23, 59, 59, 999);
    setCookie('day', newDay, { expires: end });
    setDayState(newDay);
  }

  const [start24, setStart24State] = useState(
    localStorage.getItem('start24') ||
      `${new Date().getHours()}:${new Date().getMinutes()}`,
  );

  const [end24, setEnd24State] = useState(
    localStorage.getItem('end24') ||
      `${new Date().getHours() + 1}:${new Date().getMinutes()}`,
  );

  const [trucks, setTrucks] = useState([]);

  const [resultFilters, setResultFiltersState] = useState({});
  function setResultFilters(filters) {
    setResultFiltersState(filters);
    if (filters && Object.keys(filters).length) {
      let newTrucks = trucks;
      Object.entries(filters).forEach(([filterType, filter]) => {
        newTrucks = filterTrucks({
          trucks: newTrucks,
          filterType,
          filter,
        });
      });
      setTrucks(newTrucks);
      history.push('/list');
    }
  }

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

  const getFoodTrucks = useCallback(
    async coor => {
      setLoaded(false);
      try {
        const resp = await fetch(`${window.API_ROOT}/get_food_trucks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            coor,
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
    },
    [address, range, day, start24, end24],
  );

  useEffect(() => {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(async function(position) {
    //     getFoodTrucks(position.coords);
    //     try {
    //       const resp = await fetch(`${window.API_ROOT}/get_address_from_coor`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           lng: position.coords.longitude,
    //           lat: position.coords.latitude,
    //         }),
    //       });
    //       const data = await resp.json();
    //       setAddress(data.address);
    //     } catch (e) {
    //       setError(e);
    //     }
    //   });
    // } else
    getFoodTrucks();
  }, [getFoodTrucks]);

  return (
    <TruckContext.Provider
      value={{
        error,
        loaded,
        mapOrList,
        toggleMapOrList,
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
        resultFilters,
        setResultFilters,
        getFoodTrucks,
        trucks,
        geolocation,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

export default withRouter(TruckContextProvider);
