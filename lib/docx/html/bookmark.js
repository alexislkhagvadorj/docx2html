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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bookmark = function (_Converter) {
  (0, _inherits3.default)(Bookmark, _Converter);

  function Bookmark() {
    (0, _classCallCheck3.default)(this, Bookmark);
    return (0, _possibleConstructorReturn3.default)(this, (Bookmark.__proto__ || (0, _getPrototypeOf2.default)(Bookmark)).apply(this, arguments));
  }

  (0, _createClass3.default)(Bookmark, [{
    key: 'convert',
    value: function convert() {
      if (this.parent.content.childNodes.length == 0 && !this.parent.content.id) {
        this.parent.content.id = this.wordModel.getName();
      } else {
        (0, _get3.default)(Bookmark.prototype.__proto__ || (0, _getPrototypeOf2.default)(Bookmark.prototype), 'convert', this).apply(this, arguments);
        this.content.id = this.wordModel.getName();
      }
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'i';
    }
  }]);
  return Bookmark;
}(_converter2.default);

exports.default = Bookmark;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvYm9va21hcmsuanMiXSwibmFtZXMiOlsiQm9va21hcmsiLCJwYXJlbnQiLCJjb250ZW50IiwiY2hpbGROb2RlcyIsImxlbmd0aCIsImlkIiwid29yZE1vZGVsIiwiZ2V0TmFtZSIsImFyZ3VtZW50cyIsIkNvbnZlcnRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs4QkFHVDtBQUNSLFVBQUksS0FBS0MsTUFBTCxDQUFZQyxPQUFaLENBQW9CQyxVQUFwQixDQUErQkMsTUFBL0IsSUFBeUMsQ0FBekMsSUFBOEMsQ0FBQyxLQUFLSCxNQUFMLENBQVlDLE9BQVosQ0FBb0JHLEVBQXZFLEVBQTJFO0FBQ3pFLGFBQUtKLE1BQUwsQ0FBWUMsT0FBWixDQUFvQkcsRUFBcEIsR0FBeUIsS0FBS0MsU0FBTCxDQUFlQyxPQUFmLEVBQXpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsMklBQWlCQyxTQUFqQjtBQUNBLGFBQUtOLE9BQUwsQ0FBYUcsRUFBYixHQUFrQixLQUFLQyxTQUFMLENBQWVDLE9BQWYsRUFBbEI7QUFDRDtBQUNGOzs7d0JBVFM7QUFBRSxhQUFPLEdBQVA7QUFBYTs7O0VBRFdFLG1COztrQkFBakJULFEiLCJmaWxlIjoiYm9va21hcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va21hcmsgZXh0ZW5kcyBDb252ZXJ0ZXIge1xuICBnZXQgdGFnKCkgeyByZXR1cm4gJ2knOyB9XG5cbiAgY29udmVydCgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQuY29udGVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwICYmICF0aGlzLnBhcmVudC5jb250ZW50LmlkKSB7XG4gICAgICB0aGlzLnBhcmVudC5jb250ZW50LmlkID0gdGhpcy53b3JkTW9kZWwuZ2V0TmFtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5jb252ZXJ0KC4uLmFyZ3VtZW50cyk7XG4gICAgICB0aGlzLmNvbnRlbnQuaWQgPSB0aGlzLndvcmRNb2RlbC5nZXROYW1lKCk7XG4gICAgfVxuICB9XG59XG4iXX0=