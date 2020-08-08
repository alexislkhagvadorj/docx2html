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

var _section = require('./style/section');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function (_Converter) {
  (0, _inherits3.default)(Section, _Converter);

  function Section() {
    (0, _classCallCheck3.default)(this, Section);
    return (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));
  }

  (0, _createClass3.default)(Section, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      this.doc.section = el;
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new _section2.default(el.style)]);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'section';
    }
  }]);
  return Section;
}(_converter2.default);

exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN0aW9uIiwiZWwiLCJkb2MiLCJzZWN0aW9uIiwic3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXREaXJlY3RTdHlsZSIsInBhcnNlIiwiU3R5bGUiLCJDb252ZXJ0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O2lDQUdOQyxFLEVBQUk7QUFDZixXQUFLQyxHQUFMLENBQVNDLE9BQVQsR0FBbUJGLEVBQW5CO0FBQ0EsVUFBTUcsUUFBUSxLQUFLQyxTQUFMLENBQWVDLGNBQWYsRUFBZDtBQUNBRixlQUFTQSxNQUFNRyxLQUFOLENBQVksQ0FBQyxJQUFJQyxpQkFBSixDQUFVUCxHQUFHRyxLQUFiLENBQUQsQ0FBWixDQUFUO0FBQ0Q7Ozt3QkFOUztBQUFFLGFBQU8sU0FBUDtBQUFtQjs7O0VBRElLLG1COztrQkFBaEJULE8iLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInO1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvc2VjdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBDb252ZXJ0ZXIge1xuICBnZXQgdGFnKCkgeyByZXR1cm4gJ3NlY3Rpb24nOyB9XG5cbiAgY29udmVydFN0eWxlKGVsKSB7XG4gICAgdGhpcy5kb2Muc2VjdGlvbiA9IGVsO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKTtcbiAgICBzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IFN0eWxlKGVsLnN0eWxlKV0pO1xuICB9XG59XG4iXX0=