import { Container, Sprite } from 'pixi.js';
import Rect from './Rect';

class Card extends Container {
    constructor (director, options) {
        super();
        const bg = new Sprite(director.texture("cardBg"));
        bg.width = 90;
        bg.height = 120;
        this.addChild(bg);

        const portait = new Sprite(director.texture("hourglass"));
        portait.width = 60;
        portait.height = 60;
        portait.x = 15;
        portait.y = 15;
        this.addChild(portait);
    }
}

export default Card;
