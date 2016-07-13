class JRV {

    constructor(comp) { this.comp = comp; }
    set v(newComp)    { this.comp = newComp; }

    get v() {
        var isFunc = (typeof this.comp === 'function');
        return isFunc? this.comp() : this.comp;
    }

}
