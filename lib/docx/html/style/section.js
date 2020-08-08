'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function (_Style$Properties) {
  (0, _inherits3.default)(Section, _Style$Properties);

  function Section() {
    (0, _classCallCheck3.default)(this, Section);
    return (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));
  }

  (0, _createClass3.default)(Section, [{
    key: 'size',
    value: function size(x) {
      this.style.width = x.width + 'px';
      this.style.minHeight = x.height + 'px';
    }
  }, {
    key: 'margin',
    value: function margin(x) {
      this.style.paddingLeft = x.left + 'px';
      this.style.paddingRight = x.right + 'px';
      this.style.paddingTop = x.top + 'px';
      this.style.paddingBottom = x.bottom + 'px';

      x.gutter && (this.style['padding' + (x.gutterAtRight ? 'Right' : 'Left')] = x[x.gutterAtRight ? 'right' : 'left'] + x.gutter + 'px');
    }
  }, {
    key: 'cols',
    value: function cols(x) {
      this.styless('column-count', x.num);
      x.space && this.styless('column-gap', x.space + 'px');
      x.sep && this.styless('column-rule', '1px solid black');
    }
  }]);
  return Section;
}(_converter2.default.Properties);

exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN0aW9uIiwieCIsInN0eWxlIiwid2lkdGgiLCJtaW5IZWlnaHQiLCJoZWlnaHQiLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBhZGRpbmdUb3AiLCJ0b3AiLCJwYWRkaW5nQm90dG9tIiwiYm90dG9tIiwiZ3V0dGVyIiwiZ3V0dGVyQXRSaWdodCIsInN0eWxlc3MiLCJudW0iLCJzcGFjZSIsInNlcCIsIlN0eWxlIiwiUHJvcGVydGllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O3lCQUNkQyxDLEVBQUc7QUFDTixXQUFLQyxLQUFMLENBQVdDLEtBQVgsR0FBc0JGLEVBQUVFLEtBQXhCO0FBQ0EsV0FBS0QsS0FBTCxDQUFXRSxTQUFYLEdBQTBCSCxFQUFFSSxNQUE1QjtBQUNEOzs7MkJBRU1KLEMsRUFBRztBQUNSLFdBQUtDLEtBQUwsQ0FBV0ksV0FBWCxHQUE0QkwsRUFBRU0sSUFBOUI7QUFDQSxXQUFLTCxLQUFMLENBQVdNLFlBQVgsR0FBNkJQLEVBQUVRLEtBQS9CO0FBQ0EsV0FBS1AsS0FBTCxDQUFXUSxVQUFYLEdBQTJCVCxFQUFFVSxHQUE3QjtBQUNBLFdBQUtULEtBQUwsQ0FBV1UsYUFBWCxHQUE4QlgsRUFBRVksTUFBaEM7O0FBRUFaLFFBQUVhLE1BQUYsS0FBYSxLQUFLWixLQUFMLGNBQXFCRCxFQUFFYyxhQUFGLEdBQWtCLE9BQWxCLEdBQTRCLE1BQWpELEtBQWdFZCxFQUFHQSxFQUFFYyxhQUFGLEdBQWtCLE9BQWxCLEdBQTRCLE1BQS9CLElBQTBDZCxFQUFFYSxNQUE1RyxPQUFiO0FBQ0Q7Ozt5QkFFSWIsQyxFQUFHO0FBQ04sV0FBS2UsT0FBTCxDQUFhLGNBQWIsRUFBNkJmLEVBQUVnQixHQUEvQjtBQUNBaEIsUUFBRWlCLEtBQUYsSUFBVyxLQUFLRixPQUFMLENBQWEsWUFBYixFQUE4QmYsRUFBRWlCLEtBQWhDLFFBQVg7QUFDQWpCLFFBQUVrQixHQUFGLElBQVMsS0FBS0gsT0FBTCxDQUFhLGFBQWIsRUFBNEIsaUJBQTVCLENBQVQ7QUFDRDs7O0VBbkJrQ0ksb0JBQU1DLFU7O2tCQUF0QnJCLE8iLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVzIHtcbiAgc2l6ZSh4KSB7XG4gICAgdGhpcy5zdHlsZS53aWR0aCA9IGAke3gud2lkdGh9cHhgO1xuICAgIHRoaXMuc3R5bGUubWluSGVpZ2h0ID0gYCR7eC5oZWlnaHR9cHhgO1xuICB9XG5cbiAgbWFyZ2luKHgpIHtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0ID0gYCR7eC5sZWZ0fXB4YDtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3gucmlnaHR9cHhgO1xuICAgIHRoaXMuc3R5bGUucGFkZGluZ1RvcCA9IGAke3gudG9wfXB4YDtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBgJHt4LmJvdHRvbX1weGA7XG5cbiAgICB4Lmd1dHRlciAmJiAodGhpcy5zdHlsZVtgcGFkZGluZyR7eC5ndXR0ZXJBdFJpZ2h0ID8gJ1JpZ2h0JyA6ICdMZWZ0J31gXSA9IGAke3hbKHguZ3V0dGVyQXRSaWdodCA/ICdyaWdodCcgOiAnbGVmdCcpXSArIHguZ3V0dGVyfXB4YCk7XG4gIH1cblxuICBjb2xzKHgpIHtcbiAgICB0aGlzLnN0eWxlc3MoJ2NvbHVtbi1jb3VudCcsIHgubnVtKTtcbiAgICB4LnNwYWNlICYmIHRoaXMuc3R5bGVzcygnY29sdW1uLWdhcCcsIGAke3guc3BhY2V9cHhgKTtcbiAgICB4LnNlcCAmJiB0aGlzLnN0eWxlc3MoJ2NvbHVtbi1ydWxlJywgJzFweCBzb2xpZCBibGFjaycpO1xuICB9XG59XG4iXX0=