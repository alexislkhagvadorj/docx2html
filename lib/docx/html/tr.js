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

var Tr = function (_Converter) {
  (0, _inherits3.default)(Tr, _Converter);

  function Tr() {
    (0, _classCallCheck3.default)(this, Tr);
    return (0, _possibleConstructorReturn3.default)(this, (Tr.__proto__ || (0, _getPrototypeOf2.default)(Tr)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tr, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Tr.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tr.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'tr';
    }
  }]);
  return Tr;
}(_converter2.default);

exports.default = Tr;

var Properties = function (_Style$RowProperties) {
  (0, _inherits3.default)(Properties, _Style$RowProperties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
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
}(_table2.default.RowProperties);

Tr.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdHIuanMiXSwibmFtZXMiOlsiVHIiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIngiLCJuYW1lcyIsIlByaW9yaXRpemllZFN0eWxlcyIsIlN0eWxlIiwicHJvdG90eXBlIiwibGV2ZWwiLCJ0IiwiaSIsImNoYXJBdCIsInB1c2giLCJUYWJsZVN0eWxlcyIsImluZGV4T2YiLCJsZW5ndGgiLCJUZCIsImFkZENsYXNzIiwicGFyZW50IiwiY29udGVudCIsImpvaW4iLCJzZXRBdHRyaWJ1dGUiLCJSb3dQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBSTtBQUNmLGtJQUFzQkMsU0FBdEI7QUFDQSxVQUFNQyxRQUFRLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFkO0FBQ0FGLGVBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQTBDLElBQTFDLENBQUQsQ0FBWixDQUFUO0FBQ0Q7Ozt3QkFOUztBQUFFLGFBQU8sSUFBUDtBQUFjOzs7RUFESU0sbUI7O2tCQUFYVCxFOztJQVVmUSxVOzs7Ozs7Ozs7OzZCQUNLRSxDLEVBQUc7QUFDVixVQUFNQyxRQUFRLEVBQWQsQ0FEVSxJQUNnQkMsa0JBRGhCLEdBQ3VDQyxnQkFBTUMsU0FEN0MsQ0FDZ0JGLGtCQURoQjtBQUN3RCxVQUFJRyxRQUFRLENBQUMsQ0FBYixDQUFnQixJQUNoRkMsVUFEZ0Y7QUFFbEYsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksRUFBcEIsRUFBd0JBLEdBQXhCLEVBQTZCO0FBQzNCLFlBQUlQLEVBQUVRLE1BQUYsQ0FBU0QsQ0FBVCxLQUFlLEdBQW5CLEVBQXdCO0FBQ3RCTixnQkFBTVEsSUFBTixDQUFXSCxJQUFJSCxnQkFBTU8sV0FBTixDQUFrQkgsQ0FBbEIsQ0FBZjtBQUNBLGNBQUksQ0FBQ0QsSUFBSUosbUJBQW1CUyxPQUFuQixDQUEyQkwsQ0FBM0IsQ0FBTCxJQUFzQ0QsS0FBMUMsRUFBaURBLFFBQVFDLENBQVI7QUFDbEQ7QUFDRjtBQUNETCxZQUFNVyxNQUFOLElBQWdCQyxHQUFHQyxRQUFILENBQVksS0FBS0MsTUFBTCxDQUFZQyxPQUF4QixFQUFpQ2YsTUFBTWdCLElBQU4sQ0FBVyxHQUFYLENBQWpDLENBQWhCO0FBQ0EsV0FBSyxJQUFJVixJQUFJLENBQWIsRUFBZ0JBLElBQUlGLEtBQXBCLEVBQTJCRSxHQUEzQjtBQUFnQyxhQUFLUSxNQUFMLENBQVlDLE9BQVosQ0FBb0JFLFlBQXBCLE9BQXFDWCxDQUFyQyxFQUEwQyxDQUExQztBQUFoQztBQUNEOzs7RUFac0JKLGdCQUFNZ0IsYTs7QUFlL0I3QixHQUFHUSxVQUFILEdBQWdCQSxVQUFoQiIsImZpbGUiOiJ0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInO1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvdGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUciBleHRlbmRzIENvbnZlcnRlciB7XG4gIGdldCB0YWcoKSB7IHJldHVybiAndHInOyB9XG5cbiAgY29udmVydFN0eWxlKGVsKSB7XG4gICAgc3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cyk7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpO1xuICAgIHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLCB0aGlzKV0pO1xuICB9XG59XG5cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Sb3dQcm9wZXJ0aWVzIHtcbiAgY25mU3R5bGUoeCkge1xuICAgIGNvbnN0IG5hbWVzID0gW107IGNvbnN0IHsgUHJpb3JpdGl6aWVkU3R5bGVzIH0gPSBTdHlsZS5wcm90b3R5cGU7IGxldCBsZXZlbCA9IC0xOyBsZXRcbiAgICAgIHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICBpZiAoeC5jaGFyQXQoaSkgPT0gJzEnKSB7XG4gICAgICAgIG5hbWVzLnB1c2godCA9IFN0eWxlLlRhYmxlU3R5bGVzW2ldKTtcbiAgICAgICAgaWYgKCh0ID0gUHJpb3JpdGl6aWVkU3R5bGVzLmluZGV4T2YodCkpID4gbGV2ZWwpIGxldmVsID0gdDtcbiAgICAgIH1cbiAgICB9XG4gICAgbmFtZXMubGVuZ3RoICYmIFRkLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsIG5hbWVzLmpvaW4oJyAnKSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZXZlbDsgaSsrKSB0aGlzLnBhcmVudC5jb250ZW50LnNldEF0dHJpYnV0ZShgeCR7aX1gLCAxKTtcbiAgfVxufVxuXG5Uci5Qcm9wZXJ0aWVzID0gUHJvcGVydGllcztcbiJdfQ==