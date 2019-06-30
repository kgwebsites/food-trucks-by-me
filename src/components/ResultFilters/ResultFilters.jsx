import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import Modal from '../Modal';
import { TruckContext } from '../../contexts/TruckContext';

const StyledResultFilter = styled.div`
  .resultFilter {
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: center;
    box-shadow: 1px 3px 3px 2px var(--greyLight);
    color: black;
    text-decoration: none;
    margin-bottom: var(--gutter-2);
    padding: var(--gutter);
    transition: box-shadow ease-in-out 0.25s;
    &:hover {
      box-shadow: 1px 1px 1px 2px var(--greyLight);
    }
  }
`;

const PoseContainer = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 200 },
    staggerChildren: 50,
  },
});

function ResultFilters() {
  const { trucks, resultFilters, setResultFilters } = useContext(TruckContext);
  const [menuItems, setMenuItems] = useState({});
  useEffect(() => {
    const menuItemsMap = {};
    trucks.forEach(truck => {
      const menuItems = truck.optionaltext.split(',');
      const truckUniqueItems = {};
      menuItems.forEach(itemRaw => {
        const item = itemRaw.trim();
        if (!truckUniqueItems[item]) {
          menuItemsMap[item] =
            typeof menuItemsMap[item] !== 'number' ? 1 : menuItemsMap[item] + 1;
          truckUniqueItems[item] = true;
        }
      });
    });
    setMenuItems(menuItemsMap);
  }, [trucks, setMenuItems]);
  return (
    <PoseContainer>
      <Modal title="Result Filters">
        <StyledResultFilter>
          {Object.entries(menuItems).map(([item, count]) => (
            <a
              className="resultFilter"
              key={item}
              href="/list"
              onClick={e => {
                e.preventDefault();
                setResultFilters({ ...resultFilters, menuItem: item });
              }}
            >
              <h3 className="mt-0">{item}</h3>
              <p className="mt-0">
                {count} Truck{count > 1 ? 's' : ''}
              </p>
            </a>
          ))}
        </StyledResultFilter>
      </Modal>
    </PoseContainer>
  );
}

ResultFilters.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ResultFilters;
