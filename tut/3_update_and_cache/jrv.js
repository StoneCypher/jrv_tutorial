
class JRV { // reactive node

    constructor(comp) {
        this.comp      = comp;
        this.callbacks = [];
        this.update();
    }

    should_notify(cb) {
        this.callbacks = this.callbacks.concat(cb);
    }

    needs(Dep) {
        if (Array.isArray(Dep)) { Dep.map(d => d.should_notify(this.make_notifier())); }
        else                    { Dep.should_notify(this.make_notifier()); }
        return this;
    }

    make_notifier() {
        return (() => this.update());
    }

    set v(newComp) {
        this.comp = newComp;
        this.update();
        this.callbacks.map(cb => cb());
    }

    get v() {
        return this.value;
    }

    update() {
        var isFunc        = (typeof this.comp === 'function');
        return this.value = (isFunc? this.comp() : this.comp);
    }

}
