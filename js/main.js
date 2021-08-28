const SPEED = 2.3;
const INTERVAL = 2;
const GAP_SIZE = 165;
const BIRD_RADIUS = 28;
const PIPE_WIDTH = 90;
const ADD_STEP = 0.35;



const SURVIVORS = 10;
var population = SURVIVORS * (SURVIVORS - 1);

var generation = 1;


var pipes = [];
var colliding = false;

var birds = [];
var tempBirds = [];
var borders = new Borders();

var alive;
var score = 0;
var bestScore = 0;

var firstAlive = 0;


var nextX;
var nextY;

var gg = 1;

let scoreAdded = false;

function setup() {
    setFrameRate(120);

    createCanvas(800, 600);
    textSize(28);


    alive = population;
    for (let i = 0; i < population; i++) {
        birds.push(new Bird());
        birds[i].AI.generateRandomWeights();
    }

    let locationY = random(GAP_SIZE/2, height-GAP_SIZE/2);
    pipes.push(new PipeStructure(900, floor(locationY), GAP_SIZE));
    pipes[0].current = true;
}



function draw() {
    for (let lo = 0; lo < gg; lo++) {
        background(138, 216, 255);

        if (score > bestScore) {
            bestScore = score;
        }

        if (alive == 0) {
            if (score > bestScore) {
                bestScore = score;
            }
            score = 0;

            birds.sort((a, b) => (a.score < b.score) ? 1 : -1)

            tempBirds = [];
            for (let i = 0; i < SURVIVORS; i++) {
                tempBirds.push(birds[i]);
            }

            birds = [];

            for (let i = 0; i < SURVIVORS; i++) {
                for (let j = 0; j < SURVIVORS-1 ; j++) {
                    if (i > j) {
                        let tempBird = new Bird();

                        tempBird.AI = _.cloneDeep(tempBirds[i].AI);
                        tempBird.AI.crossoverWtih(tempBirds[j].AI);

                        birds.push(tempBird);

                        let tempBird2 = _.cloneDeep(tempBird);
                        tempBird2.AI.addRandomWeights();

                        birds.push(tempBird2);
                    }
                }
            }

            resetPipes();
            alive = population;
            generation += 1;
        } else {
            pipesHandler();


            for (let i = 0; i < pipes.length; i++) {
                if (pipes[i].current == true) {
                    if (pipes[i].x <= width/2 && !scoreAdded) {
                        score += 1;
                        scoreAdded = true;
                        console.log('+ADDED+');
                    }

                    if (pipes[i].x + PIPE_WIDTH/2 < width/2 - BIRD_RADIUS) {
                        pipes[i + 1].current = true;
                        pipes[i].current     = false;

                        scoreAdded = false;
                        // console.log(generation);
                    }


                    nextX = pipes[i].x;
                    nextY = pipes[i].y;
                }

                pipes[i].handleMovement();
                pipes[i].draw();
            }

            for (let i = 0; i < birds.length; i++) {
                birds[i].calculateDistanses(nextX, nextY);
                birds[i].checkCollisions();
                birds[i].handleMovement();
                birds[i].draw();
            }

            borders.draw();
        }

        drawData();
    }
}




function pipesHandler() {
    if(frameCount % (INTERVAL * 60) == 0){
        let locationY = random(GAP_SIZE/2, height-GAP_SIZE/2);
        pipes.push(new PipeStructure(900, floor(locationY), GAP_SIZE));
        if (pipes.length > 5) {
            pipes.shift();
        }
    }
}


function resetPipes() {
    // console.log('__NEW__');
    // console.log('before');
    // logPipes();
    pipes = [];
    // console.log('after');
    // logPipes();
    frameCount = 1;

    let locationY = random(GAP_SIZE/2, height-GAP_SIZE/2);
    pipes.push(new PipeStructure(900, floor(locationY), GAP_SIZE));
    pipes[0].current = true;

    scoreAdded = false;
    // console.log('big after');
    // logPipes();
}


function drawData() {
    stroke(255);
    strokeWeight(0);
    fill(0, 102, 153);
    output = "Alive: " + alive;
    text(output, 20, 52);
    output = "Generation: " + generation;
    text(output, 20, 82);
    output = "Current score: " + score;
    text(output, 20, 112);
    output = "Best score: " + bestScore;
    text(output, 20, 142);
}

function logPipes() {
    for (let i = 0; i < pipes.length; i++) {
        console.log(pipes[i].current);
    }
}
