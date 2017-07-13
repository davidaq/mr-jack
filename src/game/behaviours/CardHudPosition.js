import { Point } from 'pixi.js';

class CardHudPosition {
    constructor (cardHud) {
        this.cw = 0;
        this.ch = 0;
        this.cardHud = cardHud;
        this.needUpdate = false;
    }
    update (elapse) {
        if (this.needUpdate) {
            this.needUpdate = false;
            this.calcPos();
        } else if (this.cw !== window.innerWidth || this.ch !== window.innerHeight) {
            this.needUpdate = true;
            this.calcPos();
        }
    }
    calcPos () {
        this.cw = window.innerWidth;
        this.ch = window.innerHeight;
        if (this.cw / this.ch < 0.65) {
            const scale = this.cw / this.cardHud.w;
            this.cardHud.scale = new Point(scale, scale);
            this.cardHud.x = 0;
            this.cardHud.y = this.ch - this.cardHud.h * scale;
        } else {
            this.cardHud.x = (this.cw - this.cardHud.w) / 2;
            this.cardHud.y = this.ch - this.cardHud.h - 30;
        }
    }
}

export default CardHudPosition;
