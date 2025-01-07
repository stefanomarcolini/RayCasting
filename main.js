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

window.setup = setup;
window.draw = draw;