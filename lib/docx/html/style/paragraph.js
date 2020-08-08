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

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _numbering = require('./numbering');

var _numbering2 = _interopRequireDefault(_numbering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = function (_Style) {
  (0, _inherits3.default)(Paragraph, _Style);

  function Paragraph() {
    (0, _classCallCheck3.default)(this, Paragraph);
    return (0, _possibleConstructorReturn3.default)(this, (Paragraph.__proto__ || (0, _getPrototypeOf2.default)(Paragraph)).apply(this, arguments));
  }

  (0, _createClass3.default)(Paragraph, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter(category) {
      if (this[category]) return this[category];
      switch (category) {
        case 'inline':
          this.inlineStyle = this.doc.createStyle('.' + _converter2.default.asCssID(this.wordModel.id) + ' span');
          return this[category] = new _inline2.default.Properties(this.inlineStyle);
        case 'paragraph':
          this.paragraphStyle = this.doc.createStyle('.' + _converter2.default.asCssID(this.wordModel.id));
          return this[category] = new this.constructor.Properties(this.paragraphStyle);
        case 'frame':
          this._getPropertiesConverter('paragraph');
          return this[category] = new this.constructor.FrameProperties(this.paragraphStyle);
        case 'numbering':
          this._getPropertiesConverter('paragraph');
          return this[category] = new _numbering2.default.Properties(this.paragraphStyle);
      }
    }
  }]);
  return Paragraph;
}(_converter2.default);

exports.default = Paragraph;


Paragraph.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'jc',
    value: function jc(x) {
      this.style.textAlign = x;
    }
  }, {
    key: 'ind',
    value: function ind(x) {
      x.left && (this.style.marginLeft = x.left + 'px');
      x.right && (this.style.marginRight = x.right + 'px');
      x.firstLine && (this.style.textIndent = x.firstLine + 'px');
      x.hanging && (this.style.textIndent = '-' + x.hanging + 'px');
    }
  }, {
    key: 'spacing',
    value: function spacing(x) {
      x.bottom && (this.style.marginBottom = x.bottom + 'px');
      x.top && (this.style.marginTop = x.top + 'px');

      x.lineHeight && (this.style.lineHeight = x.lineHeight);
    }
  }]);
  return Properties;
}(_converter2.default.Properties);

Paragraph.FrameProperties = function (_Style$Properties2) {
  (0, _inherits3.default)(FrameProperties, _Style$Properties2);

  function FrameProperties() {
    (0, _classCallCheck3.default)(this, FrameProperties);
    return (0, _possibleConstructorReturn3.default)(this, (FrameProperties.__proto__ || (0, _getPrototypeOf2.default)(FrameProperties)).apply(this, arguments));
  }

  return FrameProperties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbIlBhcmFncmFwaCIsImNhdGVnb3J5IiwiaW5saW5lU3R5bGUiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsIndvcmRNb2RlbCIsImlkIiwiSW5saW5lIiwiUHJvcGVydGllcyIsInBhcmFncmFwaFN0eWxlIiwiY29uc3RydWN0b3IiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIkZyYW1lUHJvcGVydGllcyIsIk51bWJlcmluZyIsIngiLCJzdHlsZSIsInRleHRBbGlnbiIsImxlZnQiLCJtYXJnaW5MZWZ0IiwicmlnaHQiLCJtYXJnaW5SaWdodCIsImZpcnN0TGluZSIsInRleHRJbmRlbnQiLCJoYW5naW5nIiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwidG9wIiwibWFyZ2luVG9wIiwibGluZUhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs0Q0FDS0MsUSxFQUFVO0FBQ2hDLFVBQUksS0FBS0EsUUFBTCxDQUFKLEVBQW9CLE9BQU8sS0FBS0EsUUFBTCxDQUFQO0FBQ3BCLGNBQVFBLFFBQVI7QUFDRSxhQUFLLFFBQUw7QUFDRSxlQUFLQyxXQUFMLEdBQW1CLEtBQUtDLEdBQUwsQ0FBU0MsV0FBVCxPQUF5QkMsb0JBQU1DLE9BQU4sQ0FBYyxLQUFLQyxTQUFMLENBQWVDLEVBQTdCLENBQXpCLFdBQW5CO0FBQ0EsaUJBQU8sS0FBS1AsUUFBTCxJQUFpQixJQUFJUSxpQkFBT0MsVUFBWCxDQUFzQixLQUFLUixXQUEzQixDQUF4QjtBQUNGLGFBQUssV0FBTDtBQUNFLGVBQUtTLGNBQUwsR0FBc0IsS0FBS1IsR0FBTCxDQUFTQyxXQUFULE9BQXlCQyxvQkFBTUMsT0FBTixDQUFjLEtBQUtDLFNBQUwsQ0FBZUMsRUFBN0IsQ0FBekIsQ0FBdEI7QUFDQSxpQkFBTyxLQUFLUCxRQUFMLElBQWlCLElBQUksS0FBS1csV0FBTCxDQUFpQkYsVUFBckIsQ0FBZ0MsS0FBS0MsY0FBckMsQ0FBeEI7QUFDRixhQUFLLE9BQUw7QUFDRSxlQUFLRSx1QkFBTCxDQUE2QixXQUE3QjtBQUNBLGlCQUFPLEtBQUtaLFFBQUwsSUFBaUIsSUFBSSxLQUFLVyxXQUFMLENBQWlCRSxlQUFyQixDQUFxQyxLQUFLSCxjQUExQyxDQUF4QjtBQUNGLGFBQUssV0FBTDtBQUNFLGVBQUtFLHVCQUFMLENBQTZCLFdBQTdCO0FBQ0EsaUJBQU8sS0FBS1osUUFBTCxJQUFpQixJQUFJYyxvQkFBVUwsVUFBZCxDQUF5QixLQUFLQyxjQUE5QixDQUF4QjtBQVpKO0FBY0Q7OztFQWpCb0NOLG1COztrQkFBbEJMLFM7OztBQW9CckJBLFVBQVVVLFVBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdUJBQ0tNLENBREwsRUFDUTtBQUNKLFdBQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUF1QkYsQ0FBdkI7QUFDRDtBQUhIO0FBQUE7QUFBQSx3QkFLTUEsQ0FMTixFQUtTO0FBQ0xBLFFBQUVHLElBQUYsS0FBVyxLQUFLRixLQUFMLENBQVdHLFVBQVgsR0FBMkJKLEVBQUVHLElBQTdCLE9BQVg7QUFDQUgsUUFBRUssS0FBRixLQUFZLEtBQUtKLEtBQUwsQ0FBV0ssV0FBWCxHQUE0Qk4sRUFBRUssS0FBOUIsT0FBWjtBQUNBTCxRQUFFTyxTQUFGLEtBQWdCLEtBQUtOLEtBQUwsQ0FBV08sVUFBWCxHQUEyQlIsRUFBRU8sU0FBN0IsT0FBaEI7QUFDQVAsUUFBRVMsT0FBRixLQUFjLEtBQUtSLEtBQUwsQ0FBV08sVUFBWCxTQUE0QlIsRUFBRVMsT0FBOUIsT0FBZDtBQUNEO0FBVkg7QUFBQTtBQUFBLDRCQVlVVCxDQVpWLEVBWWE7QUFDVEEsUUFBRVUsTUFBRixLQUFhLEtBQUtULEtBQUwsQ0FBV1UsWUFBWCxHQUE2QlgsRUFBRVUsTUFBL0IsT0FBYjtBQUNBVixRQUFFWSxHQUFGLEtBQVUsS0FBS1gsS0FBTCxDQUFXWSxTQUFYLEdBQTBCYixFQUFFWSxHQUE1QixPQUFWOztBQUVBWixRQUFFYyxVQUFGLEtBQWlCLEtBQUtiLEtBQUwsQ0FBV2EsVUFBWCxHQUF3QmQsRUFBRWMsVUFBM0M7QUFDRDtBQWpCSDtBQUFBO0FBQUEsRUFBZ0R6QixvQkFBTUssVUFBdEQ7O0FBb0JBVixVQUFVYyxlQUFWO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxFQUEwRFQsb0JBQU1LLFVBQWhFIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJztcbmltcG9ydCBOdW1iZXJpbmcgZnJvbSAnLi9udW1iZXJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdHlsZSB7XG4gIF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KSB7XG4gICAgaWYgKHRoaXNbY2F0ZWdvcnldKSByZXR1cm4gdGhpc1tjYXRlZ29yeV07XG4gICAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgICAgY2FzZSAnaW5saW5lJzpcbiAgICAgICAgdGhpcy5pbmxpbmVTdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAuJHtTdHlsZS5hc0Nzc0lEKHRoaXMud29yZE1vZGVsLmlkKX0gc3BhbmApO1xuICAgICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV0gPSBuZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5pbmxpbmVTdHlsZSk7XG4gICAgICBjYXNlICdwYXJhZ3JhcGgnOlxuICAgICAgICB0aGlzLnBhcmFncmFwaFN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoYC4ke1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpfWApO1xuICAgICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV0gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpO1xuICAgICAgY2FzZSAnZnJhbWUnOlxuICAgICAgICB0aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKCdwYXJhZ3JhcGgnKTtcbiAgICAgICAgcmV0dXJuIHRoaXNbY2F0ZWdvcnldID0gbmV3IHRoaXMuY29uc3RydWN0b3IuRnJhbWVQcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpO1xuICAgICAgY2FzZSAnbnVtYmVyaW5nJzpcbiAgICAgICAgdGhpcy5fZ2V0UHJvcGVydGllc0NvbnZlcnRlcigncGFyYWdyYXBoJyk7XG4gICAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XSA9IG5ldyBOdW1iZXJpbmcuUHJvcGVydGllcyh0aGlzLnBhcmFncmFwaFN0eWxlKTtcbiAgICB9XG4gIH1cbn1cblxuUGFyYWdyYXBoLlByb3BlcnRpZXMgPSBjbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllcyB7XG4gIGpjKHgpIHtcbiAgICB0aGlzLnN0eWxlLnRleHRBbGlnbiA9IHg7XG4gIH1cblxuICBpbmQoeCkge1xuICAgIHgubGVmdCAmJiAodGhpcy5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7eC5sZWZ0fXB4YCk7XG4gICAgeC5yaWdodCAmJiAodGhpcy5zdHlsZS5tYXJnaW5SaWdodCA9IGAke3gucmlnaHR9cHhgKTtcbiAgICB4LmZpcnN0TGluZSAmJiAodGhpcy5zdHlsZS50ZXh0SW5kZW50ID0gYCR7eC5maXJzdExpbmV9cHhgKTtcbiAgICB4LmhhbmdpbmcgJiYgKHRoaXMuc3R5bGUudGV4dEluZGVudCA9IGAtJHt4Lmhhbmdpbmd9cHhgKTtcbiAgfVxuXG4gIHNwYWNpbmcoeCkge1xuICAgIHguYm90dG9tICYmICh0aGlzLnN0eWxlLm1hcmdpbkJvdHRvbSA9IGAke3guYm90dG9tfXB4YCk7XG4gICAgeC50b3AgJiYgKHRoaXMuc3R5bGUubWFyZ2luVG9wID0gYCR7eC50b3B9cHhgKTtcblxuICAgIHgubGluZUhlaWdodCAmJiAodGhpcy5zdHlsZS5saW5lSGVpZ2h0ID0geC5saW5lSGVpZ2h0KTtcbiAgfVxufTtcblxuUGFyYWdyYXBoLkZyYW1lUHJvcGVydGllcyA9IGNsYXNzIEZyYW1lUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXMge1xuXG59O1xuIl19