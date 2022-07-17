import { Truck } from '../contexts/TruckContext';

function filterByMenuItem(trucks: Truck[], menuItem: string) {
  return trucks.filter((truck) => truck.optionaltext.includes(menuItem));
}

function filterTrucks({
  trucks,
  filterType,
  filter,
}: {
  trucks: Truck[];
  filterType: string;
  filter: string | number;
}) {
  const filterMap: { [key: string]: any } = {
    menuItem: filterByMenuItem,
  };

  return filterMap[filterType](trucks, filter);
}

export default filterTrucks;
