import { Container, Graphics, Sprite } from 'pixi.js';
import { Terain } from '@/game/constants';
import Rect from './Rect';
import BoardDraging from '@/game/behaviours/BoardDraging';
import seaTexture from '@/assets/white-hex.png';

class Board extends Container {
    constructor (director) {
        super();
        const { gameState, loader } = director;
        this.interactive = true;
        this.boardPresentWidth = gameState.board.width * 60;
        this.boardPresentHeight = gameState.board.height * 70 + 35;
        const bgSprite = new Rect(this.boardPresentWidth * 3, this.boardPresentHeight * 3, 0x25);
        bgSprite.alpha = 1;
        bgSprite.x = -this.boardPresentWidth;
        bgSprite.y = -this.boardPresentHeight;
        this.addChild(bgSprite);
        gameState.board.terain.forEach((v, index) => {
            let hex;
            if (v === Terain.OpenSpace) {
                hex = new Sprite(loader.resources[seaTexture].texture);
                hex.alpha = 0.5;
            }
            if (hex) {
                const [x, y] = gameState.board.index2coord(index);
                hex.x = x * 60;
                hex.y = y * 70;
                if (x & 1) {
                    hex.y += 35;
                }
                this.addChild(hex);
            }
        });

        director.installBehaviour(new BoardDraging(this));
    }
}

export default Board;
