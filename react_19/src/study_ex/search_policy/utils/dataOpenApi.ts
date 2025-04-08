const apiKey = import.meta.env.VITE_CONGRESS_DATA_API_KEY;

// https://www.data.go.kr/data/3037286/openapi.do#tab_layer_detail_function
// src/api/fetchBillInfoList.ts
export const fetchBillInfoList = async (
  pageNo: number = 1,
  numOfRows: number = 10
) => {
  const baseUrl =
    "http://apis.data.go.kr/9710000/BillInfoService2/getBillInfoList";

  const url = new URL(baseUrl);
  url.searchParams.append("ServiceKey", apiKey);
  url.searchParams.append("pageNo", pageNo.toString());
  url.searchParams.append("numOfRows", numOfRows.toString());

  try {
    const response = await fetch(url.toString());
    response.headers.get("Content-Type");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response;
    console.log(await data, "data");
    return data;
  } catch (error) {
    console.error("의안 리스트 요청 실패:", error);
    throw error;
  }
};
