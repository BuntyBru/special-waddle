const multiplyBy2 = (item) => item * 2;

const add3 = (item) => item + 3;

const sub2 = (item) => item - 2;

const reduce = (array, howToCombine, buildUp) => {
  for (let i = 0; i < array.length; i++) {
    buildUp = howToCombine(buildUp, array[i]);
  }

  return buildUp;
};

const runFunctionOnInput = (input, fn) => {
  return fn(input);
};

const output = reduce([multiplyBy2, add3, sub2], runFunctionOnInput, 10);

console.log(output);
