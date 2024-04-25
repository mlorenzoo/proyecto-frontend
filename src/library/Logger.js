export default class {

    static enabled = process.env.APP_DEBUG &&
        process.env.APP_ENV &&
        process.env.APP_ENV != 'production'
    
    static log(msg) {
        if (this.enabled) {
            console.log(msg)
        }
    }
    
    static debug(msg) {
        if (this.enabled) {
            console.debug(msg)
        }
    }

    static info(msg) {
        if (this.enabled) {
            console.info(msg)
        }
    }

    static warn(msg) {
        if (this.enabled) {
            console.warn(msg)
        }
    }
    
    static error(msg) {
        if (this.enabled) {
            console.error(msg)
        }
    }
}