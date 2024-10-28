import CardList from '../components/CardList';
import { DATA } from '../dummy/data';

const Home = () => {
  return (
    <div>
      <CardList list={DATA} />
    </div>
  );
};

export default Home;
