const apiKey = import.meta.env.VITE_CONGRESS_API_KEY;

// https://open.assembly.go.kr/portal/data/service/selectAPIServicePage.do/OWSSC6001134T516707
// 언제 국회의원이었는지 나옴
export const fetchCongressMember = async (
  HG_NM: string,
  pIndex: number = 1,
  pSize: number = 100
) => {
  console.log("호출");
  const baseUrl =
    "https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu";

  const url = new URL(baseUrl);
  url.searchParams.append("KEY", apiKey);
  url.searchParams.append("Type", "json");
  url.searchParams.append("pIndex", pIndex.toString());
  url.searchParams.append("pSize", pSize.toString());
  url.searchParams.append("HG_NM", HG_NM);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("국회의원 정보 요청 실패:", error);
    throw error;
  }
};
