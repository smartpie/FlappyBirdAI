class BirdAI {
    constructor() {
        this.input          = new Array(4);
        this.hidden1        = new Array(12);
        this.hidden2        = new Array(6);
        this.output         = new Array(1);


        this.hidden1Weights = new Array(this.hidden1.length);
        this.hidden2Weights = new Array(this.hidden2.length);
        this.outputWeights  = new Array(this.output.length);


        for (let i = 0; i < this.hidden1Weights.length; i++) {
            this.hidden1Weights[i] = new Array(this.input.length);
            // for (let j = 0; j < this.input.length; j++) {
            //     this.hidden1Weights[i][j] = random(-1, 1);
            // }
        }

        for (let i = 0; i < this.hidden2Weights.length; i++) {
            this.hidden2Weights[i] = new Array(this.hidden1Weights.length);
            // for (let j = 0; j < this.hidden1Weights.length; j++) {
            //     this.hidden2Weights[i][j] = random(-1, 1);
            // }
        }

        for (let i = 0; i < this.outputWeights.length; i++) {
            this.outputWeights[i] = new Array(this.hidden2Weights.length);
            // for (let j = 0; j < this.hidden2Weights.length; j++) {
            //     this.outputWeights[i][j] = random(-1, 1);
            // }
        }
    }

    addRandomWeights() {
        for (let i = 0; i < this.hidden1Weights.length; i++) {
            for (let j = 0; j < this.input.length; j++) {
                this.hidden1Weights[i][j] += random(-ADD_STEP, ADD_STEP);
            }
        }

        for (let i = 0; i < this.hidden2Weights.length; i++) {
            for (let j = 0; j < this.hidden1Weights.length; j++) {
                this.hidden2Weights[i][j] += random(-ADD_STEP, ADD_STEP);
            }
        }

        for (let i = 0; i < this.outputWeights.length; i++) {
            for (let j = 0; j < this.hidden2Weights.length; j++) {
                this.outputWeights[i][j] += random(-ADD_STEP, ADD_STEP);
            }
        }
    }

    crossoverWtih(otherAI) {
        for (let i = 0; i < this.hidden1Weights.length; i++) {
            for (let j = 0; j < this.input.length; j++) {
                this.hidden1Weights[i][j] = (this.hidden1Weights[i][j] + otherAI.hidden1Weights[i][j]) / 2;
            }
        }

        for (let i = 0; i < this.hidden2Weights.length; i++) {
            for (let j = 0; j < this.hidden1Weights.length; j++) {
                this.hidden2Weights[i][j] = (this.hidden2Weights[i][j] + otherAI.hidden2Weights[i][j]) / 2;
            }
        }

        for (let i = 0; i < this.outputWeights.length; i++) {
            for (let j = 0; j < this.hidden2Weights.length; j++) {
                this.outputWeights[i][j] = (this.outputWeights[i][j] + otherAI.outputWeights[i][j]) / 2;
            }
        }
    }

    generateRandomWeights() {
        for (let i = 0; i < this.hidden1Weights.length; i++) {
            for (let j = 0; j < this.input.length; j++) {
                this.hidden1Weights[i][j] = random(-1, 1);
            }
        }

        for (let i = 0; i < this.hidden2Weights.length; i++) {
            for (let j = 0; j < this.hidden1Weights.length; j++) {
                this.hidden2Weights[i][j] = random(-1, 1);
            }
        }

        for (let i = 0; i < this.outputWeights.length; i++) {
            for (let j = 0; j < this.hidden2Weights.length; j++) {
                this.outputWeights[i][j] = random(-1, 1);
            }
        }
    }

    work(up, down, next, y) {
        this.input[0] = up;
        this.input[1] = down;
        this.input[2] = next;
        this.input[3] = y;


        for (let i = 0; i < this.hidden1.length; i++) {
            this.hidden1[i] = 0;
            for (let j = 0; j < this.input.length; j++) {
                this.hidden1[i] += this.input[j] * this.hidden1Weights[i][j];
            }
            this.hidden1[i] = activator(this.hidden1[i]);
        }

        for (let i = 0; i < this.hidden2.length; i++) {
            this.hidden2[i] = 0;
            for (let j = 0; j < this.hidden1.length; j++) {
                this.hidden2[i] += this.hidden1[j] * this.hidden2Weights[i][j];
            }
            this.hidden2[i] = activator(this.hidden2[i]);
        }

        for (let i = 0; i < this.output.length; i++) {
            this.output[i] = 0;
            for (let j = 0; j < this.hidden2.length; j++) {
                this.output[i] += this.hidden2[j] * this.outputWeights[i][j];
            }
            this.output[i] = activator(this.output[i]);
        }

        return this.output[0];
    }
}




function activator(input) {
    return Math.tanh(input);
}
