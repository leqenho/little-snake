import { collisionWithWall, collisionWithFruit } from './colision.js';

const ArrowUp = () => setNextStep('ArrowUp', -1);
const ArrowDown = () => setNextStep('ArrowDown', 1);
const ArrowLeft = () => setNextStep('ArrowLeft', -1);
const ArrowRight = () => setNextStep('ArrowRight', 1);

function setNextStep(direction, increment) {
  let posx = game.snake.tail[0].x;
  let posy = game.snake.tail[0].y;

  let nextStep = {
    direction: direction,
    x: ['ArrowLeft', 'ArrowRight'].includes(direction) ? posx + (1 * increment) : posx,
    y: ['ArrowUp', 'ArrowDown'].includes(direction) ? posy + (1 * increment) : posy,
  }

  collisionWithFruit(nextStep);

  game.snake.tail.unshift(nextStep);
  game.snake.tail.pop();

  if (collisionWithWall(direction, nextStep)) {
    return gameOver();
  }
}

function gameOver() {
  alert(`GAME OVER\nScore: ${game.score.current}\nHigh score: ${game.score.high}`);

  game.snake.tail = [
    { direction: 'ArrowRight', x: 2, y: 23 },
    { direction: 'ArrowRight', x: 1, y: 23 },
    { direction: 'ArrowRight', x: 0, y: 23 },
  ];
  game.fruits = {
    x: 12, y: 12,
  };
  clearInterval(game.looping);
  game.speed = 500;
  game.score.current = 0;
  game.move.current = 'ArrowRight';
}

export {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
}
