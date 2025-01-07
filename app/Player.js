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
        let vertex1 = { x: this.x - 8, y: this.y + 13 };
        let vertex2 = { x: this.x + 8, y: this.y + 13 };
        let vertex3 = { x: this.x, y: this.y - 13 };

        let rotatedVertex1 = this.rotate(vertex1.x, vertex1.y);
        let rotatedVertex2 = this.rotate(vertex2.x, vertex2.y);
        let rotatedVertex3 = this.rotate(vertex3.x, vertex3.y);

        push();
        fill('red');
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