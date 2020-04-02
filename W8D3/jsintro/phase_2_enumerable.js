Array.prototype.myEach = function(callback) {
    for(i = 0; i < this.length; i++) {
        callback(this[i]);
    }
};

// function capitalize(str) {
//     return str.toUpperCase();
// };

// function add2(num) {
//     return num+2;
// };

Array.prototype.myMap = function(callback) {
    let new_arr = []
    new_arr = this.myEach(callback)
    return new_arr;
};

Array.prototype.myReduce = (function(callback, initialValue=this[0]){
    initialValue = initialValue + this.myEach(callback)
   return initialValue;
});