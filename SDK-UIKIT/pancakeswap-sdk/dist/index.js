/* eslint-disable import/extensions */



if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./sdk.cjs.production.min.js')
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./sdk.cjs.development.js')
}
