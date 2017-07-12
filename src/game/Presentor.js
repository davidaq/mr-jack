import { Container, loaders, Sprite } from 'pixi.js';
import { Terain } from './constants';
import seaTexture from '@/assets/white-hex.png';

class Presentor {
    constructor (state) {
        this.loader = new loaders.Loader();
        this.gameState = state;
        this.isDraging = false;
        this.dragAdjust = false;
    }
    load (callback) {
        this.loader.add(seaTexture);
        this.loader.load(() => {
            this.setupScene();
            callback();
        });
    }
    setupScene () {
        this.root = new Container();

        this.board = new Container();
        this.board.interactive = true;
        this.root.addChild(this.board);

        this.boardPresentWidth = this.gameState.board.width * 60;
        this.boardPresentHeight = this.gameState.board.width * 70 + 35;

        this.gameState.board.terain.forEach((v, index) => {
            let hex;
            if (v === Terain.OpenSpace) {
                hex = new Sprite(this.loader.resources[seaTexture].texture);
                hex.alpha = 0.5;
            }
            if (hex) {
                const [x, y] = this.gameState.board.index2coord(index);
                hex.x = x * 60;
                hex.y = y * 70;
                if (x & 1) {
                    hex.y += 35;
                }
                this.board.addChild(hex);
            }
        });
        this.board.x = (window.innerWidth - this.boardPresentWidth) / 2;
        this.board.y = (window.innerHeight - this.boardPresentHeight) / 2;

        let boardDrag = false;
        this.board.touchstart = (evt) => {
            boardDrag = {
                mx: evt.data.global.x,
                my: evt.data.global.y,
                x: this.board.x,
                y: this.board.y,
            };
        };
        this.board.touchmove = (evt) => {
            if (this.isDraging) {
                this.isDraging = true;
                this.board.x = boardDrag.x + evt.data.global.x - boardDrag.mx;
                this.board.y = boardDrag.y + evt.data.global.y - boardDrag.my;
            } else if (boardDrag) {
                this.dragAdjust = false;
                if (Math.abs(evt.data.global.x - boardDrag.mx) > 10 || Math.abs(evt.data.global.y - boardDrag.my) > 10) {
                    this.isDraging = true;
                }
            }
        };
        this.board.touchend = (evt) => {
            boardDrag = false;
            if (this.isDraging) {
                this.isDraging = false;
                this.dragAdjust = false;
                let adjustX = this.board.x;
                let adjustY = this.board.y;
                if (this.board.x + this.boardPresentWidth < window.innerWidth / 2) {
                    this.dragAdjust = true;
                    adjustX = window.innerWidth / 2 - this.boardPresentWidth;
                } else if (this.board.x > window.innerWidth / 2) {
                    this.dragAdjust = true;
                    adjustX = window.innerWidth / 2;
                }
                if (this.board.y + this.boardPresentHeight < window.innerHeight / 2) {
                    this.dragAdjust = true;
                    adjustY = window.innerHeight / 2 - this.boardPresentHeight;
                } else if (this.board.y > window.innerHeight / 2) {
                    this.dragAdjust = true;
                    adjustY = window.innerHeight / 2;
                }
                if (this.dragAdjust) {
                    this.dragAdjust = {
                        x: adjustX,
                        y: adjustY,
                    };
                }
            }
        };
    }
    update (state, elapse) {
        if (this.dragAdjust) {
            this.board.x = (this.board.x + this.dragAdjust.x) / 2;
            this.board.y = (this.board.y + this.dragAdjust.y) / 2;
            if (Math.abs(this.board.x + this.dragAdjust.x) < 2 && Math.abs(this.board.y + this.dragAdjust.y) < 2) {
                this.board.x = this.dragAdjust.x;
                this.board.y = this.dragAdjust.y;
                this.dragAdjust = false;
            }
        }
    }
}

export default Presentor;
