// T extemds I? X:Y

interface Bank {
  financialCode: string;
  companyName: string;
  name: string;
  fullName: string;
}

interface Card {
  financialCode: string;
  companyName: string;
  name: string;
  appCardType?: string;
}

type PayMethod<T> = T extends 'card' ? Card : Bank;
type CardPayMethodType = PayMethod<'card'>;
type BankMethodType = PayMethod<'bank'>;
