import { Terain, Role } from '../constants';
import BoardState from './BoardState';

class RootState {
    constructor (setup) {
        this.setup = setup;
        this.npc = {};
        this.board = new BoardState(setup.width, setup.height);
        this.currentRound = 1;
        this.totalRound = 8;
        this.roundMove = 1;
        this.statusText = '';
        this.alertText = '';
        this.myRole = 0;
        this.setup = setup;
        this.deciders = [];
        this.deciding = 0;
        setup.initialize(this);
    }
    async decideNextMove () {
        let moveRole = 0;
        if (this.isDetectiveFirst) {
            moveRole = [0, Role.Detective, Role.Jack, Role.Jack, Role.Detective][this.roundMove];
        } else {
            moveRole = [0, Role.Jack, Role.Detective, Role.Detective, Role.Jack][this.roundMove];
        }
        await this.deciders[moveRole].decide();
        this.roundMove++;
        if (this.roundMove > 4) {
            this.roundMove = 1;
        }
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
