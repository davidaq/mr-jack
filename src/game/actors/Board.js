import { Container, Graphics, Sprite } from 'pixi.js';
import { Terain } from '@/game/constants';
import seaTexture from '@/assets/white-hex.png';

class Board extends Container {
    constructor (presentor) {
        super();
        const { gameState, loader } = presentor;
        this.interactive = true;
        const bgSprite = new Graphics();
        bgSprite.beginFill(0xFF00);
        bgSprite.alpha = 0;
        const boardPresentWidth = gameState.board.width * 60;
        const boardPresentHeight = gameState.board.height * 70 + 35;
        bgSprite.drawRect(-boardPresentWidth / 2, -boardPresentHeight / 2, boardPresentWidth * 2, boardPresentHeight * 2);
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
    }
}

export default Board;
