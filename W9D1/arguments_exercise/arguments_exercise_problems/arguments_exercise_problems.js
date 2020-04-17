// function sum() {
//     let sum = 0;
    
//     for (let i = 0; i < arguments.length; i ++) {
//         sum += arguments[i];
//     }

//     return sum;
// }

function sum(...args) {
    let sum = 0;
    
    for (let arg of args) sum += arg;

    return sum;
}



Function.prototype.myBind = function (context) {
    let bindArgs = Array.from(arguments).slice(1);
    
    let newThis = this;

    return function () {
        let callArgs = Array.from(arguments);
        return newThis.apply(context, bindArgs.concat(callArgs));
    }

}

function curriedSum(numArgs) {
  let numbers = [];
  const _curriedSum = function(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      numbers.reduce((ele, accum) => ele + accum);
    } else {
      return _curriedSum(num);
    }
  }
  
}



function curriedSum(numArgs) {
    const numbers = [];
  
    function _curriedSum(num) {
      numbers.push(num);
  
      if (numbers.length === numArgs) {
        let total = 0;
  
        numbers.forEach((n) => { total += n; });
  
        return total;
      } else {
        return _curriedSum;
      }
    }
  
    return _curriedSum;
  }
