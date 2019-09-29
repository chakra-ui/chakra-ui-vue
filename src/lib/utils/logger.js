import consola from 'consola'

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
      consola.log(log)
    }

    /**
     * @description Logs error message to console.
     * @param {*} payload - Payload
     **/
    this.error = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      consola.error(log)
    }

    /**
     * @description Logs warning message to console.
     * @param {*} payload - Payload
     **/
    this.warn = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      consola.warn(log)
    }

    /**
     * @description Logs info message to console.
     * @param {*} payload - Payload
     **/
    this.info = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      consola.info(log)
    }

    /**
     * @description Logs success message to console.
     * @param {*} payload - Payload
     **/
    this.success = (...payload) => {
      const log = payload.length > 1
        ? payload
        : payload[0]
      consola.success(log)
    }
    this.isDebug = options.debug
  }
}
