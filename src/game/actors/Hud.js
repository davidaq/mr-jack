import { Container } from 'pixi.js';
import Rect from './Rect';
import BottomHud from './BottomHud';
import TopHud from './TopHud';
import HudPosition from '@/game/behaviours/HudPosition';

class Hud extends Container {
    constructor (director) {
        super();

        const bottom = new BottomHud(director);
        this.addChild(bottom);

        const top = new TopHud(director);
        this.addChild(top);

        director.installBehaviour(new HudPosition(top, bottom));
    }
}

export default Hud;
