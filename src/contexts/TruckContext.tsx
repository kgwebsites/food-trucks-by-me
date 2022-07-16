import React, { useState, useEffect, useCallback, useRef } from 'react';
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

type ResultFilters = { [key: string]: number | string };

type Coordinates = { longitude: number; latitude: number };

export interface Truck {
  optionaltext: string;
  latitude: string;
  longitude: string;
  location: string;
}

interface TruckContextType {
  error?: string;
  loaded?: boolean;
  address?: string;
  setAddress?: (address: string) => void;
  searchAddress?: string;
  setSearchAddress?: (searchAddress: string) => void;
  range?: number;
  setRange?: (range: number) => void;
  day?: WeekDay;
  setDay?: (day: WeekDay) => void;
  openNow?: boolean;
  setOpenNow?: (openNow: boolean) => void;
  resultFilters?: ResultFilters;
  setResultFilters?: (resultFilter: ResultFilters) => void;
  getFoodTrucks?: (coor?: Coordinates) => Promise<void>;
  trucks?: Truck[];
  geolocation?: Coordinates;
}

export const TruckContext = React.createContext<TruckContextType>({});

const TruckContextProvider = ({ children }: { children: React.ReactNode }) => {
  let preventDuplicateFetch = useRef(false);
  let initialLoad = useRef(localStorage.getItem('initialLoad') || 'true');
  const setInitialLoad = () => {
    localStorage.setItem('initialLoad', 'false');
    initialLoad.current = 'false';
  };

  const [error, setError] = useState<string>();

  const [loaded, setLoaded] = useState(false);

  const [address, setAddressState] = useState(
    localStorage.getItem('address') || '',
  );
  const [searchAddress, setSearchAddress] = useState(address);

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

  const [openNow, setOpenNowState] = useState(
    localStorage.getItem('openNow') === 'false' ? false : true,
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

  function setOpenNow(openNow: boolean) {
    localStorage.setItem('openNow', `${openNow}`);
    setOpenNowState(openNow);
  }

  const getFoodTrucks = useCallback(
    async (coor?: Coordinates) => {
      if (preventDuplicateFetch.current === true) {
        preventDuplicateFetch.current = false;
        return;
      }
      setLoaded(false);
      const dataPromises = [];
      dataPromises.push(
        new Promise(async (res) => {
          const resp = await fetch(`${window.API_ROOT}/get_food_trucks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address,
              coor: coor
                ? { latitude: coor?.latitude, longitude: coor?.longitude }
                : undefined,
              range,
              day,
              openNow,
              currentHour: new Date().toLocaleTimeString([], {
                hour: 'numeric',
                hour12: false,
              }),
            }),
          });
          const data = await resp.json();
          res(data);
        }),
      );

      if (coor) {
        dataPromises.push(
          new Promise(async (res) => {
            const resp = await fetch(
              `${window.API_ROOT}/get_address_from_coor`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  lng: coor.longitude,
                  lat: coor.latitude,
                }),
              },
            );
            const data = await resp.json();
            res(data);
          }),
        );
      }
      try {
        const allData: any = await Promise.all(dataPromises);
        const [data, addressData = undefined] = allData;

        if (addressData?.address) {
          preventDuplicateFetch.current = true;
          setSearchAddress(addressData.address);
          setAddress(addressData.address);
        }
        setTrucks(data.trucks);
        setTrucksRaw(data.trucks);
        setGeolocation({ longitude: data.lng, latitude: data.lat });
        setLoaded(true);
      } catch (e) {
        setError(e as string);
      }
    },
    [address, range, day, openNow],
  );

  useEffect(() => {
    if ('geolocation' in navigator && initialLoad.current === 'true') {
      navigator.geolocation.getCurrentPosition(async function (position) {
        getFoodTrucks(position.coords);
      });
    } else getFoodTrucks();
    setInitialLoad();
  }, [getFoodTrucks]);

  return (
    <TruckContext.Provider
      value={{
        error,
        loaded,
        address,
        setAddress,
        searchAddress,
        setSearchAddress,
        range,
        setRange,
        day: day as WeekDay,
        setDay,
        openNow,
        setOpenNow,
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
