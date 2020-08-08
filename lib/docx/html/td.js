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

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Td = function (_Converter) {
  (0, _inherits3.default)(Td, _Converter);

  function Td() {
    (0, _classCallCheck3.default)(this, Td);
    return (0, _possibleConstructorReturn3.default)(this, (Td.__proto__ || (0, _getPrototypeOf2.default)(Td)).apply(this, arguments));
  }

  (0, _createClass3.default)(Td, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Td.prototype.__proto__ || (0, _getPrototypeOf2.default)(Td.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'td';
    }
  }]);
  return Td;
}(_converter2.default);

exports.default = Td;

var Properties = function (_Style$CellProperties) {
  (0, _inherits3.default)(Properties, _Style$CellProperties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'tcBorders',
    value: function tcBorders(x) {
      x.left && (this.style.borderLeft = this._border(x.left));
      x.right && (this.style.borderRight = this._border(x.right));
      x.top && (this.style.borderTop = this._border(x.top));
      x.bottom && (this.style.borderBottom = this._border(x.bottom));
    }
  }, {
    key: 'cnfStyle',
    value: function cnfStyle(x) {
      var names = [];var PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles;
      var level = -1;var t = void 0;
      for (var i = 0; i < 12; i++) {
        if (x.charAt(i) == '1') {
          names.push(t = _table2.default.TableStyles[i]);
          if ((t = PrioritiziedStyles.indexOf(t)) > level) level = t;
        }
      }
      names.length && Td.addClass(this.parent.content, names.join(' '));
      for (var i = 0; i < level; i++) {
        this.parent.content.setAttribute('x' + i, 1);
      }
    }
  }]);
  return Properties;
}(_table2.default.CellProperties);

Td.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGQuanMiXSwibmFtZXMiOlsiVGQiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIngiLCJsZWZ0IiwiYm9yZGVyTGVmdCIsIl9ib3JkZXIiLCJyaWdodCIsImJvcmRlclJpZ2h0IiwidG9wIiwiYm9yZGVyVG9wIiwiYm90dG9tIiwiYm9yZGVyQm90dG9tIiwibmFtZXMiLCJQcmlvcml0aXppZWRTdHlsZXMiLCJTdHlsZSIsInByb3RvdHlwZSIsImxldmVsIiwidCIsImkiLCJjaGFyQXQiLCJwdXNoIiwiVGFibGVTdHlsZXMiLCJpbmRleE9mIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJjb250ZW50Iiwiam9pbiIsInNldEF0dHJpYnV0ZSIsIkNlbGxQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBSTtBQUNmLGtJQUFzQkMsU0FBdEI7QUFDQSxVQUFNQyxRQUFRLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFkO0FBQ0FGLGVBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQTBDLElBQTFDLENBQUQsQ0FBWixDQUFUO0FBQ0Q7Ozt3QkFOUztBQUFFLGFBQU8sSUFBUDtBQUFjOzs7RUFESU0sbUI7O2tCQUFYVCxFOztJQVVmUSxVOzs7Ozs7Ozs7OzhCQUNNRSxDLEVBQUc7QUFDWEEsUUFBRUMsSUFBRixLQUFXLEtBQUtSLEtBQUwsQ0FBV1MsVUFBWCxHQUF3QixLQUFLQyxPQUFMLENBQWFILEVBQUVDLElBQWYsQ0FBbkM7QUFDQUQsUUFBRUksS0FBRixLQUFZLEtBQUtYLEtBQUwsQ0FBV1ksV0FBWCxHQUF5QixLQUFLRixPQUFMLENBQWFILEVBQUVJLEtBQWYsQ0FBckM7QUFDQUosUUFBRU0sR0FBRixLQUFVLEtBQUtiLEtBQUwsQ0FBV2MsU0FBWCxHQUF1QixLQUFLSixPQUFMLENBQWFILEVBQUVNLEdBQWYsQ0FBakM7QUFDQU4sUUFBRVEsTUFBRixLQUFhLEtBQUtmLEtBQUwsQ0FBV2dCLFlBQVgsR0FBMEIsS0FBS04sT0FBTCxDQUFhSCxFQUFFUSxNQUFmLENBQXZDO0FBQ0Q7Ozs2QkFFUVIsQyxFQUFHO0FBQ1YsVUFBTVUsUUFBUSxFQUFkLENBRFUsSUFDZ0JDLGtCQURoQixHQUN1Q0MsZ0JBQU1DLFNBRDdDLENBQ2dCRixrQkFEaEI7QUFDd0QsVUFBSUcsUUFBUSxDQUFDLENBQWIsQ0FBZ0IsSUFDaEZDLFVBRGdGO0FBRWxGLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEVBQXBCLEVBQXdCQSxHQUF4QixFQUE2QjtBQUMzQixZQUFJaEIsRUFBRWlCLE1BQUYsQ0FBU0QsQ0FBVCxLQUFlLEdBQW5CLEVBQXdCO0FBQ3RCTixnQkFBTVEsSUFBTixDQUFXSCxJQUFJSCxnQkFBTU8sV0FBTixDQUFrQkgsQ0FBbEIsQ0FBZjtBQUNBLGNBQUksQ0FBQ0QsSUFBSUosbUJBQW1CUyxPQUFuQixDQUEyQkwsQ0FBM0IsQ0FBTCxJQUFzQ0QsS0FBMUMsRUFBaURBLFFBQVFDLENBQVI7QUFDbEQ7QUFDRjtBQUNETCxZQUFNVyxNQUFOLElBQWdCL0IsR0FBR2dDLFFBQUgsQ0FBWSxLQUFLQyxNQUFMLENBQVlDLE9BQXhCLEVBQWlDZCxNQUFNZSxJQUFOLENBQVcsR0FBWCxDQUFqQyxDQUFoQjtBQUNBLFdBQUssSUFBSVQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixLQUFwQixFQUEyQkUsR0FBM0I7QUFBZ0MsYUFBS08sTUFBTCxDQUFZQyxPQUFaLENBQW9CRSxZQUFwQixPQUFxQ1YsQ0FBckMsRUFBMEMsQ0FBMUM7QUFBaEM7QUFDRDs7O0VBbkJzQkosZ0JBQU1lLGM7O0FBc0IvQnJDLEdBQUdRLFVBQUgsR0FBZ0JBLFVBQWhCIiwiZmlsZSI6InRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRkIGV4dGVuZHMgQ29udmVydGVyIHtcbiAgZ2V0IHRhZygpIHsgcmV0dXJuICd0ZCc7IH1cblxuICBjb252ZXJ0U3R5bGUoZWwpIHtcbiAgICBzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKCk7XG4gICAgc3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsIHRoaXMpXSk7XG4gIH1cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLkNlbGxQcm9wZXJ0aWVzIHtcbiAgdGNCb3JkZXJzKHgpIHtcbiAgICB4LmxlZnQgJiYgKHRoaXMuc3R5bGUuYm9yZGVyTGVmdCA9IHRoaXMuX2JvcmRlcih4LmxlZnQpKTtcbiAgICB4LnJpZ2h0ICYmICh0aGlzLnN0eWxlLmJvcmRlclJpZ2h0ID0gdGhpcy5fYm9yZGVyKHgucmlnaHQpKTtcbiAgICB4LnRvcCAmJiAodGhpcy5zdHlsZS5ib3JkZXJUb3AgPSB0aGlzLl9ib3JkZXIoeC50b3ApKTtcbiAgICB4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5ib3JkZXJCb3R0b20gPSB0aGlzLl9ib3JkZXIoeC5ib3R0b20pKTtcbiAgfVxuXG4gIGNuZlN0eWxlKHgpIHtcbiAgICBjb25zdCBuYW1lcyA9IFtdOyBjb25zdCB7IFByaW9yaXRpemllZFN0eWxlcyB9ID0gU3R5bGUucHJvdG90eXBlOyBsZXQgbGV2ZWwgPSAtMTsgbGV0XG4gICAgICB0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgaWYgKHguY2hhckF0KGkpID09ICcxJykge1xuICAgICAgICBuYW1lcy5wdXNoKHQgPSBTdHlsZS5UYWJsZVN0eWxlc1tpXSk7XG4gICAgICAgIGlmICgodCA9IFByaW9yaXRpemllZFN0eWxlcy5pbmRleE9mKHQpKSA+IGxldmVsKSBsZXZlbCA9IHQ7XG4gICAgICB9XG4gICAgfVxuICAgIG5hbWVzLmxlbmd0aCAmJiBUZC5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCBuYW1lcy5qb2luKCcgJykpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGV2ZWw7IGkrKykgdGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoYHgke2l9YCwgMSk7XG4gIH1cbn1cblxuVGQuUHJvcGVydGllcyA9IFByb3BlcnRpZXM7XG4iXX0=