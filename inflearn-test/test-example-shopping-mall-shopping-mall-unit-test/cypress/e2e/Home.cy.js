beforeEach(() => {
  cy.visit('/');
});
// 특정 파일에서만 반복되는 단언이나 커맨드
// -> 별도 함수로 추상화하여 분리해두면 좀 더 깔끔하게 코드 관리 가능
const assertProductCardLength = length => {
  cy.findAllByTestId('product-card').should('have.length', length);
};

const assertProductCardText = (text, index = 0) => {
  cy.findAllByTestId('product-card').eq(index).findByText(text).should('exist');
};
it('초기 상품은 20개가 노출된다', () => {
  // 20개인가
  // cy.findAllByTestId('product-card').should('have.length', 20);
  assertProductCardLength(20);
});

// 통합테스트에서는 msw를 사용한 API 모킹을 통해 검증
//E2E 테스트에서는 실제 API까지 호출하여 검증 -> 앱 사용 시나리오를 완벽하게 검증
it('Show more 버튼을 클릭할 경우 상품이 20개 더 노출된다', () => {
  //Show more란 버튼 요소 찾아 클릭
  // 20개의 상품 카드가 추가되어 총 40개 상품 카드 렌더링
  cy.findByText('Show more').click();

  assertProductCardLength(40);
});

describe('장바구니 / 구매 버튼', () => {
  describe('로그인을 하지 않은 경우', () => {
    // 첫 번쨰 상품 카드의 장바구니, 구매 버튼 클릭
    //E2E에서는 실제로 이동했는지도 검증됨
    it('장바구니 버튼 클릭 시 로그인 페이지로 이동한다', () => {
      cy.getProductCardByIndex(0).findByText('장바구니').click();
      cy.assertUrl('/login');
    });

    it('구매 버튼 클릭 시 로그인 페이지로 이동한다', () => {
      cy.getProductCardByIndex(0).findByText('구매').click();
      cy.assertUrl('/login');
    });
  });

  describe('로그인 시', () => {
    beforeEach(() => {
      cy.login();
    });
    it('장바구니에 아무것도 추가하지 않은 경우 장바구니 아이콘 뱃지에 숫자가 노출되지 않는다', () => {
      // 카트 버튼을 조회
      // 버튼 하위 뱃지에 빈 텍스트가 렌더링 확인
      cy.getCartButton().should('have.text', '');
    });

    it('장바구니 버튼 클릭 시 "장바구니 추가 완료!" 알림 메세지가 노출되며, 장바구니에 담긴 수량도 증가한다', () => {
      // 첫 번째, 두 번쨰 상품 카드 클릭
      // 장바구니 추가 완료 문구 노출 단언
      // 카트 버튼의 뱃지에 수량이 증가하는지 단언
      cy.getProductCardByIndex(0).findByText('장바구니').click();
      cy.findByText('Handmade Cotton Fish 장바구니 추가 완료!').should('exist');
      cy.getCartButton().should('have.text', '1');

      // 두번쨰 상품 카드
      cy.getProductCardByIndex(1).findByText('장바구니').click();
      cy.findByText('Awesome Concrete Shirt 장바구니 추가 완료!').should(
        'exist',
      );
      cy.getCartButton().should('have.text', '2');
    });

    it('구매 버튼 클릭시 해당 아이템이 장바구니에 추가되며, 장바구니 페이지로 이동한다', () => {});
  });
});

describe('필터', () => {
  it('상품명을 "Handmade Cotton"로 입력하면 해당 상품명을 포함한 상품만 나타난다', () => {
    cy.findByLabelText('상품명').type('Handmade Cotton');

    assertProductCardLength(2);
    assertProductCardText('Handmade Cotton Fish', 0);
    assertProductCardText('Handmade Cotton Keyboard', 1);
  });

  it('카테고리를 "Shoes"로 선택할 경우 해당 카테고리 상품만 나타난다', () => {
    cy.findByRole('radio', { name: 'Shoes' }).click();

    cy.findAllByTestId('product-card').each($el => {
      cy.wrap($el).findByText('Shoes').should('exist');
    });
  });

  it('최소 가격을 "15", 최대 가격을 "20"로 입력한 경우 해당 금액 사이에 있는 상품이 노출된다', () => {
    cy.findByPlaceholderText('최소 금액').type('15');
    cy.findByPlaceholderText('최대 금액').type('20');

    assertProductCardLength(1);
    assertProductCardText('$19.00');
  });

  it('상품명 "Handmade", 카테고리 "Shoes", 최소 금액 "750", 최대 금액 "800"로 입력하면 모든 조건을 충족하는 상품만 노출된다', () => {
    cy.findByLabelText('상품명').type('Handmade');
    cy.findByLabelText('Shoes').click();
    cy.findByPlaceholderText('최소 금액').type('750');
    cy.findByPlaceholderText('최대 금액').type('800');

    assertProductCardLength(1);
    assertProductCardText('Handmade Soft Chicken');
    assertProductCardText('Shoes');
    assertProductCardText('$769.00');
  });
});

it('상품을 클릭할 경우 클릭한 상품의 상세 페이지로 이동한다', () => {
  cy.findAllByTestId('product-card').first().click();

  cy.assertUrl('/product/6');
});
