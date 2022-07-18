const canvas = document.getElementById('board');
const ctx = canvas.getContext("2d");

function imageSource(filename) {
  return `./src/images/${filename}.png`
}

gameBoardRender();

// renderiza a tela do jogo
function gameBoardRender() {
  ctx.fillStyle = "#171717";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snakeRender();
  fruitsRender();
  scoreRender();

  requestAnimationFrame(() => gameBoardRender());
}

// renderiza a cobra
function snakeRender() {
  window.game.snake.tail.forEach((tail, index) => {
    const image = new Image(10, 10);
    image.src = index ? imageSource('snake-body') : imageSource('snake-head');

    ctx.drawImage(
      image,
      (tail.x * game.pixel),
      (tail.y * game.pixel),
      (1 * game.pixel), (1 * game.pixel));
  });
}

// renderiza as frutas
function fruitsRender() {
  const image = new Image(40, 40);
  image.src = imageSource('fruit-one');

  ctx.drawImage(
    image,
    (game.fruits.x * game.pixel),
    (game.fruits.y * game.pixel),
    (1 * game.pixel), (1 * game.pixel));
}

function scoreRender() {
  let scoreLvl, highScore;
  let scoreElement = document.querySelector('#current');
  let highElement = document.querySelector('#high');

  if (game.score.current > game.score.high) {
    game.score.high = game.score.current;
    highElement.innerHTML = game.score.high
  }
  if (game.score.current == 0) scoreLvl = '0000';
  if (game.score.current < 10) {
    scoreLvl = `000${game.score.current}`;
    highScore = `000${game.score.high}`;
    scoreElement.innerHTML =  scoreLvl;
    highElement.innerHTML = highScore;
    return;
  }
  if (game.score.current < 100) {
    scoreLvl = `00${game.score.current}`;
    highScore = `00${game.score.high}`;
    scoreElement.innerHTML =  scoreLvl;
    highElement.innerHTML = highScore;
    return;
  }
  if (game.score.current < 1000) {
    scoreLvl = `0${game.score.current}`;
    highScore = `0${game.score.high}`;
    scoreElement.innerHTML =  scoreLvl;
    highElement.innerHTML = highScore;
    return;
  }
}

