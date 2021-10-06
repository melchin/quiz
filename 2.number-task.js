/*
    2. Write a function in Javascript, which receives NUMBER and has the next logic:
        a) it prints "foo" if NUMBER is divisible by 2;
        b) it prints "bar" if NUMBER is divisible by 7;
        c) it prints "foobar" if NUMBER is divisible by 14;
        d) it prints NUMBER value for other cases;
    note: NUMBER is a positive integer number;
*/

// All multiples of 14 are even. All multiples of 14 are divisible by 7.
// So we only need to check for divisible by 2 && divisible by 7
// If our number is 0 it will print 'foobar'
const printer = NUMBER => {
  let output = "";

  if (NUMBER % 2 === 0) {
    output += "foo";
  }

  if (NUMBER % 7 === 0) {
    output = NUMBER === 7 ? "bar" : output + "bar";
  }

  if (!output) {
    output = NUMBER;
  }

  console.log(output);
};
