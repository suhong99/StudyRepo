import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './page/Home';
import StateTester from './page/StateTester';

const Router_EX = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" Component={Home} />
          <Route path="/test" Component={StateTester} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router_EX;
