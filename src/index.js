const React = require('react');
const Anser = require('anser');
const escapeCarriageReturn = require('escape-carriage');
const Linkify = require('react-linkify-part');

/**
 * ansiToJson
 * Convert ANSI strings into JSON output.
 *
 * @name ansiToJSON
 * @function
 * @param {String} input The input string.
 * @return {Array} The parsed input.
 */
function ansiToJSON(input) {
  input = escapeCarriageReturn(input);
  return Anser.ansiToJson(input, {
    json: true,
    remove_empty: true,
    use_classes: true
  });
}

function ansiJSONtoStyleBundle(ansiBundle) {
  let className = '';
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
  return props.linkifyProps ? 
  	React.createElement(Linkify.default || Linkify, props.linkifyProps, React.createElement('code', {}, ansiToInlineStyle(props.children).map(inlineBundleToReact))) : 
  	React.createElement('code', {}, ansiToInlineStyle(props.children).map(inlineBundleToReact));
}

Ansi.propTypes = {
  children: React.PropTypes.string,
};

module.exports = Ansi;
