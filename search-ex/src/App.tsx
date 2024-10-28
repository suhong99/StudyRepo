import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Search from './pages/Search';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" Component={Home} />
          <Route path="/search" Component={Search} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
