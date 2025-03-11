import { useLocation } from 'react-router';

const StateTester = () => {
  const location = useLocation(); // 현재 페이지의 state 가져오기

  return (
    <div>
      <h1>State Tester</h1>
      <p>받은 state: {location.state?.message || '없음'}</p>
    </div>
  );
};

export default StateTester;
