const CaptureEx = () => {
  return (
    <>
      <div
        onClickCapture={() => {
          alert('캡쳐링');
        }}
        style={{
          width: '300px',
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert('내부 1');
          }}
        >
          ㅎㅇ
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert('내부 2');
          }}
        >
          이벤트2
        </button>
      </div>
      <div
        onClick={() => {
          alert('캡쳐링');
        }}
        style={{
          width: '300px',
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert('내부 1');
          }}
        >
          캡처아님
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert('내부 2');
          }}
        >
          이벤트2
        </button>
      </div>
    </>
  );
};

export default CaptureEx;
