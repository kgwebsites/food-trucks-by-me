function filterByMenuItem(trucks, menuItem) {
  return trucks.filter(truck => truck.optionaltext.includes(menuItem));
}

function filterTrucks({ trucks, filterType, filter }) {
  const filterMap = {
    menuItem: filterByMenuItem,
  };

  return filterMap[filterType](trucks, filter);
}

export default filterTrucks;
