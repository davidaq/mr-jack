import { Container } from 'pixi.js';
import Rect from './Rect';
import CardHud from './CardHud';

class Hud extends Container {
    constructor (director) {
        super();
        this.cardsHud = new CardHud(director);
        this.addChild(this.cardsHud);
    }
}

export default Hud;
