import { Terain } from '../constants';

export class TutorSetup {
    constructor () {
        this.width = 8;
        this.height = 8;
    }

    initialize (state) {
        const { Sea: S, OpenSpace: O } = Terain;
        state.board.terain = [
            S, O, O, S, S, S, S, S,
            S, S, O, O, O, S, O, S,
            S, O, O, O, O, O, O, S,
            O, O, O, O, O, O, O, O,
            O, O, O, O, O, O, O, S,
            S, O, O, O, O, O, S, S,
            S, S, S, S, O, O, O, O,
            S, S, S, S, S, S, O, S,
        ];
    }
}

export default TutorSetup;
