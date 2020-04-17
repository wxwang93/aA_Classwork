let Util = require("./utils.js")
let MovingObject = require("./moving_object.js")
function Asteroid(pos){
  let options = {
    color: "black",
    radius: 20,
    vel: Util.randomVec(10),
    pos: pos
  }
  return MovingObject.call(this,options);
};

Util.inherits(Asteroid, MovingObject)


module.exports = Asteroid;