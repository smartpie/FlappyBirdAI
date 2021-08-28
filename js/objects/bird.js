class Bird {
    constructor() {
        this.x = width/2;
        this.y = height/2;

        this.r = BIRD_RADIUS;

        this.yVel = 0;
        this.yAcc = 0.7;

        this.alive = true;

        this.AI = new BirdAI();

        this.score = 0;


        // Input data
        this.distanceToUpper;
        this.distanceToBottom;
        this.distanceToNextPipes;
    }

    draw() {
        if (this.alive) {
            noFill();

            strokeWeight(1);
            stroke(237, 50, 201);

            circle(this.x, this.y, this.r*2);
        }
    }

    checkCollisions() {
        if (this.alive) {
            if ((this.y + this.r >= height - borders.width) || (this.y - this.r <= borders.width)) {
                this.alive = false;

                alive -= 1;
            } else {
                for (let i = 0; i < pipes.length; i++) {
                    if (circleRect(this.x, this.y, this.r, pipes[i].upperPipe.x, pipes[i].upperPipe.y, 90, 600)
                     || circleRect(this.x, this.y, this.r, pipes[i].bottomPipe.x, pipes[i].bottomPipe.y, 90, 600)) {
                        this.alive = false;

                        alive -= 1;

                        break;
                    }
                }
            }
        }
    }


    // !!! Before handling movement you must call calculateDistanses() with the next PipeStructure
    handleMovement() {
        if (this.alive) {
            this.yVel += this.yAcc;
            this.y += this.yVel;

            this.score += 1;
        }

        if (this.AI.work(this.distanceToUpper, this.distanceToBottom, this.distanceToNextPipes, this.y) > 0) {
            this.jump();
        }
    }

    jump() {
        this.yVel = -10;
    }

    reset() {
        this.x = 400;
        this.y = 300;

        this.yVel = 0;
    }

    calculateDistanses(pipeSetX, pipeSetY) {
        this.distanceToUpper = (this.y - this.r) - (pipeSetY - GAP_SIZE/2);
        this.distanceToBottom = (pipeSetY + GAP_SIZE/2) - (this.y + this.r);
        this.distanceToNextPipes = (pipeSetX - PIPE_WIDTH/2) - (width/2 + BIRD_RADIUS);
    }
}
