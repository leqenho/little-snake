import { move } from './main.js';

const { width, height } = document.getElementById('board');
const { pixel } = game;

function collisionWithWall(direction, step) {
  if (['ArrowUp', 'ArrowLeft'].includes(direction)) {
    if (step.x < 0 || step.y < 0) return true;
  }
  if (['ArrowRight', 'ArrowDown'].includes(direction)) {
    if (step.x * pixel > width - pixel) return true;
    if (step.y * pixel > height - pixel) return true;
  }
  return false;
}

function collisionWithFruit(step) {
  let suggestedPosition = {
    x: Math.floor(Math.random() * 24 - 0 + 0) + 0,
    y: Math.floor(Math.random() * 24 - 0 + 0) + 0
  };
  let positionDifferentTail = () => {
    for (const key in game.snake.tail) {
      let compare = (
        suggestedPosition.x === game.snake.tail[key].x &&
        suggestedPosition.y === game.snake.tail[key].y
      );
      if (compare) {
        collisionWithFruit({ x: step.x, y: step.y });
        return false;
      }
    }
    return true;
  }
  if (
    step.x == game.fruits.x &&
    step.y == game.fruits.y &&
    positionDifferentTail()) {
    game.snake.tail.push(game.snake.tail.length - 1);
    game.fruits = suggestedPosition;
    game.score.current += 1;
  }

  function upSpeed(up) {
    clearInterval(game.looping);
    game.speed = up;
    game.looping = setInterval(() => {
      let looping = move.action[game.move.current]
      looping();
    }, game.speed);
  }

  if (game.snake.tail.length > 8) upSpeed(200);
  if (game.snake.tail.length > 15) upSpeed(150);
  if (game.snake.tail.length > 20) upSpeed(100);
  if (game.snake.tail.length > 30) upSpeed(50);
}

export { collisionWithWall, collisionWithFruit }
