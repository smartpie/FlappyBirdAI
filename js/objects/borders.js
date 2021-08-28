class Borders {
    constructor() {
        this.width = 14;
    }

    draw() {
        noStroke(20, 26, 21);
        fill(0, 121, 14);

        // Ceiling
        rect(0, 0, width, 14);

        // Floor
        rect(0, height-14, width, 14);



        stroke(224, 252, 227);
        noFill();
        strokeWeight(3);

        // Ceiling
        line(0, 13, width, 13);

        // Floor
        line(0, height-13, width, height-13);
    }
}
