import { useRoute, useLocation } from 'wouter';
import { Portal } from './components/Portal';

function App() {
  const [, params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();
  return (
    <>
      <Portal />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <a
          style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}
          href="#"
          onClick={() => setLocation('/')}
        >
          {params ? '< back' : 'double click to enter portal'}
        </a>
      </div>{' '}
    </>
  );
}

export default App;
