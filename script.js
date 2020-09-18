let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');
let div = document.getElementById('main');
let tileSize = 45;
let arr = [
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

let victory = false;
let player = {
  x: 90,
  y: 90,
};

const spawnPlayer = () => {
  if (victory == true) {
    return;
  } else {
    const { x, y } = player;
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, x, y, tileSize, tileSize);
    };
    image.src = './tileset/player.png';
  }
};

function draw() {
  if (victory == true) {
    return;
  } else {
    let imagePath = '';
    arr.forEach((element, j) => {
      let y = tileSize * j;
      element.forEach((item, i) => {
        let x = tileSize * i;
        const image = new Image();
        switch (item) {
          case 0:
            imagePath = 'wall';
            break;
          case 1:
            imagePath = 'floor';
            break;
          case 2:
            imagePath = 'exit';
            break;
        }
        image.onload = () => {
          ctx.drawImage(image, x, y, tileSize, tileSize);
        };
        image.src = imagePath ? `./tileset/${imagePath}.png` : '';
      });
    });
  }
}

const win = () => {
  victory = true;
  div.innerHTML = 'You Win! =)';
  div.className = 'congrats';
  ctx.beginPath();
  ctx.clearRect(0, 0, 540, 540);
  const image = new Image();
     image.onload = () => {
      ctx.drawImage(image, 0, 0, 540, 550);
    };
  image.src = './tileset/victory.png';
  ctx.closePath();
};

document.onkeydown = (event) => {
  switch (event.key.toLowerCase()) {
    case 'arrowup':
      if (arr[(player.y - tileSize) / tileSize][player.x / tileSize] != 0) {
        player.y -= tileSize;
      }
      if (arr[player.y / tileSize][player.x / tileSize] == 2) {
        setTimeout(win,700);
      }
      draw();
      spawnPlayer();
      break;
    case 'arrowdown':
      if (arr[(player.y + tileSize) / tileSize][player.x / tileSize] != 0) {
        player.y += tileSize;
      }
      if (arr[player.y / tileSize][player.x / tileSize] == 2) {
        setTimeout(win,700);
        
      }
      draw();
      spawnPlayer();
      break;
    case 'arrowright':
      if (arr[player.y / tileSize][(player.x + tileSize) / tileSize] != 0) {
        player.x += tileSize;
      }
      if (arr[player.y / tileSize][player.x / tileSize] == 2) {
        setTimeout(win,700);
      }
      draw();
      spawnPlayer();
      break;
    case 'arrowleft':
      if (arr[player.y / tileSize][(player.x - tileSize) / tileSize] != 0) {
        player.x -= tileSize;
      }
      if (arr[player.y / tileSize][player.x / tileSize] == 2) {
        setTimeout(win,700);
      }
      draw();
      spawnPlayer();
      break;
  }
};

draw();
spawnPlayer(2, 2);
