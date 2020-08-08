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

var Table = function (_Converter) {
  (0, _inherits3.default)(Table, _Converter);

  function Table() {
    (0, _classCallCheck3.default)(this, Table);
    return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));
  }

  (0, _createClass3.default)(Table, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), 'convertStyle', this).apply(this, arguments);
      var width = this.wordModel.getColWidth();var html = ['<colgroup>'];
      for (var i = 0, cols = width.cols, sum = width.sum, len = cols.length; i < len; i++) {
        html.push('<col style="width:' + cols[i] * 100 / sum + '%"/>');
      }html.push('</colgroup>');
      el.innerHTML = html.join('');
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
      var tbody = this.doc.createElement('tbody');
      this.content.appendChild(tbody);
      this.content = tbody;
    }
  }, {
    key: 'getTableSelector',
    value: function getTableSelector() {
      var selector = '#' + (this.content.id ? this.content.id : this.content.id = this.doc.uid());
      var level = _table2.default.prototype.PrioritiziedStyles.length;
      for (var i = 0; i < level; i++) {
        this.content.setAttribute('x' + i, 1);
        selector += '[x' + i + ']';
      }
      return selector + '>tbody';
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'table';
    }
  }]);
  return Table;
}(_converter2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  return Properties;
}(_table2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGFibGUuanMiXSwibmFtZXMiOlsiVGFibGUiLCJlbCIsImFyZ3VtZW50cyIsIndpZHRoIiwid29yZE1vZGVsIiwiZ2V0Q29sV2lkdGgiLCJodG1sIiwiY29scyIsInN1bSIsImxlbiIsImxlbmd0aCIsImkiLCJwdXNoIiwiaW5uZXJIVE1MIiwiam9pbiIsInN0eWxlIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsInRib2R5IiwiZG9jIiwiY3JlYXRlRWxlbWVudCIsImNvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNlbGVjdG9yIiwiaWQiLCJ1aWQiLCJsZXZlbCIsIlN0eWxlIiwicHJvdG90eXBlIiwiUHJpb3JpdGl6aWVkU3R5bGVzIiwic2V0QXR0cmlidXRlIiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBSTtBQUNmLHdJQUFzQkMsU0FBdEI7QUFDQSxVQUFNQyxRQUFRLEtBQUtDLFNBQUwsQ0FBZUMsV0FBZixFQUFkLENBQTRDLElBQzFDQyxPQUFPLENBQUMsWUFBRCxDQURtQztBQUU1QyxXQUFTLFFBQUksQ0FBSixFQUFTQyxJQUFULEdBQWtCSixLQUFsQixDQUFTSSxJQUFULEVBQTJCQyxHQUEzQixHQUFtQ0wsS0FBbkMsQ0FBMkJLLEdBQTNCLEVBQTBDQyxHQUExQyxHQUFnREYsS0FBS0csTUFBOUQsRUFBc0VDLElBQUlGLEdBQTFFLEVBQStFRSxHQUEvRTtBQUFvRkwsYUFBS00sSUFBTCx3QkFBK0JMLEtBQUtJLENBQUwsSUFBVSxHQUFWLEdBQWdCSCxHQUEvQztBQUFwRixPQUNBRixLQUFLTSxJQUFMLENBQVUsYUFBVjtBQUNBWCxTQUFHWSxTQUFILEdBQWVQLEtBQUtRLElBQUwsQ0FBVSxFQUFWLENBQWY7QUFDQSxVQUFNQyxRQUFRLEtBQUtYLFNBQUwsQ0FBZVksY0FBZixFQUFkO0FBQ0FELGVBQVNBLE1BQU1FLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NsQixHQUFHYyxLQUFuQyxFQUEwQyxJQUExQyxDQUFELENBQVosQ0FBVDtBQUNBLFVBQU1LLFFBQVEsS0FBS0MsR0FBTCxDQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWQ7QUFDQSxXQUFLQyxPQUFMLENBQWFDLFdBQWIsQ0FBeUJKLEtBQXpCO0FBQ0EsV0FBS0csT0FBTCxHQUFlSCxLQUFmO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsVUFBSUssa0JBQWUsS0FBS0YsT0FBTCxDQUFhRyxFQUFiLEdBQWtCLEtBQUtILE9BQUwsQ0FBYUcsRUFBL0IsR0FBcUMsS0FBS0gsT0FBTCxDQUFhRyxFQUFiLEdBQWtCLEtBQUtMLEdBQUwsQ0FBU00sR0FBVCxFQUF0RSxDQUFKO0FBQ0EsVUFBTUMsUUFBUUMsZ0JBQU1DLFNBQU4sQ0FBZ0JDLGtCQUFoQixDQUFtQ3JCLE1BQWpEO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlpQixLQUFwQixFQUEyQmpCLEdBQTNCLEVBQWdDO0FBQzlCLGFBQUtZLE9BQUwsQ0FBYVMsWUFBYixPQUE4QnJCLENBQTlCLEVBQW1DLENBQW5DO0FBQ0FjLDJCQUFrQmQsQ0FBbEI7QUFDRDtBQUNELGFBQVVjLFFBQVY7QUFDRDs7O3dCQXhCUztBQUFFLGFBQU8sT0FBUDtBQUFpQjs7O0VBRElRLG1COztrQkFBZGpDLEs7OztBQTRCckJBLE1BQU1tQixVQUFOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxFQUE0Q1UsZ0JBQU1WLFVBQWxEIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgQ29udmVydGVyIHtcbiAgZ2V0IHRhZygpIHsgcmV0dXJuICd0YWJsZSc7IH1cblxuICBjb252ZXJ0U3R5bGUoZWwpIHtcbiAgICBzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMud29yZE1vZGVsLmdldENvbFdpZHRoKCk7IGNvbnN0XG4gICAgICBodG1sID0gWyc8Y29sZ3JvdXA+J107XG4gICAgZm9yIChsZXQgaSA9IDAsIHsgY29scyB9ID0gd2lkdGgsIHsgc3VtIH0gPSB3aWR0aCwgbGVuID0gY29scy5sZW5ndGg7IGkgPCBsZW47IGkrKykgaHRtbC5wdXNoKGA8Y29sIHN0eWxlPVwid2lkdGg6JHtjb2xzW2ldICogMTAwIC8gc3VtfSVcIi8+YCk7XG4gICAgaHRtbC5wdXNoKCc8L2NvbGdyb3VwPicpO1xuICAgIGVsLmlubmVySFRNTCA9IGh0bWwuam9pbignJyk7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpO1xuICAgIHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLCB0aGlzKV0pO1xuICAgIGNvbnN0IHRib2R5ID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGJvZHkpO1xuICAgIHRoaXMuY29udGVudCA9IHRib2R5O1xuICB9XG5cbiAgZ2V0VGFibGVTZWxlY3RvcigpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSBgIyR7dGhpcy5jb250ZW50LmlkID8gdGhpcy5jb250ZW50LmlkIDogKHRoaXMuY29udGVudC5pZCA9IHRoaXMuZG9jLnVpZCgpKX1gO1xuICAgIGNvbnN0IGxldmVsID0gU3R5bGUucHJvdG90eXBlLlByaW9yaXRpemllZFN0eWxlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXZlbDsgaSsrKSB7XG4gICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGB4JHtpfWAsIDEpO1xuICAgICAgc2VsZWN0b3IgKz0gKGBbeCR7aX1dYCk7XG4gICAgfVxuICAgIHJldHVybiBgJHtzZWxlY3Rvcn0+dGJvZHlgO1xuICB9XG59XG5cblRhYmxlLlByb3BlcnRpZXMgPSBjbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllcyB7XG5cbn07XG4iXX0=