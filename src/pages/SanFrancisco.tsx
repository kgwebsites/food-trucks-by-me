import FoodList from '../components/FoodList/FoodList';
import FoodMap from '../components/FoodMap/FoodMap';
import Header from '../components/Header/Header';
import Meta from '../components/Meta';

const SanFrancisco = () => (
  <>
    <Meta city="San Francisco" />
    <Header />
    <FoodMap />
    <FoodList />
  </>
);

export default SanFrancisco;
