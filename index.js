/**
 * Module dependencies
 */

var superagent = require('superagent');
var feature = require('feature');
var console = require('console');

/**
 * Start the feature-ui
 *
 * Options
 *   - query: defaults to 'features'
 *   - url: defaults to '/features.json'
 *
 * @param {Object} options
 */

module.exports = function(options) {
  options = options || {};

  var query = options.query || 'features';
  var url = options.url || '/features.json';

  if (!~(window.location.search || '').indexOf('?' + query)) return;

  superagent
    .get(url)
    .on('error', onerror)
    .end(function(res) {
      if ('testing', arguments);
      if (!res.ok) return onerror(new Error(res.text));
      res.body.forEach(createItem);
    });

  function onerror(err) {
    console.error(err);
  }

  var ul = document.createElement('ul');
  var ui = document.createElement('div');
  ui.className = 'feature-ui';
  ui.appendChild(ul);

  function createItem(item) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.innerText = item;
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = feature(item);
    checkbox.onchange = function() {
      feature(item) ? feature.disable(item) : feature.enable(item);
    };
    li.appendChild(checkbox);
    li.appendChild(span);
    ul.appendChild(li);
  }

  document.body.appendChild(ui);
};
