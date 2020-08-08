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

var Inline = function (_Style) {
  (0, _inherits3.default)(Inline, _Style);

  function Inline() {
    (0, _classCallCheck3.default)(this, Inline);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Inline.__proto__ || (0, _getPrototypeOf2.default)(Inline)).apply(this, arguments));

    _this.style = _this.wordModel.id ? _this.doc.createStyle('.' + _converter2.default.asCssID(_this.wordModel.id)) : _this.doc.createStyle('span');
    _this.inline = new _this.constructor.Properties(_this.style);
    return _this;
  }

  (0, _createClass3.default)(Inline, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter() {
      return this.inline;
    }
  }]);
  return Inline;
}(_converter2.default);

exports.default = Inline;


Inline.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'rFonts',
    value: function rFonts(x) {
      x && x.ascii && (this.style.fontFamily = x.ascii);
    }
  }, {
    key: 'b',
    value: function b(x) {
      this.style.fontWeight = 700;
    }
  }, {
    key: 'sz',
    value: function sz(x) {
      this.style.fontSize = x + 'px';
    }
  }, {
    key: 'color',
    value: function color(x) {
      this.style.color = x;
    }
  }, {
    key: 'i',
    value: function i(x) {
      this.style.fontStyle = 'italic';
    }
  }, {
    key: 'u',
    value: function u(x) {
      this.style.textDecoration = 'underline';
    }
  }, {
    key: 'bdr',
    value: function bdr(x) {
      this.style.border = this._border(x);
    }
  }, {
    key: 'lang',
    value: function lang(x) {}
  }, {
    key: 'vertAlign',
    value: function vertAlign(x) {
      switch (x) {
        case 'superscript':
          this.style.verticalAlign = 'super';
          break;
        case 'subscript':
          this.style.verticalAlign = 'sub';
          break;
      }
    }
  }, {
    key: 'highlight',
    value: function highlight(x) {
      this.style.backgroundColor = x;
    }
  }]);
  return Properties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbIklubGluZSIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiaWQiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsImlubGluZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIngiLCJhc2NpaSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJjb2xvciIsImZvbnRTdHlsZSIsInRleHREZWNvcmF0aW9uIiwiYm9yZGVyIiwiX2JvcmRlciIsInZlcnRpY2FsQWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTTs7O0FBQ25CLG9CQUFjO0FBQUE7O0FBQUEsdUlBQ0hDLFNBREc7O0FBRVosVUFBS0MsS0FBTCxHQUFhLE1BQUtDLFNBQUwsQ0FBZUMsRUFBZixHQUFvQixNQUFLQyxHQUFMLENBQVNDLFdBQVQsT0FBeUJDLG9CQUFNQyxPQUFOLENBQWMsTUFBS0wsU0FBTCxDQUFlQyxFQUE3QixDQUF6QixDQUFwQixHQUFtRixNQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBckIsQ0FBaEc7QUFDQSxVQUFLRyxNQUFMLEdBQWMsSUFBSSxNQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFnQyxNQUFLVCxLQUFyQyxDQUFkO0FBSFk7QUFJYjs7Ozs4Q0FFeUI7QUFDeEIsYUFBTyxLQUFLTyxNQUFaO0FBQ0Q7OztFQVRpQ0YsbUI7O2tCQUFmUCxNOzs7QUFZckJBLE9BQU9XLFVBQVA7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsMkJBQ1NDLENBRFQsRUFDWTtBQUNSQSxXQUFLQSxFQUFFQyxLQUFQLEtBQWlCLEtBQUtYLEtBQUwsQ0FBV1ksVUFBWCxHQUF3QkYsRUFBRUMsS0FBM0M7QUFDRDtBQUhIO0FBQUE7QUFBQSxzQkFLSUQsQ0FMSixFQUtPO0FBQ0gsV0FBS1YsS0FBTCxDQUFXYSxVQUFYLEdBQXdCLEdBQXhCO0FBQ0Q7QUFQSDtBQUFBO0FBQUEsdUJBU0tILENBVEwsRUFTUTtBQUNKLFdBQUtWLEtBQUwsQ0FBV2MsUUFBWCxHQUF5QkosQ0FBekI7QUFDRDtBQVhIO0FBQUE7QUFBQSwwQkFhUUEsQ0FiUixFQWFXO0FBQ1AsV0FBS1YsS0FBTCxDQUFXZSxLQUFYLEdBQW1CTCxDQUFuQjtBQUNEO0FBZkg7QUFBQTtBQUFBLHNCQWlCSUEsQ0FqQkosRUFpQk87QUFDSCxXQUFLVixLQUFMLENBQVdnQixTQUFYLEdBQXVCLFFBQXZCO0FBQ0Q7QUFuQkg7QUFBQTtBQUFBLHNCQXFCSU4sQ0FyQkosRUFxQk87QUFDSCxXQUFLVixLQUFMLENBQVdpQixjQUFYLEdBQTRCLFdBQTVCO0FBQ0Q7QUF2Qkg7QUFBQTtBQUFBLHdCQXlCTVAsQ0F6Qk4sRUF5QlM7QUFDTCxXQUFLVixLQUFMLENBQVdrQixNQUFYLEdBQW9CLEtBQUtDLE9BQUwsQ0FBYVQsQ0FBYixDQUFwQjtBQUNEO0FBM0JIO0FBQUE7QUFBQSx5QkE2Qk9BLENBN0JQLEVBNkJVLENBRVA7QUEvQkg7QUFBQTtBQUFBLDhCQWlDWUEsQ0FqQ1osRUFpQ2U7QUFDWCxjQUFRQSxDQUFSO0FBQ0UsYUFBSyxhQUFMO0FBQ0UsZUFBS1YsS0FBTCxDQUFXb0IsYUFBWCxHQUEyQixPQUEzQjtBQUNBO0FBQ0YsYUFBSyxXQUFMO0FBQ0UsZUFBS3BCLEtBQUwsQ0FBV29CLGFBQVgsR0FBMkIsS0FBM0I7QUFDQTtBQU5KO0FBUUQ7QUExQ0g7QUFBQTtBQUFBLDhCQTRDWVYsQ0E1Q1osRUE0Q2U7QUFDWCxXQUFLVixLQUFMLENBQVdxQixlQUFYLEdBQTZCWCxDQUE3QjtBQUNEO0FBOUNIO0FBQUE7QUFBQSxFQUE2Q0wsb0JBQU1JLFVBQW5EIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZSBleHRlbmRzIFN0eWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnN0eWxlID0gdGhpcy53b3JkTW9kZWwuaWQgPyB0aGlzLmRvYy5jcmVhdGVTdHlsZShgLiR7U3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCl9YCkgOiB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnc3BhbicpO1xuICAgIHRoaXMuaW5saW5lID0gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnN0eWxlKTtcbiAgfVxuXG4gIF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlubGluZTtcbiAgfVxufVxuXG5JbmxpbmUuUHJvcGVydGllcyA9IGNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVzIHtcbiAgckZvbnRzKHgpIHtcbiAgICB4ICYmIHguYXNjaWkgJiYgKHRoaXMuc3R5bGUuZm9udEZhbWlseSA9IHguYXNjaWkpO1xuICB9XG5cbiAgYih4KSB7XG4gICAgdGhpcy5zdHlsZS5mb250V2VpZ2h0ID0gNzAwO1xuICB9XG5cbiAgc3ooeCkge1xuICAgIHRoaXMuc3R5bGUuZm9udFNpemUgPSBgJHt4fXB4YDtcbiAgfVxuXG4gIGNvbG9yKHgpIHtcbiAgICB0aGlzLnN0eWxlLmNvbG9yID0geDtcbiAgfVxuXG4gIGkoeCkge1xuICAgIHRoaXMuc3R5bGUuZm9udFN0eWxlID0gJ2l0YWxpYyc7XG4gIH1cblxuICB1KHgpIHtcbiAgICB0aGlzLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ3VuZGVybGluZSc7XG4gIH1cblxuICBiZHIoeCkge1xuICAgIHRoaXMuc3R5bGUuYm9yZGVyID0gdGhpcy5fYm9yZGVyKHgpO1xuICB9XG5cbiAgbGFuZyh4KSB7XG5cbiAgfVxuXG4gIHZlcnRBbGlnbih4KSB7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICdzdXBlcnNjcmlwdCc6XG4gICAgICAgIHRoaXMuc3R5bGUudmVydGljYWxBbGlnbiA9ICdzdXBlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3Vic2NyaXB0JzpcbiAgICAgICAgdGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3N1Yic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGhpZ2hsaWdodCh4KSB7XG4gICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB4O1xuICB9XG59O1xuIl19