import { useState } from 'react';

// - 호출 시 initialValue 인자를 지정하지 않은 경우 isModalOpened상태가  false로 설정
// - 호출 시 initialValue 인자를 boolean으로 지정시 해당 값으로 isModalOpened상태가 지정됨
// - 훅의 toggleIsModalOpened() 를 호출하면 isModalOpened 상태가 toggle 된다.
const useConfirmModal = (initialValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialValue);

  const toggleIsModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  return {
    toggleIsModalOpened,
    isModalOpened,
  };
};

export default useConfirmModal;
