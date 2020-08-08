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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Document = function (_Paragraph) {
  (0, _inherits3.default)(Document, _Paragraph);

  function Document() {
    (0, _classCallCheck3.default)(this, Document);
    return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
  }

  (0, _createClass3.default)(Document, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter(category) {
      if (this[category]) return this[category];
      switch (category) {
        case 'inline':
          this.inlineStyle = this.doc.createStyle('span,a');
          return this[category] = new _inline2.default.Properties(this.inlineStyle);
        case 'paragraph':
          this.paragraphStyle = this.doc.createStyle('p,h1,h2,h3,h4,h5,h6');
          return this[category] = new this.constructor.Properties(this.paragraphStyle);
      }
    }
  }]);
  return Document;
}(_paragraph2.default);

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJjYXRlZ29yeSIsImlubGluZVN0eWxlIiwiZG9jIiwiY3JlYXRlU3R5bGUiLCJJbmxpbmUiLCJQcm9wZXJ0aWVzIiwicGFyYWdyYXBoU3R5bGUiLCJjb25zdHJ1Y3RvciIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7NENBQ0tDLFEsRUFBVTtBQUNoQyxVQUFJLEtBQUtBLFFBQUwsQ0FBSixFQUFvQixPQUFPLEtBQUtBLFFBQUwsQ0FBUDtBQUNwQixjQUFRQSxRQUFSO0FBQ0UsYUFBSyxRQUFMO0FBQ0UsZUFBS0MsV0FBTCxHQUFtQixLQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsUUFBckIsQ0FBbkI7QUFDQSxpQkFBTyxLQUFLSCxRQUFMLElBQWlCLElBQUlJLGlCQUFPQyxVQUFYLENBQXNCLEtBQUtKLFdBQTNCLENBQXhCO0FBQ0YsYUFBSyxXQUFMO0FBQ0UsZUFBS0ssY0FBTCxHQUFzQixLQUFLSixHQUFMLENBQVNDLFdBQVQsQ0FBcUIscUJBQXJCLENBQXRCO0FBQ0EsaUJBQU8sS0FBS0gsUUFBTCxJQUFpQixJQUFJLEtBQUtPLFdBQUwsQ0FBaUJGLFVBQXJCLENBQWdDLEtBQUtDLGNBQXJDLENBQXhCO0FBTko7QUFRRDs7O0VBWG1DRSxtQjs7a0JBQWpCVCxRIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcmFncmFwaCBmcm9tICcuL3BhcmFncmFwaCc7XG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBQYXJhZ3JhcGgge1xuICBfZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSkge1xuICAgIGlmICh0aGlzW2NhdGVnb3J5XSkgcmV0dXJuIHRoaXNbY2F0ZWdvcnldO1xuICAgIHN3aXRjaCAoY2F0ZWdvcnkpIHtcbiAgICAgIGNhc2UgJ2lubGluZSc6XG4gICAgICAgIHRoaXMuaW5saW5lU3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnc3BhbixhJyk7XG4gICAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XSA9IG5ldyBJbmxpbmUuUHJvcGVydGllcyh0aGlzLmlubGluZVN0eWxlKTtcbiAgICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgICAgIHRoaXMucGFyYWdyYXBoU3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgncCxoMSxoMixoMyxoNCxoNSxoNicpO1xuICAgICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV0gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpO1xuICAgIH1cbiAgfVxufVxuIl19