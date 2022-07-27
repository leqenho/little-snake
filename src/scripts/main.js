import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from "./actions.js";

const move = {
  action: {
    'ArrowUp': () => ArrowUp(),
    'ArrowDown': () => ArrowDown(),
    'ArrowLeft': () => ArrowLeft(),
    'ArrowRight': () => ArrowRight(),
  },
  gameboardEvent: {
    'ArrowUp': () => nextStep('ArrowUp', 'yAxis', 'ArrowUp'),
    'ArrowDown': () => nextStep('ArrowDown', 'yAxis', 'ArrowDown'),
    'ArrowLeft': () => nextStep('ArrowLeft', 'xAxis', 'ArrowLeft'),
    'ArrowRight': () => nextStep('ArrowRight', 'xAxis', 'ArrowRight'),
  },
}

function nextStep(caller, axis, current) {
  let condition = game.move[axis].includes(game.move.current);
  let action = move.action[current];

  if (!condition) {
    game.move.current = current;
    action();
    return;
  }
}

document.onkeydown = event => {
  let keyCode;

  event == null
    ? keyCode = window.event.key
    : keyCode = event.key;

  let gameboardEvent = move.gameboardEvent[keyCode];

  if (gameboardEvent) gameboardEvent();
};

(() => game.looping = setInterval(() => {
  let loopingGame = move.action[game.move.current]
  loopingGame();
}, game.speed))();

export { move }
