import { Container, loaders } from 'pixi.js';
import seaTexture from '@/assets/white-hex.png';
import Board from './actors/Board';
import BoardDraging from './behaviours/BoardDraging';

class Presentor {
    constructor (state) {
        this.loader = new loaders.Loader();
        this.gameState = state;
        this.isDraging = false;
        this.dragAdjust = false;
        this.behaviours = [];
    }
    load (callback) {
        this.loader.add(seaTexture);
        this.loader.load(() => {
            this.setupScene();
            callback();
        });
    }
    setupScene () {
        this.root = new Container();

        this.board = new Board(this);
        this.root.addChild(this.board);

        this.installBehavior(new BoardDraging());
    }
    installBehavior (behaviour) {
        behaviour.install && behaviour.install(this);
        this.behaviours.push(behaviour);
    }
    uninstallBehaviour (behaviour) {
        const pos = this.behaviours.indexOf(behaviour);
        if (pos > -1) {
            this.behaviours.splice(pos, 1);
        }
        behaviour.uninstall && behaviour.uninstall();
    }
    update (elapse) {
        this.behaviours.forEach(item => item.update(elapse));
    }
}

export default Presentor;
