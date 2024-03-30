import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// //my-class 란 class가 항상 적용된 컴퍼넌트를 렌더링
// beforeEach(async () => {
//   await render(<TextField className="my-class" />);
// });

it('className prop으로 설정한 css class가 적용된다.', async () => {
  //Arrange - 테스트를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // Act - 테스트할 동작 발생
  // --> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // --> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업
  // Assert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

  //render API 호출 -> 테스트 환경의 jsDOM에 리액트
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // vitest의 expect함수를 사용하여 기대 결과를 검증
  //className이란 내부 prop이나 state를 검증(X)
  //랜더링 되는 DOM 구조가 올바르게 변경되었는지 확인(O) -> 최종적으로 사용자가 보는 돔
  expect(textInput).toHaveClass('my-class');
});

// describe로 테스트 그룹을 만들 수 있어서, 독립적으로 필요한 설정도 할 수 있고 구분도 가능
describe('placeholder', () => {
  // it -> test함수의 alias인데 기능이 같아서 설명과 연관지어서 자연스럽게 하려고 나뉘어짐
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해주세요." />);
    const textInput = screen.getByPlaceholderText('상품명을 입력해주세요.');

    screen.debug(); // 테스트 도중 돔구조 확인가능
    expect(textInput).toBeInTheDocument();
    // 단언(asesertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); //스파이 함수
  // 스파이 함수 :테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지, 반환하는지 등 다양한 값을 저장함
  // 콜뱀함수나 이벤트 핸들러 검증시에 사용함
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test');

  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  //포커스 활성화
  // 탭 키로 인풋 요소로 포커스 이동
  // 인풋 요소를 클릭했을 떄 (보편적이므로 이를 통해 테스트)
  // textInput.focus() 직접 발생
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  // 호출 여부만 확인하면 됨
  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  // 포커스했을때 해당 스타일이 나오는지
  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25, 118, 210)',
  });
});
