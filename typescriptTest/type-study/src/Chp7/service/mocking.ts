import { resolve } from "path";

const mockFetchBrands = (): Promise<FetchBrandsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'SUCCESS',
        message: null,
        data: [
          {
            id: 1,
            label: '배민스토어',
          },
          {
            id: 2,
            label: '비마트',
          },
        ],
      });
    }, 500);
  });

const fetchBrands = () => {
  if (useMock) {
    return mockFetchBrands();
  }
  return requester.get('/brands');
};
//
const useMock = Object.is(REACT_APP_MOCK, 'true');
const mockFn = ({status=200,time=100,use=true}:MockResult) => use &&
    mock.onGet(/\/order\/list/).reply(()=>
    new Promise((resolve)=>
    setTimeout(()=>{
        resolve([
            status,
            status ===200? fetchOrderListSuccessResponse : undefined,
        ]);
    },time)
    )

    if(useMock){
        mockFn({status:200,time:100,use:true})
    }
)
