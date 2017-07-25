
class StateWatcher {
    constructor (resolver, cb, throttle = 0.3) {
        this.resolver = resolver;
        this.cached = [];
        this.cb = cb;
        this.throttle = throttle;
        this.accum = throttle;
    }
    update (elapse) {
        this.accum += elapse;
        if (this.accum >= this.throttle) {
            this.accum = 0;
            const values = this.resolver(this.director.gameState);
            let changed = false;
            for (let i = 0; i < values.length; i++) {
                if (this.cached[i] !== values[i]) {
                    changed = true;
                    break;
                }
            }
            if (changed) {
                this.cb(...values, this);
                this.cached = values;
            }
        }
    }
}

export default StateWatcher;
