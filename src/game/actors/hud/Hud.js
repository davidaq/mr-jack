import { Container } from 'pixi.js';
import BottomHud from './BottomHud';
import TopHud from './TopHud';
import Alert from './Alert';
import HudPosition from '@/game/behaviours/HudPosition';

class Hud extends Container {
    constructor (director) {
        super();

        const bottom = new BottomHud(director);
        this.addChild(bottom);

        const top = new TopHud(director);
        this.addChild(top);

        const alert = new Alert(director);
        this.addChild(alert);

        director.installBehaviour(new HudPosition(top, bottom, alert));
    }
}

export default Hud;
