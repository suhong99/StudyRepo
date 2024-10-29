import { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchRef.current) {
      navigate(`/search?query=${encodeURIComponent(searchRef.current.value)}`);
      // navigate('/search', {
      //   state: { query: encodeURIComponent(searchRef.current.value) },
      // });
    }
  };

  return (
    <div>
      <header>
        <div> 아티클 검색 </div>
        {`검색창 : `}
        <input
          type="text"
          placeholder="Search..."
          ref={searchRef}
          onKeyDown={handleKeyDown}
        />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
