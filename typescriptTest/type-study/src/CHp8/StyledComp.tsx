import React from 'react';
import styled from 'styled-components';

const StyledComp = () => {
  return <div>StyledComp</div>;
};

export default StyledComp;

const theme = {
  fontSize: {
    default: '16px',
    small: '14px',
    large: '18px',
  },

  color: {
    white: '#FFFFFF',
    black: '#000000',
  },
};

type Theme = typeof theme;
type FontSize = keyof Theme['fontSize'];
type Color = keyof Theme['color'];

interface SelectStyleProps {
  color: Color;
  fontSize: FontSize;
}

const StyledSelect = styled.select<SelectStyleProps>`
  color: ${({ color }) => theme.color[color]};
`;

interface Props<T extends string> {
  onChangeA?: (selected: T) => void;
  onChangeB?(selected: T): void;
}

const Component = () => {
  const changeToPineApple = (selectedApple: 'apple') => {
    console.log('this is pine' + selectedApple);
  };

  return (
    <TestComponentApple
      onChangeA={changeToPineApple}
      onChangeB={changeToPineApple}
    />
  );
};

const TestComponentApple = (props: Props<'apple'>) => {
  return <div></div>;
};

interface User {
  id: string;
}

interface Member extends User {
  nickname: string;
}

let users: Array<User> = [];
let members: Array<Member> = [];

users = members; // 공변성!
// members = users; //User[]' 형식은 'Member[]' 형식에 할당할 수 없습니다. 'nickname' 속성이 'User' 형식에 없지만 'Member' 형식에서 필수입니다.

type PrintUserInfo<U extends User> = (user: U) => void;
let printUser: PrintUserInfo<User> = (user) => console.log(user.id);
let printMember: PrintUserInfo<Member> = (user) =>
  console.log(user.id, user.nickname);

printMember = printUser;

// printUser = printMember; //intUserInfo<Member>' 형식은 'PrintUserInfo<User>' 형식에 할당할 수 없습니다. 'nickname' 속성이 'User' 형식에 없지만 'Member' 형식에서 필수입니다.
