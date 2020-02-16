module.exports = {
  LogType: {
    INFO: 'info',
    ERROR: 'error',
    DEBUG: 'debug'
  },
  log(logType, ...message) {
    console[logType](`[${logType.toUpperCase()}]`, ...message);
  }
};