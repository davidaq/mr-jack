import { Point } from 'pixi.js';

class HudPosition {
    constructor (topHud, bottomHud) {
        this.cw = 0;
        this.ch = 0;
        this.topHud = topHud;
        this.bottomHud = bottomHud;
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
            const scale = this.cw / this.bottomHud.w;
            this.bottomHud.scale = new Point(scale, scale);
            this.bottomHud.x = 0;
            this.bottomHud.y = this.ch - this.bottomHud.h * scale;
            this.topHud.scale = new Point(scale, scale);
        } else {
            this.bottomHud.scale = new Point(1, 1);
            this.bottomHud.x = (this.cw - this.bottomHud.w) / 2;
            this.bottomHud.y = this.ch - this.bottomHud.h - 30;
            this.topHud.scale = new Point(1, 1);
            this.topHud.bg.scale = new Point(this.cw / this.topHud.w, 1);
        }
    }
}

export default HudPosition;
