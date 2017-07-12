import { Terain } from './constants';
import BoardState from './BoardState';

class State {
    constructor (setup) {
        this.setup = setup;
        this.npc = {};
        this.board = new BoardState(setup.width, setup.height);
        setup.initialize(this);
    }
    moveNpc (npc, to) {
    }
}

export default State;
