export default class Logger {
  constructor (options) {
    this.isDebug = false

    /**
     * @description Logs message to console.
     * @param {*} payload - Payload
     **/
    this.debug = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      console.log && console.log(log)
    }

    /**
     * @description Logs error message to console.
     * @param {*} payload - Payload
     **/
    this.error = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      console.error && console.error(log)
    }

    /**
     * @description Logs warning message to console.
     * @param {*} payload - Payload
     **/
    this.warn = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      console.warn && console.warn(log)
    }

    /**
     * @description Logs info message to console.
     * @param {*} payload - Payload
     **/
    this.info = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      console.info && console.info(log)
    }

    /**
     * @description Logs success message to console.
     * @param {*} payload - Payload
     **/
    this.success = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      console.info && console.info(log)
    }
    this.isDebug = options.debug
  }
}
