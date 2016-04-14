var React = require('react');
var AnsiUp = require('ansi_up');
 
var ansiToJSON = function(input) {
  return AnsiUp.ansi_to_json(input, {
    json: true,
    remove_empty: true,
    use_classes: true
  });
} 

var ansiJSONtoStyleBundle = function(ansiBundle) {
  var className = '';
  if (ansiBundle.bg) {
    className = ansiBundle.bg + '-bg';
  }
  if (ansiBundle.fg) {
    className += (className ? ' ' : '') + ansiBundle.fg + '-fg';
  }
  return {
    content: ansiBundle.content,
    className: className
  };
}

var ansiToInlineStyle = function(text) {
  return ansiToJSON(text).map(ansiJSONtoStyleBundle);
}

var inlineBundleToReact = function(bundle, key) {
  return React.createElement('span', {
    className: bundle.className,
    key: key
  }, bundle.content);
}

function Ansi(props) {
  return React.createElement(
    'code',
    {},
    ansiToInlineStyle(props.children).map(inlineBundleToReact));
}

Ansi.propTypes = {
  children: React.PropTypes.string,
};

module.exports = Ansi;
