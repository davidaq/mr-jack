
class BoardDraging {
    constructor (boardActor) {
        this.boardActor = boardActor;

        this.touchstart = this.touchstart.bind(this);
        this.touchend = this.touchend.bind(this);
        this.touchmove = this.touchmove.bind(this);
    }
    onInstall () {
        this.boardActor.x = (window.innerWidth - this.boardActor.boardPresentWidth) / 2;
        this.boardActor.y = (window.innerHeight - this.boardActor.boardPresentHeight) / 2;

        this.boardDrag = false;

        this.boardActor.touchstart = this.touchstart;
        this.boardActor.touchmove = this.touchmove;
        this.boardActor.touchend = this.touchend;

        this.boardActor.mousedown = this.touchstart;
        this.boardActor.mousemove = this.touchmove;
        this.boardActor.mouseup = this.touchend;

        this.drags = [];
    }
    touchstart (evt) {
        this.boardDrag = {
            mx: evt.data.global.x,
            my: evt.data.global.y,
            x: this.boardActor.x,
            y: this.boardActor.y,
        };
        if (this.dragAdjust) {
            this.dragAdjust = false;
            this.isDraging = true;
            this.drags.length = 0;
        }
    }
    touchmove (evt) {
        if (this.isDraging) {
            this.boardActor.x = this.boardDrag.x + evt.data.global.x - this.boardDrag.mx;
            this.boardActor.y = this.boardDrag.y + evt.data.global.y - this.boardDrag.my;
            this.drags.push([this.boardActor.x, this.boardActor.y, now()]);
            if (this.drags.length > 5) {
                this.drags.shift();
            }
            evt.data.originalEvent.preventDefault();
            evt.data.originalEvent.stopPropagation();
        } else if (this.boardDrag) {
            this.dragAdjust = false;
            if (Math.abs(evt.data.global.x - this.boardDrag.mx) > 10 || Math.abs(evt.data.global.y - this.boardDrag.my) > 10) {
                this.isDraging = true;
            }
        }
    }
    touchend (evt) {
        this.boardDrag = false;
        if (this.isDraging) {
            this.isDraging = false;
            this.dragAdjust = false;
            let adjustX = this.boardActor.x;
            let adjustY = this.boardActor.y;

            if (this.drags.length >= 2) {
                const [sx, sy, st] = this.drags.shift();
                const [ex, ey, et] = this.drags.pop();
                const dt = (now() - st) / 1000;
                const vx = (ex - sx) / dt;
                const vy = (ey - sy) / dt;
                adjustX += vx * 0.3;
                adjustY += vy * 0.3;
            }

            if (adjustX + this.boardActor.boardPresentWidth < window.innerWidth / 2) {
                adjustX = window.innerWidth / 2 - this.boardActor.boardPresentWidth;
            } else if (adjustX > window.innerWidth / 2) {
                adjustX = window.innerWidth / 2;
            }
            if (adjustY + this.boardActor.boardPresentHeight < window.innerHeight / 2) {
                adjustY = window.innerHeight / 2 - this.boardActor.boardPresentHeight;
            } else if (adjustY > window.innerHeight / 2) {
                adjustY = window.innerHeight / 2;
            }
            this.dragAdjust = {
                total: 1,
                remain: 1,
                sx: this.boardActor.x,
                sy: this.boardActor.y,
                x: adjustX,
                y: adjustY,
            };
        }
    }
    update (elapse) {
        if (this.dragAdjust) {
            this.dragAdjust.remain -= elapse;
            if (this.dragAdjust.remain <= 0) {
                this.boardActor.x = this.dragAdjust.x;
                this.boardActor.y = this.dragAdjust.y;
                this.dragAdjust = false;
            } else {
                let revProg = this.dragAdjust.remain / this.dragAdjust.total;
                revProg = revProg * revProg * revProg;
                const prog = 1 - revProg;
                this.boardActor.x = this.dragAdjust.x * prog + this.dragAdjust.sx * revProg;
                this.boardActor.y = this.dragAdjust.y * prog + this.dragAdjust.sy * revProg;
            }
        }
    }
};

export default BoardDraging;
