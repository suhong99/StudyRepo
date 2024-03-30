import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';
// 리액트 훅은 반드시 리액트 컴포넌트내에서만 호출되어야 정상적으로 실행되지만, renderHook 사용시 테스트 가능
it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result : 훅을 호출하여 얻은 결과 값을 반환
  // eslint-disable-next-line no-unused-vars
  const { result, rerender } = renderHook(useConfirmModal);
  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));
  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);
  //   result.current.toggleIsModalOpened();
  //   expect(result.current.isModalOpened).toBe(true); //실패
  // act를 써야 테스트 환경에서 가상돔에 제대로 반영되었다는 가정하에 테스트가 가능함
  // 업데이트를 할 때 act함수를 써야함.
  act(() => {
    result.current.toggleIsModalOpened();
  });
  expect(result.current.isModalOpened).toBe(true);
});
