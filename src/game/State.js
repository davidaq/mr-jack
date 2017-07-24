import { Terain } from './constants';
import BoardState from './BoardState';

class State {
    constructor (setup) {
        this.setup = setup;
        this.npc = {};
        this.board = new BoardState(setup.width, setup.height);
        this.currentRound = 1;
        this.totalRound = 8;
        this.statusText = '';
        setup.initialize(this);
        this.tick = setInterval(() => {
            this.currentRound++;
            if (this.currentRound > this.totalRound) {
                this.currentRound = 1;
            }
            this.statusText = ['Hello', 'Hey!', '哈喽'][this.currentRound % 3];
        }, 1000);
    }
    destroy () {
        clearInterval(this.tick);
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

export default State;
