
class JRV { // js reactive variable

    constructor(comp) { this.comp = comp; }
    get v()           { return this.comp() }

}
