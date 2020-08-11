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

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Drawing = function (_Converter) {
  (0, _inherits3.default)(Drawing, _Converter);

  function Drawing() {
    (0, _classCallCheck3.default)(this, Drawing);
    return (0, _possibleConstructorReturn3.default)(this, (Drawing.__proto__ || (0, _getPrototypeOf2.default)(Drawing)).apply(this, arguments));
  }

  (0, _createClass3.default)(Drawing, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Drawing.prototype.__proto__ || (0, _getPrototypeOf2.default)(Drawing.prototype), 'convertStyle', this).apply(this, arguments);
      if (this.wordModel.getStyleId == undefined) el.setAttribute('class', 'Drawing');
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
    }
  }]);
  return Drawing;
}(_converter2.default);

exports.default = Drawing;

var Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'extent',
    value: function extent(x) {
      this.world = x;
      this.style.width = x.width + 'px';
      this.style.height = x.height + 'px';
    }
  }, {
    key: 'distL',
    value: function distL(x) {
      x && (this.style.marginLeft = x + 'px');
    }
  }, {
    key: 'distT',
    value: function distT(x) {
      x && (this.style.marginTop = x + 'px');
    }
  }, {
    key: 'distB',
    value: function distB(x) {
      x && (this.style.marginBottom = x + 'px');
    }
  }, {
    key: 'distR',
    value: function distR(x) {
      x && (this.style.marginRight = x + 'px');
    }
  }]);
  return Properties;
}(_converter4.default.Properties);

Drawing.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6WyJEcmF3aW5nIiwiZWwiLCJhcmd1bWVudHMiLCJ3b3JkTW9kZWwiLCJnZXRTdHlsZUlkIiwidW5kZWZpbmVkIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJnZXREaXJlY3RTdHlsZSIsInBhcnNlIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwiQ29udmVydGVyIiwieCIsIndvcmxkIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwibWFyZ2luUmlnaHQiLCJTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O2lDQUNOQyxFLEVBQUk7QUFDZiw0SUFBc0JDLFNBQXRCO0FBQ0EsVUFBSSxLQUFLQyxTQUFMLENBQWVDLFVBQWYsSUFBNkJDLFNBQWpDLEVBQTRDSixHQUFHSyxZQUFILENBQWdCLE9BQWhCLEVBQXlCLFNBQXpCO0FBQzVDLFVBQU1DLFFBQVEsS0FBS0osU0FBTCxDQUFlSyxjQUFmLEVBQWQ7QUFDQUQsZUFBU0EsTUFBTUUsS0FBTixDQUFZLENBQUMsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFnQ1YsR0FBR00sS0FBbkMsRUFBMEMsSUFBMUMsQ0FBRCxDQUFaLENBQVQ7QUFDRDs7O0VBTmtDSyxtQjs7a0JBQWhCWixPOztJQVNmVyxVOzs7Ozs7Ozs7OzJCQUNHRSxDLEVBQUc7QUFDUixXQUFLQyxLQUFMLEdBQWFELENBQWI7QUFDQSxXQUFLTixLQUFMLENBQVdRLEtBQVgsR0FBc0JGLEVBQUVFLEtBQXhCO0FBQ0EsV0FBS1IsS0FBTCxDQUFXUyxNQUFYLEdBQXVCSCxFQUFFRyxNQUF6QjtBQUNEOzs7MEJBRUtILEMsRUFBRztBQUNQQSxZQUFNLEtBQUtOLEtBQUwsQ0FBV1UsVUFBWCxHQUEyQkosQ0FBM0IsT0FBTjtBQUNEOzs7MEJBRUtBLEMsRUFBRztBQUNQQSxZQUFNLEtBQUtOLEtBQUwsQ0FBV1csU0FBWCxHQUEwQkwsQ0FBMUIsT0FBTjtBQUNEOzs7MEJBRUtBLEMsRUFBRztBQUNQQSxZQUFNLEtBQUtOLEtBQUwsQ0FBV1ksWUFBWCxHQUE2Qk4sQ0FBN0IsT0FBTjtBQUNEOzs7MEJBRUtBLEMsRUFBRztBQUNQQSxZQUFNLEtBQUtOLEtBQUwsQ0FBV2EsV0FBWCxHQUE0QlAsQ0FBNUIsT0FBTjtBQUNEOzs7RUFyQnNCUSxvQkFBTVYsVTs7QUF3Qi9CWCxRQUFRVyxVQUFSLEdBQXFCQSxVQUFyQiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9jb252ZXJ0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3aW5nIGV4dGVuZHMgQ29udmVydGVyIHtcbiAgY29udmVydFN0eWxlKGVsKSB7XG4gICAgc3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQgPT0gdW5kZWZpbmVkKSBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ0RyYXdpbmcnKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKCk7XG4gICAgc3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsIHRoaXMpXSk7XG4gIH1cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXMge1xuICBleHRlbnQoeCkge1xuICAgIHRoaXMud29ybGQgPSB4O1xuICAgIHRoaXMuc3R5bGUud2lkdGggPSBgJHt4LndpZHRofXB4YDtcbiAgICB0aGlzLnN0eWxlLmhlaWdodCA9IGAke3guaGVpZ2h0fXB4YDtcbiAgfVxuXG4gIGRpc3RMKHgpIHtcbiAgICB4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHt4fXB4YCk7XG4gIH1cblxuICBkaXN0VCh4KSB7XG4gICAgeCAmJiAodGhpcy5zdHlsZS5tYXJnaW5Ub3AgPSBgJHt4fXB4YCk7XG4gIH1cblxuICBkaXN0Qih4KSB7XG4gICAgeCAmJiAodGhpcy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBgJHt4fXB4YCk7XG4gIH1cblxuICBkaXN0Uih4KSB7XG4gICAgeCAmJiAodGhpcy5zdHlsZS5tYXJnaW5SaWdodCA9IGAke3h9cHhgKTtcbiAgfVxufVxuXG5EcmF3aW5nLlByb3BlcnRpZXMgPSBQcm9wZXJ0aWVzO1xuIl19