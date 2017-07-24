import { Terain } from '../constants';
import BoardState from './BoardState';

class RootState {
    constructor (setup) {
        this.setup = setup;
        this.npc = {};
        this.board = new BoardState(setup.width, setup.height);
        this.currentRound = 1;
        this.totalRound = 8;
        this.statusText = '';
        this.setup = setup;
        setup.initialize(this);
    }
    destory () {
        this.setup.destory(this);
    }
    get isDetectiveFirst () {
        return this.currentRound % 2 == 1;
    }
    get isWitnessOpen () {
        return !this.isDetectiveFirst;
    }
    moveNpc (npc, to) {
    }
}

export default RootState;
