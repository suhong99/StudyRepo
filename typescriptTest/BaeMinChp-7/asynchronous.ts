//superstruct

import { Infer, number, object, string, assert } from 'superstruct';

const User = object({
  id: number(),
  email: string(),
  name: string(),
});

// type User = Infer<typeof User>;

type User = {
  id: number;
  email: string;
  name: string;
};

function isUser(user: User) {
  assert(user, User);
  console.log('적절한 유저입니다.');
}
