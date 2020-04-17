function MovingObject(options) {
  this.pos = options.pos
  this.vel = options.vel
  this.radius = options.radius
  this.color = options.color
}

MovingObject.prototype.draw = function (ctx){
  ctx.fillStyle = this.color; 
  let centerX = this.pos[0]
  let centerY = this.pos[1]
  ctx.beginPath();

      ctx.arc(
        centerX,
        centerY,
        this.radius,
        0,
        Math.PI * 2 
      );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos = [ this.vel[0] + this.pos[0], this.vel[1] + this.pos[1] ]
}
module.exports = MovingObject;

