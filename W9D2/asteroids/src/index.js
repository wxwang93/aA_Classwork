console.log("Webpack is working!")

const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  window.canvas = canvas;
  window.ctx = ctx;

})
window.Asteroid = Asteroid;
window.MovingObject = MovingObject;