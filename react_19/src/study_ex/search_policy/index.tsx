import { useEffect } from "react";
import { fetchCongressMember } from "./utils/openApi";
import { fetchBillInfoList } from "./utils/dataOpenApi";

const Search_Policy = () => {
  useEffect(() => {
    // //국회인물 요청
    // const getData = async () => {
    //   const data = await fetchCongressMember("이재명"); // 이름 변경 가능
    //   console.log(data);
    // };

    // getData();

    const getBillList = async () => {
      const result = await fetchBillInfoList(); // 기본: page 1, rows 10

      console.log(result);
    };
    getBillList();
  }, []);
  return <div></div>;
};

export default Search_Policy;
