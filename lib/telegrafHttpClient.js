'use strict'

// const MetricsClient = require('./metricsClient').MetricsClient
// const influx = require('influx')
//
// class TelegrafHttpClient extends MetricsClient {
//
//   send (options) {
//     return function (message) {
//       var url = 'http://' + (options.host || 'localhost') + ':' + (options.port || 8186) + '/' + options.database
//       var InfluxClient = new influx.InfluxDB(url)
//       return InfluxClient.writePoints(message)
//         .then(function (results) {
//           console.log('Written points')
//         })
//         .catch(function (err) {
//           console.error('ERROR sending the metrics: ', (err.error || err))
//         })
//     }
//   }
// }
//
// module.exports = {
//   TelegrafHttpClient
// }

const _ = require('lodash')
const influx = require('influx')

var TelegrafHttpClient = function (options) {
  var self = this
  self.client = new influx.InfluxDB('http://' + (options.host || 'localhost') + ':' + (options.port || 8186) + '/' + options.database)
}

TelegrafHttpClient.prototype.send = function (metrics) {
  var self = this
  return self.client.writePoints(metrics)
        .then(function (results) {
          console.log('Written points')
        })
        .catch(function (err) {
          console.error('ERROR sending the metrics: ', (err.error || err))
        })
}

TelegrafHttpClient.prototype.close = function () {
  return _.noop()
}

module.exports = TelegrafHttpClient