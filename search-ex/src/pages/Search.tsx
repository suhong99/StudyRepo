import React from 'react';
import { useLocation } from 'react-router-dom';
import CardList from '../components/CardList';
import { DATA } from '../dummy/data';

const Search: React.FC = () => {
  const location = useLocation();

  // URL에서 쿼리 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';


  // 검색어에 따른 필터링
  const filteredData = DATA.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {filteredData.length > 0 ? (
        <CardList list={filteredData} />
      ) : (
        <div>데이터가 없습니다</div>
      )}
      <CardList list={filteredData} />
    </div>
  );
};

export default Search;
