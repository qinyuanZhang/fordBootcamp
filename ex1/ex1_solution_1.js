let _sumArr = [0];
const sum = function(arg) {
  if ('number' === typeof arg) {
    _sumArr.push(arg);
    return sum;
  }
  arg(_sumArr.reduce((previous, current) => previous + current));
};

sum(1)(2)(3)(4)(result => {
  console.log('->', result);
});



