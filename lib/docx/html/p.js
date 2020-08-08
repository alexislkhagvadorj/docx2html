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

var _paragraph = require('./style/paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = function (_Converter) {
  (0, _inherits3.default)(Paragraph, _Converter);

  function Paragraph() {
    (0, _classCallCheck3.default)(this, Paragraph);
    return (0, _possibleConstructorReturn3.default)(this, (Paragraph.__proto__ || (0, _getPrototypeOf2.default)(Paragraph)).apply(this, arguments));
  }

  (0, _createClass3.default)(Paragraph, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new _paragraph2.default.Properties(el.style)]);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'p';
    }
  }]);
  return Paragraph;
}(_converter2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvcC5qcyJdLCJuYW1lcyI6WyJQYXJhZ3JhcGgiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsIlN0eWxlIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7O2lDQUdOQyxFLEVBQUk7QUFDZixnSkFBc0JDLFNBQXRCO0FBQ0EsVUFBTUMsUUFBUSxLQUFLQyxTQUFMLENBQWVDLGNBQWYsRUFBZDtBQUNBRixlQUFTQSxNQUFNRyxLQUFOLENBQVksQ0FBQyxJQUFJQyxvQkFBTUMsVUFBVixDQUFxQlAsR0FBR0UsS0FBeEIsQ0FBRCxDQUFaLENBQVQ7QUFDRDs7O3dCQU5TO0FBQUUsYUFBTyxHQUFQO0FBQWE7OztFQURZTSxtQjs7a0JBQWxCVCxTIiwiZmlsZSI6InAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL3BhcmFncmFwaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIENvbnZlcnRlciB7XG4gIGdldCB0YWcoKSB7IHJldHVybiAncCc7IH1cblxuICBjb252ZXJ0U3R5bGUoZWwpIHtcbiAgICBzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKCk7XG4gICAgc3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyBTdHlsZS5Qcm9wZXJ0aWVzKGVsLnN0eWxlKV0pO1xuICB9XG59XG4iXX0=