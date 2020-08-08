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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListStyleType = {
  lowerLetter: 'lower-latin', upperLetter: 'upper-latin', lowerRoman: 'lower-roman', upperRoman: 'upper-roman'
};
var cssID = _converter2.default.asCssID;

var List = function (_Style) {
  (0, _inherits3.default)(List, _Style);

  function List() {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));

    _this.levelStyles = {};
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter(category) {
      if (!category) return null;
      var info = category.split(' ');
      var level = parseInt(info[0]);
      var type = info.length == 1 ? 'list' : info[1];
      var style = this.levelStyles[level];
      var levelSelector = '.' + cssID(this.wordModel.id) + '[level="' + level + '"]';

      if (!style) style = this.levelStyles[level] = {};

      if (style[type]) return style[type];

      switch (type) {
        case 'inline':
          style.inline = new _inline2.default.Properties(this.doc.createStyle(levelSelector + '>li>p>.marker:before'));
          break;
        case 'paragraph':
          style.paragraph = new this.constructor.Pr(this.doc.createStyle(levelSelector + '>li>p'), this, levelSelector);
          break;
        case 'list':
          style.list = new this.constructor.Properties(this.doc.createStyle(levelSelector + '>li>p>.marker:before'), this, levelSelector, cssID(this.wordModel.id) + '_' + level, level);
          break;
      }
      return style[type];
    }
  }]);
  return List;
}(_converter2.default);

exports.default = List;


List.Pr = function (_Paragraph$Properties) {
  (0, _inherits3.default)(Pr, _Paragraph$Properties);

  function Pr(style, parent, levelSelector) {
    (0, _classCallCheck3.default)(this, Pr);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Pr.__proto__ || (0, _getPrototypeOf2.default)(Pr)).apply(this, arguments));

    _this2.doc = parent.doc;
    _this2.levelSelector = levelSelector;
    return _this2;
  }

  (0, _createClass3.default)(Pr, [{
    key: 'ind',
    value: function ind(x) {
      var hanging = x.hanging;

      delete x.hanging;
      _paragraph2.default.Properties.prototype.ind.call(this, x);
      x.hanging = hanging;
      x.hanging && (this.doc.createStyle(this.levelSelector + '>li>p>.marker').left = -x.hanging + 'px');
    }
  }]);
  return Pr;
}(_paragraph2.default.Properties);

List.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties(style, parent, levelSelector, counter, level) {
    (0, _classCallCheck3.default)(this, Properties);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

    _this3.doc = parent.doc;
    _this3.levelSelector = levelSelector;
    _this3.level = level;
    _this3.counter = counter;
    _this3.doc.createStyle(levelSelector).counterReset = counter;
    _this3.doc.createStyle(levelSelector + '>li').counterIncrement = counter;
    return _this3;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'start',
    value: function start(x) {
      this.doc.createStyle(this.levelSelector).counterReset = this.counter + ' ' + (x - 1);
    }
  }, {
    key: 'numFmt',
    value: function numFmt(x) {
      this.type = ListStyleType[x] || x;
    }
  }, {
    key: 'lvlText',
    value: function lvlText(x) {
      this.style.content = '"' + x.replace('%' + (this.level + 1), '" counter(' + this.counter + (!this.type ? '' : ',' + this.type) + ') "') + '"';
    }
  }, {
    key: 'lvlJc',
    value: function lvlJc(x) {}
  }, {
    key: 'lvlPicBulletId',
    value: function lvlPicBulletId(x) {}
  }]);
  return Properties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0U3R5bGVUeXBlIiwibG93ZXJMZXR0ZXIiLCJ1cHBlckxldHRlciIsImxvd2VyUm9tYW4iLCJ1cHBlclJvbWFuIiwiY3NzSUQiLCJTdHlsZSIsImFzQ3NzSUQiLCJMaXN0IiwiYXJndW1lbnRzIiwibGV2ZWxTdHlsZXMiLCJjYXRlZ29yeSIsImluZm8iLCJzcGxpdCIsImxldmVsIiwicGFyc2VJbnQiLCJ0eXBlIiwibGVuZ3RoIiwic3R5bGUiLCJsZXZlbFNlbGVjdG9yIiwid29yZE1vZGVsIiwiaWQiLCJpbmxpbmUiLCJJbmxpbmUiLCJQcm9wZXJ0aWVzIiwiZG9jIiwiY3JlYXRlU3R5bGUiLCJwYXJhZ3JhcGgiLCJjb25zdHJ1Y3RvciIsIlByIiwibGlzdCIsInBhcmVudCIsIngiLCJoYW5naW5nIiwiUGFyYWdyYXBoIiwicHJvdG90eXBlIiwiaW5kIiwiY2FsbCIsImxlZnQiLCJjb3VudGVyIiwiY291bnRlclJlc2V0IiwiY291bnRlckluY3JlbWVudCIsImNvbnRlbnQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCO0FBQ3BCQyxlQUFhLGFBRE8sRUFDUUMsYUFBYSxhQURyQixFQUNvQ0MsWUFBWSxhQURoRCxFQUMrREMsWUFBWTtBQUQzRSxDQUF0QjtBQUdBLElBQU1DLFFBQVFDLG9CQUFNQyxPQUFwQjs7SUFFcUJDLEk7OztBQUNuQixrQkFBYztBQUFBOztBQUFBLG1JQUNIQyxTQURHOztBQUVaLFVBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFGWTtBQUdiOzs7OzRDQUV1QkMsUSxFQUFVO0FBQ2hDLFVBQUksQ0FBQ0EsUUFBTCxFQUFlLE9BQU8sSUFBUDtBQUNmLFVBQU1DLE9BQU9ELFNBQVNFLEtBQVQsQ0FBZSxHQUFmLENBQWI7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QXhCLFVBQTRDc0IsZ0JBQTVDLEdBQStERixPQUEvRDtBQVB3RDtBQVF6RDs7QUFUSDtBQUFBO0FBQUEsMEJBV1FQLENBWFIsRUFXVztBQUNQLFdBQUtQLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixLQUFLUCxhQUExQixFQUF5Q3FCLFlBQXpDLEdBQTJELEtBQUtELE9BQWhFLFVBQTJFUCxJQUFJLENBQS9FO0FBQ0Q7QUFiSDtBQUFBO0FBQUEsMkJBZVNBLENBZlQsRUFlWTtBQUNSLFdBQUtoQixJQUFMLEdBQVloQixjQUFjZ0MsQ0FBZCxLQUFvQkEsQ0FBaEM7QUFDRDtBQWpCSDtBQUFBO0FBQUEsNEJBbUJVQSxDQW5CVixFQW1CYTtBQUNULFdBQUtkLEtBQUwsQ0FBV3dCLE9BQVgsU0FBeUJWLEVBQUVXLE9BQUYsUUFBYyxLQUFLN0IsS0FBTCxHQUFhLENBQTNCLGtCQUE2QyxLQUFLeUIsT0FBbEQsSUFBNEQsQ0FBQyxLQUFLdkIsSUFBTixHQUFhLEVBQWIsU0FBc0IsS0FBS0EsSUFBdkYsVUFBekI7QUFDRDtBQXJCSDtBQUFBO0FBQUEsMEJBdUJRZ0IsQ0F2QlIsRUF1QlcsQ0FFUjtBQXpCSDtBQUFBO0FBQUEsbUNBMkJpQkEsQ0EzQmpCLEVBMkJvQixDQUVqQjtBQTdCSDtBQUFBO0FBQUEsRUFBMkMxQixvQkFBTWtCLFVBQWpEIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9jb252ZXJ0ZXInO1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSc7XG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJztcblxuY29uc3QgTGlzdFN0eWxlVHlwZSA9IHtcbiAgbG93ZXJMZXR0ZXI6ICdsb3dlci1sYXRpbicsIHVwcGVyTGV0dGVyOiAndXBwZXItbGF0aW4nLCBsb3dlclJvbWFuOiAnbG93ZXItcm9tYW4nLCB1cHBlclJvbWFuOiAndXBwZXItcm9tYW4nLFxufTtcbmNvbnN0IGNzc0lEID0gU3R5bGUuYXNDc3NJRDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFN0eWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmxldmVsU3R5bGVzID0ge307XG4gIH1cblxuICBfZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSkge1xuICAgIGlmICghY2F0ZWdvcnkpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGluZm8gPSBjYXRlZ29yeS5zcGxpdCgnICcpO1xuICAgIGNvbnN0IGxldmVsID0gcGFyc2VJbnQoaW5mb1swXSk7XG4gICAgY29uc3QgdHlwZSA9IGluZm8ubGVuZ3RoID09IDEgPyAnbGlzdCcgOiBpbmZvWzFdO1xuICAgIGxldCBzdHlsZSA9IHRoaXMubGV2ZWxTdHlsZXNbbGV2ZWxdO1xuICAgIGNvbnN0IGxldmVsU2VsZWN0b3IgPSBgLiR7Y3NzSUQodGhpcy53b3JkTW9kZWwuaWQpfVtsZXZlbD1cIiR7bGV2ZWx9XCJdYDtcblxuICAgIGlmICghc3R5bGUpIHN0eWxlID0gdGhpcy5sZXZlbFN0eWxlc1tsZXZlbF0gPSB7fTtcblxuICAgIGlmIChzdHlsZVt0eXBlXSkgcmV0dXJuIHN0eWxlW3R5cGVdO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdpbmxpbmUnOlxuICAgICAgICBzdHlsZS5pbmxpbmUgPSBuZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7bGV2ZWxTZWxlY3Rvcn0+bGk+cD4ubWFya2VyOmJlZm9yZWApKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwYXJhZ3JhcGgnOlxuICAgICAgICBzdHlsZS5wYXJhZ3JhcGggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcih0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHtsZXZlbFNlbGVjdG9yfT5saT5wYCksIHRoaXMsIGxldmVsU2VsZWN0b3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICBzdHlsZS5saXN0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHtsZXZlbFNlbGVjdG9yfT5saT5wPi5tYXJrZXI6YmVmb3JlYCksIHRoaXMsIGxldmVsU2VsZWN0b3IsIGAke2Nzc0lEKHRoaXMud29yZE1vZGVsLmlkKX1fJHtsZXZlbH1gLCBsZXZlbCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVbdHlwZV07XG4gIH1cbn1cblxuTGlzdC5QciA9IGNsYXNzIFByIGV4dGVuZHMgUGFyYWdyYXBoLlByb3BlcnRpZXMge1xuICBjb25zdHJ1Y3RvcihzdHlsZSwgcGFyZW50LCBsZXZlbFNlbGVjdG9yKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmRvYyA9IHBhcmVudC5kb2M7XG4gICAgdGhpcy5sZXZlbFNlbGVjdG9yID0gbGV2ZWxTZWxlY3RvcjtcbiAgfVxuXG4gIGluZCh4KSB7XG4gICAgY29uc3QgeyBoYW5naW5nIH0gPSB4O1xuICAgIGRlbGV0ZSB4Lmhhbmdpbmc7XG4gICAgUGFyYWdyYXBoLlByb3BlcnRpZXMucHJvdG90eXBlLmluZC5jYWxsKHRoaXMsIHgpO1xuICAgIHguaGFuZ2luZyA9IGhhbmdpbmc7XG4gICAgeC5oYW5naW5nICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHt0aGlzLmxldmVsU2VsZWN0b3J9PmxpPnA+Lm1hcmtlcmApLmxlZnQgPSBgJHsteC5oYW5naW5nfXB4YCk7XG4gIH1cbn07XG5cbkxpc3QuUHJvcGVydGllcyA9IGNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVzIHtcbiAgY29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCwgbGV2ZWxTZWxlY3RvciwgY291bnRlciwgbGV2ZWwpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMuZG9jID0gcGFyZW50LmRvYztcbiAgICB0aGlzLmxldmVsU2VsZWN0b3IgPSBsZXZlbFNlbGVjdG9yO1xuICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICB0aGlzLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgIHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IpLmNvdW50ZXJSZXNldCA9IGNvdW50ZXI7XG4gICAgdGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7bGV2ZWxTZWxlY3Rvcn0+bGlgKS5jb3VudGVySW5jcmVtZW50ID0gY291bnRlcjtcbiAgfVxuXG4gIHN0YXJ0KHgpIHtcbiAgICB0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLmxldmVsU2VsZWN0b3IpLmNvdW50ZXJSZXNldCA9IGAke3RoaXMuY291bnRlcn0gJHt4IC0gMX1gO1xuICB9XG5cbiAgbnVtRm10KHgpIHtcbiAgICB0aGlzLnR5cGUgPSBMaXN0U3R5bGVUeXBlW3hdIHx8IHg7XG4gIH1cblxuICBsdmxUZXh0KHgpIHtcbiAgICB0aGlzLnN0eWxlLmNvbnRlbnQgPSBgXCIke3gucmVwbGFjZShgJSR7dGhpcy5sZXZlbCArIDF9YCwgYFwiIGNvdW50ZXIoJHt0aGlzLmNvdW50ZXJ9JHshdGhpcy50eXBlID8gJycgOiBgLCR7dGhpcy50eXBlfWB9KSBcImApfVwiYDtcbiAgfVxuXG4gIGx2bEpjKHgpIHtcblxuICB9XG5cbiAgbHZsUGljQnVsbGV0SWQoeCkge1xuXG4gIH1cbn07XG4iXX0=