import { useEffect } from "react";
import { fetchBillInfoList, fetchBillReceiptInfo } from "./utils/dataOpenApi";
import Data from "./Data";
import { fetchCongressMember } from "./utils/openApi";

const Search_Policy = () => {
  useEffect(() => {
    //국회인물 요청
    const getData = async () => {
      const data = await fetchCongressMember("최경환", "100021", 3); // 이름 변경 가능
      console.log("역대국회요청", data);
    };

    getData();

    const getBillList = async () => {
      // const result = await fetchBillReceiptInfo(
      //   "PRC_V1D5J0T4C1Y3A1Q7Q3L8U4J0S5L1M6"
      // ); // 기본: page 1, rows 10
      // // dd
      // const result = await fetchBillInfoList();
      // console.log(result);
    };
    getBillList();
  }, []);
  return <div>{/* <Data /> */}</div>;
};

export default Search_Policy;
