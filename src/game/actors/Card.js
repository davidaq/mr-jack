import { Container, Sprite } from 'pixi.js';
import Rect from './Rect';
import p1Texture from '@/assets/logo.png';

class Card extends Container {
    constructor (director, options) {
        super();
        const bg = new Rect(90, 120, 0xffffff);
        this.addChild(bg);

        const portait = new Sprite(director.loader.resources[p1Texture].texture);
        portait.width = 80;
        portait.height = 80;
        portait.x = 5;
        portait.y = 5;
        this.addChild(portait);
    }
}

export default Card;
