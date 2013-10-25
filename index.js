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
  var reset = document.createElement('a');
  var close = document.createElement('a');
  close.className = 'close';
  reset.className = 'reset';
  close.innerText = '×';
  reset.innerText = 'reset';
  close.href = 'javascript:;';
  reset.href = 'javascript:;';
  close.onclick = function() {
    document.body.removeChild(ui);
    return false;
  }
  reset.onclick = function() {
    feature.reset();
    return false;
  }

  ui.appendChild(reset);
  ui.appendChild(close);
  ui.className = 'feature-ui';
  ui.appendChild(ul);

  function createItem(item) {
    var li = document.createElement('li');
    var label = document.createElement('label');
    var span = document.createElement('span');
    span.innerText = item;
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = feature(item);
    checkbox.onchange = function() {
      feature(item) ? feature.disable(item) : feature.enable(item);
    };
    feature.watch(item, function(enabled) {
      checkbox.checked = enabled;
    });
    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  }

  document.body.appendChild(ui);
};
