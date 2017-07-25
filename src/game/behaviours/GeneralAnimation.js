class GeneralAnimation {
    constructor (duration, steper, loop = 0) {
        this.duration = duration;
        this.steper = steper;
        this.loop = loop;
        this.elapse = 0;
        this.steper(0);
    }
    update (elapse) {
        this.elapse += elapse;
        if (this.elapse > this.duration) {
            this.steper(1);
            if (!this.loop) {
                this.uninstall();
            } else {
                this.elapse = -elapse;
                if (this.loop > 0) {
                    this.loop--;
                }
            }
        } else {
            this.steper(this.elapse / this.duration);
        }
    }
}

export default GeneralAnimation;
