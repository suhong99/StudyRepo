import '@testing-library/cypress/add-commands';
//RTL에서 get쓰는거랑 달리 find사용함
//커스텀 커맨드:  원하는 쿼리를 커스텀하여 사용가능(Retry-ability미지원)
Cypress.Commands.add('login', () => {
  const username = 'maria@mail.com';
  const password = '12345';

  cy.session(username, () => {
    cy.visit('/login');

    cy.findByLabelText('이메일').type(username);
    cy.findByLabelText('비밀번호').type(password);
    cy.findByLabelText('로그인').click();

    cy.location('pathname').should('eq', '/');
  });

  // 로그인 이후 메인 홈페이지로 이동
  cy.visit('/');
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: 'Maria' }).click();
  cy.findByRole('button', { name: '확인' }).click();
});

Cypress.Commands.add('assertUrl', url => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});

Cypress.Commands.add('getProductCardByIndex', index => {
  return cy.findAllByTestId('product-card').eq(index);
});

//커스텀 쿼리:  원하는 쿼리를 커스텀하여 사용가능(Retry-ability 지원)

Cypress.Commands.addQuery('getCartButton', () => {
  // cy.now()로 감싸 특정 쿼리를 호출 -> subject를 받아 inner function에서 쿼리를 실행할 수 있음
  const getFn = cy.now('get', `[data-testid="cart-button"]`);

  // inner function 형태로 반환해야함
  return subject => {
    //cart-icon testid를 가진 요소를 조회하는 get 쿼리
    // 우리가 원하는 subject를 기준으로 실행함
    const btn = getFn(subject);

    return btn;
  };
});
