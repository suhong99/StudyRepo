import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => navigate('/test', { state: { message: '저장됨' } })}
      >
        Test 페이지로 이동
      </button>
    </div>
  );
};

export default Home;
