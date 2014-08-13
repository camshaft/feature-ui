/**
 * Module dependencies
 */

var feature = require('feature');
var each = require('each');
var Draggy;

try {
  Draggy = require('draggy');
} catch (e) {}


/**
 * Start the feature-ui
 *
 * Options
 *   - query: defaults to 'features'
 *
 * @param {Object} options
 */

exports = module.exports = function(options) {
  options = options || {};
  var query = options.query || 'features';
  if (!~(window.location.search || '').indexOf('?' + query)) return;
};

exports.open = function() {
  var ui = document.createElement('div');
  var ul = document.createElement('ul');

  function createAnchor(className, text, click) {
    var el = document.createElement('a');
    el.className = className;
    el.innerText = text;
    el.href = 'javascript:;';
    el.onclick = click;
    ui.appendChild(el);
  }

  createAnchor('reset', 'reset', function() {
    feature.reset();
    return false;
  });

  createAnchor('action close', '×', function() {
    document.body.removeChild(ui);
    return false;
  });

  createAnchor('action minimize', '_', function() {
    ui.className = ui.className === 'minimized' ? '' : 'minimized';
    return false;
  });

  ui.id = 'feature-ui';
  ui.appendChild(ul);

  document.body.appendChild(ui);
  if (Draggy) new Draggy(ui);

  var unsub = feature.watchList(function(features) {
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.lastChild);
    }
    each(features, createItem);
  });

  function createItem(item) {
    var li = document.createElement('li');
    var label = document.createElement('label');
    var span = document.createElement('span');
    span.innerText = item;
    var checkbox = document.createElement('input');
    var val = feature(item);
    var opts = feature.options(item);
    if (typeof opts[0] === 'boolean') label.appendChild(createCheckbox(item, val));
    else label.appendChild(createSelect(item, val, opts));
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  }

  function createCheckbox (item, value) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = value;
    checkbox.onchange = function() {
      checkbox.checked ? feature.enable(item) : feature.enable(item);
    };
    return checkbox;
  }

  function createSelect (item, value, opts) {
    var select = document.createElement('select');
    select.onchange = function() {
      feature.set(item, select.value);
    };
    for (var i = 0; i < opts.length; i++) {
      var opt = document.createElement('option');
      opt.value = opts[i];
      opt.innerHTML = opts[i];
      if (opts[i] == value) opt.selected = 'selected';
      select.appendChild(opt);
    }
    return select;
  }
};

exports.feature = feature;
