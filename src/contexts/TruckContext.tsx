import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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

type WeekDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

const today = new Date();

enum MapOrList {
  map = 'map',
  list = 'list',
}

type ResultFilters = { [key: string]: number | string };

type Coordinates = { longitude: number; latitude: number };

interface Truck {
  optionaltext: string;
  latitude: string;
  longitude: string;
}

interface TruckContextType {
  error?: string;
  loaded?: boolean;
  mapOrList?: MapOrList;
  toggleMapOrList?: () => void;
  address?: string;
  setAddress?: (address: string) => void;
  range?: number;
  setRange?: (range: number) => void;
  day?: WeekDay;
  setDay?: (day: WeekDay) => void;
  start24?: string;
  setStart24?: (start24: string) => void;
  end24?: string;
  setEnd24?: (end24: string) => void;
  resultFilters?: ResultFilters;
  setResultFilters?: (resultFilter: ResultFilters) => void;
  getFoodTrucks?: (coor?: Coordinates) => Promise<void>;
  trucks?: Truck[];
  geolocation?: Coordinates;
}

export const TruckContext = React.createContext<TruckContextType>({});

const TruckContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string>();

  const [loaded, setLoaded] = useState(false);

  let location = useLocation();
  const [mapOrList, setMapOrList] = useState(
    location.pathname === '/' ? MapOrList.map : MapOrList.list,
  );
  function toggleMapOrList() {
    if (mapOrList === MapOrList.map) setMapOrList(MapOrList.list);
    else setMapOrList(MapOrList.map);
  }

  const [address, setAddressState] = useState(
    localStorage.getItem('address') || '353 sacramento st',
  );

  const [range, setRange] = useState(0.25);

  const [cookies, setCookie] = useCookies(['day']);
  const [day, setDayState] = useState(
    cookies.day ? (cookies.day as WeekDay) : week[today.getDay()],
  );
  function setDay(newDay: WeekDay) {
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
  const [trucksRaw, setTrucksRaw] = useState([]);

  const [resultFilters, setResultFiltersState] = useState({});
  function setResultFilters(resultFilter: ResultFilters) {
    setResultFiltersState(resultFilter);
    let newTrucks = trucksRaw;
    Object.entries(resultFilter).forEach(([filterType, filter]) => {
      newTrucks = filterTrucks({
        trucks: newTrucks,
        filterType,
        filter,
      });
    });
    setTrucks(newTrucks);
  }

  const [geolocation, setGeolocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  function setAddress(address: string) {
    localStorage.setItem('address', address);
    setAddressState(address);
  }

  function setStart24(start24: string) {
    localStorage.setItem('start24', start24);
    setStart24State(start24);
  }

  function setEnd24(end24: string) {
    localStorage.setItem('end24', end24);
    setEnd24State(end24);
  }

  const getFoodTrucks = useCallback(
    async (coor?: Coordinates) => {
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
        setTrucksRaw(data.trucks);
        setGeolocation({ longitude: data.lng, latitude: data.lat });
        setLoaded(true);
      } catch (e) {
        setError(e as string);
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
        day: day as WeekDay,
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

export default TruckContextProvider;
