
Array.prototype.uniq = function() {
    let uniqs = []
    for(i = 0; i < this.length; i++){
        if (!uniqs.includes(this[i])){
        uniqs.push(this[i])
        }
    }
    return uniqs;
};

Array.prototype.twoSum = function() {
    let sumPairs = []
    for(i = 0; i < this.length; i++){
        for (i2 = 0; i2 < this.length; i2++){
            if((this[i] + this[i2] === 0) && (i !== i2)){
                sumPairs.push([this[i], this[i2]])
            }
        }
    }
    return sumPairs;
};

Array.prototype.transpose = function() {

    let transposed = new Array(this[0].length).fill(0).map(() => new Array(this.length).fill(0))
    for (i = 0; i < this.length; i++){
        for(j = 0; j < this[0].length; j++) {
            // console.log(transposed)
            transposed[j][i] = this[i][j]
            // console.log(transposed)
        }
    }
    return transposed;
};

let array = [[1,2,3], [4,5,6]]
console.log(array.transpose())