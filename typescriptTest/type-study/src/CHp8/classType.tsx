// import React, {
//   ComponentLifecycle,
//   JSXElementConstructor,
//   ReactElement,
//   ReactNode,
//   ReactPortal,
// } from 'react';
// import { JsxElement } from 'typescript';

// interface Component<P = {}, S = {}, SS = any>
//   extends ComponentLifecycle<P, S, SS> {}

// class Component<P, S> {}

// class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {}

// interface WelcomeProps {
//   name: string;
// }

// class ClassWelcome extends React.Component<WelcomeProps> {
//   // 생략
// }

// //함수 선언을 사용
// function Welcome(props: WelcomeProps): JSX.Element {
//   return <div></div>;
// }

// // 함수 표현식을  사용한 방식 3가지
// const Welcome2: React.FC<WelcomeProps> = ({ name }) => {
//   return <div></div>;
// };

// const Welcome3: React.VFC<WelcomeProps> = ({ name }) => {
//   return <div></div>;
// };

// const Welcome4 = ({ name }: WelcomeProps): JSX.Element => {
//   return <div></div>;
// };

// type SpecificProps = {
//   children: '천생연분' | '더 귀한 분' | '귀한 분' | '고마운 분';
// };

// type StringProps = {
//   children: string;
// };

// type ReactElementProps = {
//   children: ReactElement;
// };

// //render 메서드와 함수 컴포넌트의 반환 타입

// interface ReactElement<
//   P = any,
//   T extends string | JSXElementConstructor<any> =
//     | string
//     | JSXElementConstructor<any>
// > {
//   type: T;
//   props: P;
//   key: Key | null;
// }

// declare global {
//   namespace JSX {
//     interface Element extends React.ReactElement<any, any> {}
//   }
// }

// type ReactText = string | number;
// type ReactChild = ReactElement | ReactText;
// type ReactFragment = {} | Iterable<ReactNode>;

// type ReactNode =
//   | ReactChild
//   | ReactFragment
//   | ReactPortal
//   | boolean
//   | null
//   | undefined;

// interface Props {
//   icon: JSX.Element;
// }

// const Item = ({ icon }: Props) => {
//   const iconSize = icon.props.size;
//   return <li>{icon}</li>;
// };

// // const App = () => {
// //   return <Item icon={<Icon size={14} />} />;
// // };

// type NativeButtonProps = React.DetailedHTMLProps<
//   React.ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement
// >;

// type ButtonProps = {
//   onClick?: NativeButtonProps['onClick'];
// };

// type NativeButtonType2 = React.ComponentPropsWithoutRef<'button'>;
// type ButtonProps2 = {
//   onClick?: NativeButtonType2['onClick'];
// };

export {};
