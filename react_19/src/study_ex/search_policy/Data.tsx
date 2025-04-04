import { useEffect, useState } from "react";

const Data = () => {
  const [billData, setBillData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBillData = async (age: string) => {
    const apiKey = import.meta.env.VITE_CONGRESS_API_KEY;
    const url = `https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn?KEY=${apiKey}&AGE=${age}&pIndex=1&pSize=100&Type=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }

      const data = await response.json();
      console.log("API 응답 데이터:", data);
      const rows = data?.nzmimeepazxkubdpn?.[1]?.row || [];
      return rows;
    } catch (err) {
      console.error("API 요청 실패:", err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rows = await getBillData("22");
        setBillData(rows);
      } catch (err) {
        setError("API 요청 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>법률안 정보</h1>
      {billData.length > 0 ? (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>법률안 번호</th>
              <th>제목</th>
              <th>제안자</th>
              <th>소관 위원회</th>
              <th>처리 결과</th>
              <th>제안일</th>
              <th>링크</th>
            </tr>
          </thead>
          <tbody>
            {billData.map((bill, index) => (
              <tr key={index}>
                <td>{bill.BILL_NO}</td>
                <td>{bill.BILL_NAME}</td>
                <td>{bill.PROPOSER}</td>
                <td>{bill.COMMITTEE || "없음"}</td>
                <td>{bill.PROC_RESULT || "미정"}</td>
                <td>{bill.PROPOSE_DT}</td>
                <td>
                  {bill.DETAIL_LINK ? (
                    <a
                      href={bill.DETAIL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      바로가기
                    </a>
                  ) : (
                    "링크 없음"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>법률안 데이터를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Data;
