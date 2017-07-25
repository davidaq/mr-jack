import { Container } from 'pixi.js';
import Board from './Board';
import Rect from './Rect';
import Hud from './hud/Hud';
import OpacityFadeOut from '@/game/behaviours/OpacityFadeOut';

class Root extends Container {
    constructor (director) {
        super();

        this.addChild(new Board(director));
        this.addChild(new Hud(director));

        const fader = new Rect(window.innerWidth, window.innerHeight);
        this.addChild(fader);
        director.installBehaviour(new OpacityFadeOut(fader, 0.5, true));
    }
}

export default Root;
