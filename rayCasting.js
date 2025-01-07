const TILE_SIZE = 32;
const NUM_ROWS = 15;
const NUM_COLS = 15;
const C_WIDTH = TILE_SIZE * NUM_COLS;
const C_HEIGHT = TILE_SIZE * NUM_ROWS;

/************************************************
 * Class LandMap
 ***********************************************/
class LandMap {
    constructor() {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    render() {
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                let tyleColor = this.grid[row][col] === 1 ? "#222" : "#fff";
                fill(tyleColor);
                stroke("#aaa");
                let tyleX = col * TILE_SIZE;
                let tyleY = row * TILE_SIZE;
                rect(tyleX, tyleY, TILE_SIZE, TILE_SIZE)
            }
        }
    }
}

/************************************************
 * Class Player
 ***********************************************/
class Player {
    constructor(x, y, angle, angleSpeed, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.angleSpeed = angleSpeed;
        this.speed = speed;
    }

    update() {
        if (keyIsDown(LEFT_ARROW)) {
            this.rotateLeft();
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.rotateRight();
        }
        if (keyIsDown(UP_ARROW)) {
            this.moveForward();
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.moveBackward();
        }
    }

    rotateLeft() {
        this.angle -= this.angleSpeed;
    }

    rotateRight() {
        this.angle += this.angleSpeed;
    }

    moveForward() {
        let tmpX = this.x + this.speed * Math.cos(this.angle - Math.PI / 2);
        let tmpY = this.y + this.speed * Math.sin(this.angle - Math.PI / 2);
        // collision detection
        if (grid.grid[floor(tmpY / TILE_SIZE)][floor(tmpX / TILE_SIZE)] === 0) {
            this.x = tmpX;
            this.y = tmpY;
        }
    }

    moveBackward() {
        let tmpX = this.x - this.speed * Math.cos(this.angle - Math.PI / 2);
        let tmpY = this.y - this.speed * Math.sin(this.angle - Math.PI / 2);
        // collision detection
        if (grid.grid[floor(tmpY / TILE_SIZE)][floor(tmpX / TILE_SIZE)] === 0) {
            this.x = tmpX;
            this.y = tmpY;
        }
    }

    render() {
        push();
        let p1x = this.x - 8;
        let p1y = this.y + 13;
        let p2x = this.x + 8;
        let p2y = this.y + 13;
        let p3x = this.x;
        let p3y = this.y - 13;
        fill('red');
        let rotatedVertex1 = this.rotate(p1x, p1y);
        let rotatedVertex2 = this.rotate(p2x, p2y);
        let rotatedVertex3 = this.rotate(p3x, p3y);
        triangle(rotatedVertex1[0], rotatedVertex1[1], rotatedVertex2[0], rotatedVertex2[1], rotatedVertex3[0], rotatedVertex3[1]);
        pop();
    }

    rotate(x, y) {
        let cos = Math.cos(this.angle);
        let sin = Math.sin(this.angle);

        // translate to origin
        x -= this.x;
        y -= this.y;

        // rotate
        let newX = x * cos - y * sin;
        let newY = x * sin + y * cos;

        // translate back
        newX += this.x;
        newY += this.y;

        return [newX, newY];
    }
}


/************************************************
 * Globals
 ***********************************************/
const grid = new LandMap();
const player = new Player(C_WIDTH / 2, C_HEIGHT / 2, 0, 0.05, 2);


/************************************************
 * GameLoop
 ***********************************************/
function setup() {
    createCanvas(C_WIDTH, C_HEIGHT);
}

function update() {
    player.update();
}

function draw() {
    update()
    grid.render();
    player.render();
}