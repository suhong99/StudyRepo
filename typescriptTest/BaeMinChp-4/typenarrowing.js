var replaceHyphen = function (date) {
  if (typeof date === 'string') {
    return date.replace(/-/g, '/');
  }
  return date;
};
//인스턴스
var onKeyDown = function (event) {
  if (event.target instanceof HTMLInputElement && event.key === 'Enter') {
    event.target.blur();
  }
};
function move(animal) {
  if ('swim' in animal) {
    return animal.swim();
  }
  return animal.fly();
}
//is
function isFish(pet) {
  return pet.swim !== undefined;
}
function getSmallPet() {
  var randomNumber = Math.random();
  if (randomNumber < 0.5) {
    return {
      swim: function () {
        return console.log('Fish is swimming');
      },
    };
  } else {
    return {
      fly: function () {
        return console.log('Bird is flying');
      },
    };
  }
}
var pet = getSmallPet();
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
