const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const score = document.querySelector('.score');
let yourScore = 0;

let nloShip = [];
let fire = [];
let expl = [];
let timer = 0;
let ship = { x: 350, y: 700 };

const bgImg = new Image();
bgImg.src = 'bg.jpg';

const nloShipImg = new Image();
nloShipImg.src = 'nlo-ship.png';

const shipImg = new Image();
shipImg.src = 'ship.png';

const fireImg = new Image();
fireImg.src = 'fire.png';

const explImg = new Image();
explImg.src = 'explosion.png';

canvas.addEventListener('mousemove', function (e) {
  ship.x = e.offsetX - 25;
  ship.y = e.offsetY - 25;
});

bgImg.onload = function () {
  game();
};

function game() {
  update();
  render();
  requestAnimationFrame(game);
}

function update() {
  timer++;
  if (timer % 20 == 0) {
    nloShip.push({
      x: Math.random() * 750,
      y: -50,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 + 2,
      del: 0,
    });
  }

  //Выстрел
  if (timer % 20 == 0) {
    fire.push({ x: ship.x + 10, y: ship.y, dx: 0, dy: -15 });
  }

  for (i in fire) {
    fire[i].x = fire[i].x + fire[i].dx;
    fire[i].y = fire[i].y + fire[i].dy;
    if (fire[i].y < -30) {
      fire.splice();
    }
  }

  for (i in expl) {
    expl[i].animx = expl[i].animx + 3;
    if (expl[i].animx > 7) {
      expl[i].animy++;
      expl[i].animx = 0;
    }
    if (expl[i].animy > 7) {
      expl.splice(i, 1);
    }
  }

  //Физика
  for (i in nloShip) {
    nloShip[i].x = nloShip[i].x + nloShip[i].dx;
    nloShip[i].y = nloShip[i].y + nloShip[i].dy;
    if (yourScore >= 5) {
      nloShip[i].y = nloShip[i].y + 1;
    }
    if (yourScore >= 10) {
      nloShip[i].y = nloShip[i].y + 2;
    }
    if (yourScore >= 15) {
      nloShip[i].y = nloShip[i].y + 3;
    }
    if (yourScore >= 20) {
      nloShip[i].y = nloShip[i].y + 4;
    }
    if (yourScore >= 25) {
      nloShip[i].y = nloShip[i].y + 5;
    }

    //Границы
    if (nloShip[i].x >= 750 || nloShip[i].x < 0) nloShip[i].dx = -nloShip[i].dx;
    if (nloShip[i].y >= 750) nloShip.splice();

    for (j in fire) {
      if (
        Math.abs(nloShip[i].x + 25 - fire[j].x - 15) < 50 &&
        Math.abs(nloShip[i].y - fire[j].y) < 25
      ) {
        expl.push({
          x: nloShip[i].x - 25,
          y: nloShip[i].y - 25,
          animx: 0,
          animy: 0,
        });
        nloShip[i].del = 1;
        fire.splice(j, 1);
        break;
      }
    }
    if (nloShip[i].del == 1) {
      nloShip.splice(i, 1);
      yourScore++;
      score.textContent = yourScore;
    }
  }
}

function render() {
  context.drawImage(bgImg, 0, 0, 800, 800);
  context.drawImage(shipImg, ship.x, ship.y, 70, 70);
  for (i in fire) {
    context.drawImage(fireImg, fire[i].x, fire[i].y, 30, 30);
  }
  for (i in nloShip) {
    context.drawImage(nloShipImg, nloShip[i].x, nloShip[i].y, 70, 70);
  }
  for (i in expl) {
    context.drawImage(
      explImg,
      128 * Math.floor(expl[i].animx),
      128 * Math.floor(expl[i].animy),
      128,
      128,
      expl[i].x,
      expl[i].y,
      100,
      100
    );
  }
}
