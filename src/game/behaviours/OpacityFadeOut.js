
class OpacityFadeOut {
    constructor (actor, duration, shouldRemove) {
        this.actor = actor;
        this.duration = duration;
        this.shouldRemove = shouldRemove;
        this.elapsed = 0;
    }
    onInstall () {
        this.elapsed = 0;
    }
    update (elapsed) {
        this.elapsed += elapsed;
        if (this.elapsed >= this.duration) {
            this.actor.visible = false;
            if (this.shouldRemove) {
                this.actor.parent.removeChild(this.actor);
            }
            this.uninstall();
        } else {
            this.actor.alpha = 1 - this.elapsed / this.duration;
        }
    }
}

export default OpacityFadeOut;
