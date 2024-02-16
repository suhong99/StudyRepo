const replaceHyphen: (date: string | Date) => string | Date = (date) => {
  if (typeof date === 'string') {
    return date.replace(/-/g, '/');
  }
  return date;
};

//인스턴스
const onKeyDown = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLInputElement && event.key === 'Enter') {
    event.target.blur();
  }
};
//in
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }

  return animal.fly();
}

//is
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
function getSmallPet(): Fish | Bird {
  const randomNumber = Math.random();

  if (randomNumber < 0.5) {
    return { swim: () => console.log('Fish is swimming') };
  } else {
    return { fly: () => console.log('Bird is flying') };
  }
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
