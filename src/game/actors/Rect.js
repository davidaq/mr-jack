import { Graphics } from 'pixi.js';

class Rect extends Graphics {
    constructor (width, height, color = 0x0) {
        super();
        this.beginFill(color);
        this.drawRect(0, 0, width, height);
        this.endFill();
    }
}

export default Rect;
