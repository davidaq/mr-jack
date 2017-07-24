
class OpacityFadeIn {
    constructor (actor, duration) {
        this.actor = actor;
        this.duration = duration;
        this.elapsed = 0;
        this.actor.alpha = 0;
    }
    onInstall () {
        this.elapsed = 0;
    }
    update (elapsed) {
        this.elapsed += elapsed;
        if (this.elapsed >= this.duration) {
            this.actor.alpha = 1;
        } else {
            this.actor.alpha = this.elapsed / this.duration;
        }
    }
}

export default OpacityFadeIn;
