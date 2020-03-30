function optimizedSum() {
  let _sumArr = [0];
  return function _sum(param) {
    if ('number' === typeof param) {
      _sumArr.push(param);
      return _sum;
    }
    param(_sumArr.reduce((prev, curr) => prev + curr));
  }
}

let sum = optimizedSum();
sum(result => {
  console.log('->', result);
});

// sum = null; // remove _sumArr