'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _converter = require('../converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lines = 'dotted,dashed,inset,outset,solid'.split();
var browsers = ',-webkit-,-moz-'.split(',');var cssID = _converter2.default.asCssID;

var StyleConverter = function (_Converter) {
  (0, _inherits3.default)(StyleConverter, _Converter);

  function StyleConverter() {
    (0, _classCallCheck3.default)(this, StyleConverter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StyleConverter.__proto__ || (0, _getPrototypeOf2.default)(StyleConverter)).apply(this, arguments));

    var parentStyle = _this.wordModel.getParentStyle();
    parentStyle && _this.doc.stylePath(cssID(_this.wordModel.id), cssID(parentStyle.id));
    return _this;
  }

  (0, _createClass3.default)(StyleConverter, [{
    key: 'convert',
    value: function convert(value, name, category) {
      var converter = this._getPropertiesConverter(category);
      converter && converter[name] && converter[name](value);
    }
  }, {
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter() {}
  }]);
  return StyleConverter;
}(_converter2.default);

exports.default = StyleConverter;


StyleConverter.Properties = function () {
  function Properties(style, parent) {
    (0, _classCallCheck3.default)(this, Properties);

    this.style = style;
    this.parent = parent;
    parent && (this.doc = parent.doc);
  }

  (0, _createClass3.default)(Properties, [{
    key: 'visit',
    value: function visit() {
      this.convert.apply(this, arguments);
    }
  }, {
    key: 'convert',
    value: function convert(value, name) {
      this[name] && this[name](value);
    }
  }, {
    key: '_border',
    value: function _border(border) {
      if (border == undefined || border.val == 'none' || border.val == 'nil') return '0';
      return (border.sz < 1 && border.sz > 0 ? 1 : border.sz) + 'pt ' + (Lines.indexOf(border.val.toLowerCase()) != -1 ? border.val : 'solid') + ' ' + (border.color || '');
    }
  }, {
    key: 'equalObj',
    value: function equalObj(a, b) {
      var keys = (0, _keys2.default)(a);
      if (!b || keys.length != (0, _keys2.default)(b).length) return false;
      if (keys.length != 0) {
        for (var i = 0, len = keys.length; i < len; i++) {
          if (a[keys[i]] != b[keys[i]]) return false;
        }
      }

      for (var i = 2, len = arguments.length; i < len; i++) {
        if (!this.equalObj(a, arguments[i])) return false;
      }return true;
    }
  }, {
    key: 'upperFirst',
    value: function upperFirst(type) {
      return type[0].toUpperCase() + type.slice(1);
    }
  }, {
    key: 'styless',
    value: function styless(name, value, style) {
      browsers.forEach(function (a) {
        this[a + name] = value;
      }.bind(style || this.style));
    }
  }, {
    key: 'lineStyle',
    value: function lineStyle(x) {
      if (!x) return 'solid';
      x = x.toLowerCase();
      if (x.indexOf('dot') != -1) return 'dotted';
      if (x.indexOf('dash') != -1) return 'dashed';
      if (x.indexOf('double') != -1 || x.indexOf('gap') != -1) return 'double';
      if (x.indexOf('emboss') != -1) return 'ridge';
      if (x.indexOf('grave') != -1) return 'groove';
      if (x.indexOf('outset') != -1) return 'outset';
      if (x.indexOf('inset') != -1) return 'inset';
      return 'solid';
    }
  }]);
  return Properties;
}();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbIkxpbmVzIiwic3BsaXQiLCJicm93c2VycyIsImNzc0lEIiwiQ29udmVydGVyIiwiYXNDc3NJRCIsIlN0eWxlQ29udmVydGVyIiwiYXJndW1lbnRzIiwicGFyZW50U3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXRQYXJlbnRTdHlsZSIsImRvYyIsInN0eWxlUGF0aCIsImlkIiwidmFsdWUiLCJuYW1lIiwiY2F0ZWdvcnkiLCJjb252ZXJ0ZXIiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIlByb3BlcnRpZXMiLCJzdHlsZSIsInBhcmVudCIsImNvbnZlcnQiLCJib3JkZXIiLCJ1bmRlZmluZWQiLCJ2YWwiLCJzeiIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsImNvbG9yIiwiYSIsImIiLCJrZXlzIiwibGVuZ3RoIiwiaSIsImxlbiIsImVxdWFsT2JqIiwidHlwZSIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJmb3JFYWNoIiwiYmluZCIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLG1DQUFtQ0MsS0FBbkMsRUFBZDtBQUNBLElBQU1DLFdBQVcsa0JBQWtCRCxLQUFsQixDQUF3QixHQUF4QixDQUFqQixDQUErQyxJQUM3Q0UsUUFBUUMsb0JBQVVDLE9BRDJCOztJQUcxQkMsYzs7O0FBQ25CLDRCQUFjO0FBQUE7O0FBQUEsdUpBQ0hDLFNBREc7O0FBRVosUUFBTUMsY0FBYyxNQUFLQyxTQUFMLENBQWVDLGNBQWYsRUFBcEI7QUFDQUYsbUJBQWUsTUFBS0csR0FBTCxDQUFTQyxTQUFULENBQW1CVCxNQUFNLE1BQUtNLFNBQUwsQ0FBZUksRUFBckIsQ0FBbkIsRUFBNkNWLE1BQU1LLFlBQVlLLEVBQWxCLENBQTdDLENBQWY7QUFIWTtBQUliOzs7OzRCQUVPQyxLLEVBQU9DLEksRUFB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QUFRLE9BQU8sT0FBUDtBQUNSQSxVQUFJQSxFQUFFZCxXQUFGLEVBQUo7QUFDQSxVQUFJYyxFQUFFZixPQUFGLENBQVUsS0FBVixLQUFvQixDQUFDLENBQXpCLEVBQTRCLE9BQU8sUUFBUDtBQUM1QixVQUFJZSxFQUFFZixPQUFGLENBQVUsTUFBVixLQUFxQixDQUFDLENBQTFCLEVBQTZCLE9BQU8sUUFBUDtBQUM3QixVQUFJZSxFQUFFZixPQUFGLENBQVUsUUFBVixLQUF1QixDQUFDLENBQXhCLElBQTZCZSxFQUFFZixPQUFGLENBQVUsS0FBVixLQUFvQixDQUFDLENBQXRELEVBQXlELE9BQU8sUUFBUDtBQUN6RCxVQUFJZSxFQUFFZixPQUFGLENBQVUsUUFBVixLQUF1QixDQUFDLENBQTVCLEVBQStCLE9BQU8sT0FBUDtBQUMvQixVQUFJZSxFQUFFZixPQUFGLENBQVUsT0FBVixLQUFzQixDQUFDLENBQTNCLEVBQThCLE9BQU8sUUFBUDtBQUM5QixVQUFJZSxFQUFFZixPQUFGLENBQVUsUUFBVixLQUF1QixDQUFDLENBQTVCLEVBQStCLE9BQU8sUUFBUDtBQUMvQixVQUFJZSxFQUFFZixPQUFGLENBQVUsT0FBVixLQUFzQixDQUFDLENBQTNCLEVBQThCLE9BQU8sT0FBUDtBQUM5QixhQUFPLE9BQVA7QUFDRDtBQXRESDtBQUFBO0FBQUEiLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuLi9jb252ZXJ0ZXInO1xuXG5jb25zdCBMaW5lcyA9ICdkb3R0ZWQsZGFzaGVkLGluc2V0LG91dHNldCxzb2xpZCcuc3BsaXQoKTtcbmNvbnN0IGJyb3dzZXJzID0gJywtd2Via2l0LSwtbW96LScuc3BsaXQoJywnKTsgY29uc3RcbiAgY3NzSUQgPSBDb252ZXJ0ZXIuYXNDc3NJRDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVDb252ZXJ0ZXIgZXh0ZW5kcyBDb252ZXJ0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIGNvbnN0IHBhcmVudFN0eWxlID0gdGhpcy53b3JkTW9kZWwuZ2V0UGFyZW50U3R5bGUoKTtcbiAgICBwYXJlbnRTdHlsZSAmJiB0aGlzLmRvYy5zdHlsZVBhdGgoY3NzSUQodGhpcy53b3JkTW9kZWwuaWQpLCBjc3NJRChwYXJlbnRTdHlsZS5pZCkpO1xuICB9XG5cbiAgY29udmVydCh2YWx1ZSwgbmFtZSwgY2F0ZWdvcnkpIHtcbiAgICBjb25zdCBjb252ZXJ0ZXIgPSB0aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KTtcbiAgICBjb252ZXJ0ZXIgJiYgY29udmVydGVyW25hbWVdICYmIGNvbnZlcnRlcltuYW1lXSh2YWx1ZSk7XG4gIH1cblxuICBfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpIHtcblxuICB9XG59XG5cblN0eWxlQ29udmVydGVyLlByb3BlcnRpZXMgPSBjbGFzcyBQcm9wZXJ0aWVzIHtcbiAgY29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCkge1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICBwYXJlbnQgJiYgKHRoaXMuZG9jID0gcGFyZW50LmRvYyk7XG4gIH1cblxuICB2aXNpdCgpIHtcbiAgICB0aGlzLmNvbnZlcnQoLi4uYXJndW1lbnRzKTtcbiAgfVxuXG4gIGNvbnZlcnQodmFsdWUsIG5hbWUpIHtcbiAgICB0aGlzW25hbWVdICYmIHRoaXNbbmFtZV0odmFsdWUpO1xuICB9XG5cbiAgX2JvcmRlcihib3JkZXIpIHtcbiAgICBpZiAoYm9yZGVyID09IHVuZGVmaW5lZCB8fCBib3JkZXIudmFsID09ICdub25lJyB8fCBib3JkZXIudmFsID09ICduaWwnKSByZXR1cm4gJzAnO1xuICAgIHJldHVybiBgJHtib3JkZXIuc3ogPCAxICYmIGJvcmRlci5zeiA+IDAgPyAxIDogYm9yZGVyLnN6fXB0ICR7TGluZXMuaW5kZXhPZihib3JkZXIudmFsLnRvTG93ZXJDYXNlKCkpICE9IC0xID8gYm9yZGVyLnZhbCA6ICdzb2xpZCd9ICR7Ym9yZGVyLmNvbG9yIHx8ICcnfWA7XG4gIH1cblxuICBlcXVhbE9iaihhLCBiKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICAgIGlmICghYiB8fCBrZXlzLmxlbmd0aCAhPSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoa2V5cy5sZW5ndGggIT0gMCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGFba2V5c1tpXV0gIT0gYltrZXlzW2ldXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAyLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIGlmICghdGhpcy5lcXVhbE9iaihhLCBhcmd1bWVudHNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB1cHBlckZpcnN0KHR5cGUpIHtcbiAgICByZXR1cm4gdHlwZVswXS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zbGljZSgxKTtcbiAgfVxuXG4gIHN0eWxlc3MobmFtZSwgdmFsdWUsIHN0eWxlKSB7XG4gICAgYnJvd3NlcnMuZm9yRWFjaChmdW5jdGlvbiAoYSkge1xuICAgICAgdGhpc1thICsgbmFtZV0gPSB2YWx1ZTtcbiAgICB9LmJpbmQoc3R5bGUgfHwgdGhpcy5zdHlsZSkpO1xuICB9XG5cbiAgbGluZVN0eWxlKHgpIHtcbiAgICBpZiAoIXgpIHJldHVybiAnc29saWQnO1xuICAgIHggPSB4LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHguaW5kZXhPZignZG90JykgIT0gLTEpIHJldHVybiAnZG90dGVkJztcbiAgICBpZiAoeC5pbmRleE9mKCdkYXNoJykgIT0gLTEpIHJldHVybiAnZGFzaGVkJztcbiAgICBpZiAoeC5pbmRleE9mKCdkb3VibGUnKSAhPSAtMSB8fCB4LmluZGV4T2YoJ2dhcCcpICE9IC0xKSByZXR1cm4gJ2RvdWJsZSc7XG4gICAgaWYgKHguaW5kZXhPZignZW1ib3NzJykgIT0gLTEpIHJldHVybiAncmlkZ2UnO1xuICAgIGlmICh4LmluZGV4T2YoJ2dyYXZlJykgIT0gLTEpIHJldHVybiAnZ3Jvb3ZlJztcbiAgICBpZiAoeC5pbmRleE9mKCdvdXRzZXQnKSAhPSAtMSkgcmV0dXJuICdvdXRzZXQnO1xuICAgIGlmICh4LmluZGV4T2YoJ2luc2V0JykgIT0gLTEpIHJldHVybiAnaW5zZXQnO1xuICAgIHJldHVybiAnc29saWQnO1xuICB9XG59O1xuIl19