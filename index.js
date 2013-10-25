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
      res.body.forEach(createItem);
    });


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
      console.log(item, feature(item));
      if (feature(item)) return feature.disable(item);
      feature.enable(item);
    };
    li.appendChild(checkbox);
    li.appendChild(span);
    ul.appendChild(li);
  }

  document.body.appendChild(ui);

};

