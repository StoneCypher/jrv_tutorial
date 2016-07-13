
class JRV { // reactive node

    constructor(comp = (() => true), onchange = (() => true)) {
        this.comp           = comp;
        this.change_handler = onchange;
        this.callbacks      = [];
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

    onchange(newOnChange) {
        this.change_handler = newOnChange;
        return this;
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

        var isFunc   = (typeof this.comp === 'function'),
            oldValue = this.value;

        this.value = (isFunc? this.comp() : this.comp);

        if (this.value !== oldValue) {
            this.change_handler(this.value, oldValue);
        }

        return this.value;

    }

}
