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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _inline = require('./style/inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Span = function (_Converter) {
  (0, _inherits3.default)(Span, _Converter);

  function Span() {
    (0, _classCallCheck3.default)(this, Span);
    return (0, _possibleConstructorReturn3.default)(this, (Span.__proto__ || (0, _getPrototypeOf2.default)(Span)).apply(this, arguments));
  }

  (0, _createClass3.default)(Span, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Span.prototype.__proto__ || (0, _getPrototypeOf2.default)(Span.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new _inline2.default.Properties(el.style)]);
    }
  }, {
    key: '_shouldIgnore',
    value: function _shouldIgnore() {
      return this.wordModel.isWebHidden() || this.wordModel.isHidden();
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'span';
    }
  }]);
  return Span;
}(_converter2.default);

exports.default = Span;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3Bhbi5qcyJdLCJuYW1lcyI6WyJTcGFuIiwiZWwiLCJhcmd1bWVudHMiLCJzdHlsZSIsIndvcmRNb2RlbCIsImdldERpcmVjdFN0eWxlIiwicGFyc2UiLCJTdHlsZSIsIlByb3BlcnRpZXMiLCJpc1dlYkhpZGRlbiIsImlzSGlkZGVuIiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBSTtBQUNmLHNJQUFzQkMsU0FBdEI7QUFDQSxVQUFNQyxRQUFRLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFkO0FBQ0FGLGVBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUlDLGlCQUFNQyxVQUFWLENBQXFCUCxHQUFHRSxLQUF4QixDQUFELENBQVosQ0FBVDtBQUNEOzs7b0NBRWU7QUFDZCxhQUFPLEtBQUtDLFNBQUwsQ0FBZUssV0FBZixNQUFnQyxLQUFLTCxTQUFMLENBQWVNLFFBQWYsRUFBdkM7QUFDRDs7O3dCQVZTO0FBQUUsYUFBTyxNQUFQO0FBQWdCOzs7RUFESUMsbUI7O2tCQUFiWCxJIiwiZmlsZSI6InNwYW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2lubGluZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW4gZXh0ZW5kcyBDb252ZXJ0ZXIge1xuICBnZXQgdGFnKCkgeyByZXR1cm4gJ3NwYW4nOyB9XG5cbiAgY29udmVydFN0eWxlKGVsKSB7XG4gICAgc3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cyk7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpO1xuICAgIHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgU3R5bGUuUHJvcGVydGllcyhlbC5zdHlsZSldKTtcbiAgfVxuXG4gIF9zaG91bGRJZ25vcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZE1vZGVsLmlzV2ViSGlkZGVuKCkgfHwgdGhpcy53b3JkTW9kZWwuaXNIaWRkZW4oKTtcbiAgfVxufVxuIl19