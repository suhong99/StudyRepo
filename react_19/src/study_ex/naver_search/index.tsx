import { useEffect, useState } from "react";

const NaverSearch = () => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (query: string) => {
    setLoading(true);
    try {
      // ✅ proxy 경유해서 요청
      const res = await fetch(
        `/api/v1/search/news.json?query=${encodeURIComponent(
          query
        )}&display=5&sort=date`,
        {
          headers: {
            "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID as string,
            "X-Naver-Client-Secret": import.meta.env
              .VITE_NAVER_CLIENT_SECRET as string,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`API 요청 실패: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setNewsList(data.items || []);
    } catch (error) {
      console.error("뉴스 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("인공지능"); // ✅ 기본 검색 키워드
  }, []);

  return (
    <div>
      <h2>네이버 뉴스 검색 결과</h2>
      {loading && <p>불러오는 중...</p>}
      <ul>
        {newsList.map((news, idx) => (
          <li key={idx}>
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <span dangerouslySetInnerHTML={{ __html: news.title }} />
            </a>
            <p dangerouslySetInnerHTML={{ __html: news.description }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NaverSearch;
