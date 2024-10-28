import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
