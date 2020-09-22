const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasSide = 540;
const victoryScreen = document.getElementById('victory-screen');
const tileSize = 45;
const keys = ['arrowup', 'arrowdown', 'arrowright', 'arrowleft'];
const arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

ctx.canvas.height = canvasSide;
ctx.canvas.width = canvasSide;

let victory = false;
const player = {
  x: 90,
  y: 90,
};

const spawnPlayer = () => {
  const { x, y } = player;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, x, y, tileSize, tileSize);
  };
  image.src = getAsset('player');
};

function getAsset(name) {
  return name ? `./tileset/${name}.png` : '';
}

function render() {
  let imageName = '';
  arr.forEach((element, j) => {
    const y = tileSize * j;
    element.forEach((item, i) => {
      const x = tileSize * i;
      const image = new Image();
      switch (item) {
        case 0:
          imageName = 'wall';
          break;
        case 1:
          imageName = 'floor';
          break;
        case 2:
          imageName = 'exit';
          break;
      }
      image.onload = () => {
        ctx.drawImage(image, x, y, tileSize, tileSize);
      };
      image.src = getAsset(imageName);
    });
  });
  spawnPlayer();
}

const win = () => {
  victory = true;
  victoryScreen.className = 'active';
  ctx.beginPath();
  ctx.clearRect(0, 0, canvasSide, canvasSide);
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvasSide, canvasSide);
  };
  image.src = './tileset/victory.png';
  ctx.closePath();
};

document.onkeydown = ({ key = '' }) => {
  switch (key.toLowerCase()) {
    case keys[0]:
      if (arr[(player.y - tileSize) / tileSize][player.x / tileSize] !== 0) {
        player.y -= tileSize;
      }
      break;
    case keys[1]:
      if (arr[(player.y + tileSize) / tileSize][player.x / tileSize] != 0) {
        player.y += tileSize;
      }
      break;
    case keys[2]:
      if (arr[player.y / tileSize][(player.x + tileSize) / tileSize] != 0) {
        player.x += tileSize;
      }
      break;
    case keys[3]:
      if (arr[player.y / tileSize][(player.x - tileSize) / tileSize] != 0) {
        player.x -= tileSize;
      }
      break;
  }
  if (keys.includes(key.toLowerCase())) {
    if (!victory) {
      render();
    }
    if (arr[player.y / tileSize][player.x / tileSize] === 2) {
      setTimeout(win, 700);
    }
  }
};

render();
