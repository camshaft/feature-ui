/**
 * Module dependencies
 */

var superagent = require('superagent');
var feature = require('feature');

module.exports = function(options) {
  options = options || {};

  var query = options.query || 'features';
  var url = options.url || '/features.json';

  if (!~(window.location.search || '').indexOf('?' + query)) return;

  superagent
    .get(url)
    .end(function(err, res) {
      if (err) return console.error(err);
      if (!res.ok) return console.error(new Error(res.text));

      // TODO do something with the features list
      var featureListing = res.body.map(function(name) {
        return {name: name, enabled: feature(name)};
      });
    });
};
