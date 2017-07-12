import { Terain } from './constants';

class GameSetup {
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }

    initialize () {}
}

export default GameSetup;

export class TutorSetup extends GameSetup {
    constructor () {
        super(8, 8);
    }

    initialize (state) {
        const { Sea: S, OpenSpace: O } = Terain;
        state.board.terain = [
            S, S, S, S, S, S, S, S,
            S, S, S, S, O, S, S, S,
            S, S, S, O, O, S, S, S,
            S, S, O, O, O, O, O, S,
            S, S, O, O, O, O, O, S,
            S, O, O, O, O, S, S, S,
            S, S, S, S, O, O, S, S,
            S, S, S, S, S, S, S, S,
        ];
    }
}
