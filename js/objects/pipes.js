class Pipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    handleMovement() {
        this.x -= SPEED;
    }

    draw(color) {
        noFill();
        strokeWeight(1);
        stroke(color);
        rect(this.x, this.y, PIPE_WIDTH, height);
        line(this.x, this.y, this.x+PIPE_WIDTH, this.y+height);
        line(this.x+PIPE_WIDTH, this.y, this.x, this.y+height);
    }
}


class PipeStructure {
    constructor(x, y, gap) {
        this.current = false;
        this.x = x;
        this.y = y;
        this.gap = gap;

        this.upperPipe = new Pipe(x-PIPE_WIDTH/2, y-height-gap/2);
        this.bottomPipe = new Pipe(x-PIPE_WIDTH/2, y+gap/2);
    }

    handleMovement() {
        this.upperPipe.handleMovement();
        this.bottomPipe.handleMovement();
        this.x -= SPEED;
    }

    draw() {
        if (this.current) {
            this.upperPipe.draw(color(250, 62, 62));
            this.bottomPipe.draw(color(250, 62, 62));
        } else {
            this.upperPipe.draw(color(35, 200, 53));
            this.bottomPipe.draw(color(35, 200, 53));
        }
    }
}
