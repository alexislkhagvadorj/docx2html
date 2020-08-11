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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
the priority of css rule should be aligned with word
*/

var gRow = /row|horz/i;

var Table = function (_Style) {
  (0, _inherits3.default)(Table, _Style);

  function Table() {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));

    _this.target = _this.wordModel.getTarget();
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter(category) {
      if (this[category]) return this[category];

      var selector = this.getTableSelector() + '>' + (gRow.test(this.target) ? '.' + this.getPrioritizedSelector() + '>td' : 'tr>.' + this.getPrioritizedSelector());
      switch (category) {
        case 'table':
          return this[category] = new this.constructor.Properties(this.doc.createStyle(this.getTableSelector().replace(/\>\s*tbody$/i, '')), this);
        case 'inline':
          // 0012
          return this[category] = new _inline2.default.Properties(this.doc.createStyle(selector + ' span'));
        case 'paragraph':
          // 0012
          return this[category] = new _paragraph2.default.Properties(this.doc.createStyle(selector + ' p'));
        case 'cell':
          // 0011
          return this[category] = new this.constructor.CellProperties(this.doc.createStyle(selector), this);
      }
    }
  }, {
    key: 'getTableSelector',
    value: function getTableSelector() {
      return '.' + _converter2.default.asCssID(this.wordModel.id) + '>tbody';
    }
  }, {
    key: 'getPrioritizedSelector',
    value: function getPrioritizedSelector() {
      var selector = this.target;
      for (var level = this.PrioritiziedStyles.indexOf(this.target), i = 0; i < level; i++) {
        selector = selector + '[x' + i + ']';
      }return selector;
    }
  }, {
    key: 'PrioritiziedStyles',
    get: function get() {
      return 'nwCell,neCell,swCell,seCell,firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz'.split(',').reverse();
    }
  }]);
  return Table;
}(_converter2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties(style, parent) {
    (0, _classCallCheck3.default)(this, Properties);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

    _this2.parent = parent;
    _this2.doc = parent.doc;
    _this2.tableSelector = parent.getTableSelector();
    return _this2;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'tblBorders',
    value: function tblBorders(x) {
      x.left && (this.doc.createStyle(this.tableSelector + '>tr>td:first-child').borderLeft = this._border(x.left)); // 0012
      x.right && (this.doc.createStyle(this.tableSelector + '>tr>td:last-child').borderRight = this._border(x.right)); // 0012
      x.top && (this.doc.createStyle(this.tableSelector + '>tr:first-of-type>td').borderTop = this._border(x.top)); // 0012
      x.bottom && (this.doc.createStyle(this.tableSelector + '>tr:last-of-type>td').borderBottom = this._border(x.bottom)); // 0012

      if (x.insideV) {
        var css = this._border(x.insideV);
        var style = this.doc.createStyle(this.tableSelector + '>tr>td:not(:first-child):not(:last-child)'); // 0022
        style.borderRight = style.borderLeft = css;
        this.doc.createStyle(this.tableSelector + '>tr>td:last-child').borderLeft = css; // 0012
        this.doc.createStyle(this.tableSelector + '>tr>td:first-child').borderRight = css; // 0012
      }

      if (x.insideH) {
        var css = this._border(x.insideH);
        var style = this.doc.createStyle(this.tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>td'); // 0022
        style.borderTop = style.borderBottom = css;
        this.doc.createStyle(this.tableSelector + '>tr:last-of-type>td').borderTop = css; // 0012
        this.doc.createStyle(this.tableSelector + '>tr:first-of-type>td').borderBottom = css; // 0012
      }
    }
  }, {
    key: 'tblCellMar',
    value: function tblCellMar(x) {
      for (var i in x) {
        this.doc.createStyle(this.tableSelector + '>tr>td')['padding' + this.upperFirst(i)] = (x[i] < 1 && x[i] > 0 ? 1 : x[i]) + 'px';
      } // 0002
    }
  }, {
    key: 'tblInd',
    value: function tblInd(x) {
      x && (this.style.marginLeft = x + 'px');
    }
  }, {
    key: 'tblW',
    value: function tblW(x) {
      x && x != 'auto' && (this.style.width = x);
    }
  }]);
  return Properties;
}(_converter2.default.Properties);

Table.RowProperties = function (_Style$Properties2) {
  (0, _inherits3.default)(RowProperties, _Style$Properties2);

  function RowProperties(style, parent) {
    (0, _classCallCheck3.default)(this, RowProperties);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (RowProperties.__proto__ || (0, _getPrototypeOf2.default)(RowProperties)).apply(this, arguments));

    _this3.parent = parent;
    _this3.doc = parent.doc;
    return _this3;
  }

  return RowProperties;
}(_converter2.default.Properties);

Table.CellProperties = function (_Style$Properties3) {
  (0, _inherits3.default)(CellProperties, _Style$Properties3);

  function CellProperties(style, parent) {
    (0, _classCallCheck3.default)(this, CellProperties);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (CellProperties.__proto__ || (0, _getPrototypeOf2.default)(CellProperties)).apply(this, arguments));

    _this4.parent = parent;
    _this4.doc = parent.doc;
    return _this4;
  }

  (0, _createClass3.default)(CellProperties, [{
    key: 'tcBorders',
    value: function tcBorders(x) {
      var tableSelector = this.parent.getTableSelector();var selector = this.parent.getPrioritizedSelector();
      switch (this.parent.target) {
        case 'firstRow':
        case 'lastRow':
        case 'band1Horz':
        case 'band2Horz':
          var style;
          x.left && (this.doc.createStyle(tableSelector + '>.' + selector + '>td:first-child').borderLeft = this._border(x.left)); // 0021
          x.right && (this.doc.createStyle(tableSelector + '>.' + selector + '>td:last-child').borderRight = this._border(x.right)); // 0021
          x.top && (this.doc.createStyle(tableSelector + '>.' + selector + '>td').borderTop = this._border(x.top)); // 0011
          x.bottom && (this.doc.createStyle(tableSelector + '>.' + selector + '>td').borderBottom = this._border(x.bottom)); /// /0011
          x.insideV && ((style = this.doc.createStyle(tableSelector + '>.' + selector + '>td:not(:first-child):not(:last-child)')).borderRight = style.borderLeft = this._border(x.insideV)); // 0031
          break;
        case 'firstCol':
        case 'lastCol':
        case 'band2Vert':
        case 'band1Vert':
          x.top && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderTop = this._border(x.top)); // 0021
          x.left && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderLeft = this._border(x.left)); // 0021
          x.right && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderRight = this._border(x.right)); // 0021

          x.bottom && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderBottom = this._border(x.bottom)); // 0021
          x.left && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderLeft = this._border(x.left)); // 0021
          x.right && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderRight = this._border(x.right)); // 0021

          x.left && (this.doc.createStyle(tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>.' + selector).borderLeft = this._border(x.left)); // 0031
          x.right && (this.doc.createStyle(tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>.' + selector).borderRight = this._border(x.right)); // 0031
          break;
        default:
          x.left && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderLeft = this._border(x.left)); // 0011
          x.right && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderRight = this._border(x.right)); // 0011
          x.top && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderTop = this._border(x.top)); // 0011
          x.bottom && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderBottom = this._border(x.bottom)); // 0011
      }
    }
  }, {
    key: 'shd',
    value: function shd(x) {
      if (x != '#000000') this.style.backgroundColor = x;
    }
  }, {
    key: 'gridSpan',
    value: function gridSpan(x) {
      this.parent.content.setAttribute('colspan', x);
    }
  }]);
  return CellProperties;
}(_converter2.default.Properties);

Table.TableStyles = 'firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz,neCell,nwCell,seCell,swCell'.split(',');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiZ1JvdyIsIlRhYmxlIiwiYXJndW1lbnRzIiwidGFyZ2V0Iiwid29yZE1vZGVsIiwiZ2V0VGFyZ2V0IiwiY2F0ZWdvcnkiLCJzZWxlY3RvciIsImdldFRhYmxlU2VsZWN0b3IiLCJ0ZXN0IiwiZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImRvYyIsImNyZWF0ZVN0eWxlIiwicmVwbGFjZSIsIklubGluZSIsIlBhcmFncmFwaCIsIkNlbGxQcm9wZXJ0aWVzIiwiU3R5bGUiLCJhc0Nzc0lEIiwiaWQiLCJsZXZlbCIsIlByaW9yaXRpemllZFN0eWxlcyIsImluZGV4T2YiLCJpIiwic3BsaXQiLCJyZXZlcnNlIiwic3R5bGUiLCJwYXJlbnQiLCJ0YWJsZVNlbGVjdG9yIiwieCIsImxlZnQiLCJib3JkZXJMZWZ0IiwiX2JvcmRlciIsInJpZ2h0IiwiYm9yZGVyUmlnaHQiLCJ0b3AiLCJib3JkZXJUb3AiLCJib3R0b20iLCJib3JkZXJCb3R0b20iLCJpbnNpZGVWIiwiY3NzIiwiaW5zaWRlSCIsInVwcGVyRmlyc3QiLCJtYXJnaW5MZWZ0Iiwid2lkdGgiLCJSb3dQcm9wZXJ0aWVzIiwiYmFja2dyb3VuZENvbG9yIiwiY29udGVudCIsInNldEF0dHJpYnV0ZSIsIlRhYmxlU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFNQSxPQUFPLFdBQWI7O0lBQ3FCQyxLOzs7QUFDbkIsbUJBQWM7QUFBQTs7QUFBQSxxSUFDSEMsU0FERzs7QUFFWixVQUFLQyxNQUFMLEdBQWMsTUFBS0MsU0FBTCxDQUFlQyxTQUFmLEVBQWQ7QUFGWTtBQUdiOzs7OzRDQU11QkMsUSxFQUFVO0FBQ2hDLFVBQUksS0FBS0EsUUFBTCxDQUFKLEVB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QTZDUztBQUNMLFVBQUlBLEtBQUssU0FBVCxFQUFvQixLQUFLSCxLQUFMLENBQVdvQixlQUFYLEdBQTZCakIsQ0FBN0I7QUFDckI7QUEvQ0g7QUFBQTtBQUFBLDZCQWlEV0EsQ0FqRFgsRUFpRGM7QUFDVixXQUFLRixNQUFMLENBQVlvQixPQUFaLENBQW9CQyxZQUFwQixDQUFpQyxTQUFqQyxFQUE0Q25CLENBQTVDO0FBQ0Q7QUFuREg7QUFBQTtBQUFBLEVBQW9EWixvQkFBTVAsVUFBMUQ7O0FBc0RBWCxNQUFNa0QsV0FBTixHQUFvQix3R0FBd0d6QixLQUF4RyxDQUE4RyxHQUE5RyxDQUFwQiIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJztcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnO1xuXG4vKlxudGhlIHByaW9yaXR5IG9mIGNzcyBydWxlIHNob3VsZCBiZSBhbGlnbmVkIHdpdGggd29yZFxuKi9cblxuY29uc3QgZ1JvdyA9IC9yb3d8aG9yei9pO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdHlsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLndvcmRNb2RlbC5nZXRUYXJnZXQoKTtcbiAgfVxuXG4gIGdldCBQcmlvcml0aXppZWRTdHlsZXMoKSB7XG4gICAgcmV0dXJuICdud0NlbGwsbmVDZWxsLHN3Q2VsbCxzZUNlbGwsZmlyc3RSb3csbGFzdFJvdyxmaXJzdENvbCxsYXN0Q29sLGJhbmQxVmVydCxiYW5kMlZlcnQsYmFuZDFIb3J6LGJhbmQySG9yeicuc3BsaXQoJywnKS5yZXZlcnNlKCk7XG4gIH1cblxuICBfZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSkge1xuICAgIGlmICh0aGlzW2NhdGVnb3J5XSkgcmV0dXJuIHRoaXNbY2F0ZWdvcnldO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgJHt0aGlzLmdldFRhYmxlU2VsZWN0b3IoKX0+JHtnUm93LnRlc3QodGhpcy50YXJnZXQpID8gYC4ke3RoaXMuZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvcigpfT50ZGAgOiBgdHI+LiR7dGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCl9YH1gO1xuICAgIHN3aXRjaCAoY2F0ZWdvcnkpIHtcbiAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgcmV0dXJuIHRoaXNbY2F0ZWdvcnldID0gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLmdldFRhYmxlU2VsZWN0b3IoKS5yZXBsYWNlKC9cXD5cXHMqdGJvZHkkL2ksICcnKSksIHRoaXMpO1xuICAgICAgY2FzZSAnaW5saW5lJzovLyAwMDEyXG4gICAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XSA9IG5ldyBJbmxpbmUuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHtzZWxlY3Rvcn0gc3BhbmApKTtcbiAgICAgIGNhc2UgJ3BhcmFncmFwaCc6Ly8gMDAxMlxuICAgICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV0gPSBuZXcgUGFyYWdyYXBoLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7c2VsZWN0b3J9IHBgKSk7XG4gICAgICBjYXNlICdjZWxsJzovLyAwMDExXG4gICAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yLkNlbGxQcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGFibGVTZWxlY3RvcigpIHtcbiAgICByZXR1cm4gYC4ke1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpfT50Ym9keWA7XG4gIH1cblxuICBnZXRQcmlvcml0aXplZFNlbGVjdG9yKCkge1xuICAgIGxldCBzZWxlY3RvciA9IHRoaXMudGFyZ2V0O1xuICAgIGZvciAobGV0IGxldmVsID0gdGhpcy5Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZih0aGlzLnRhcmdldCksIGkgPSAwOyBpIDwgbGV2ZWw7IGkrKykgc2VsZWN0b3IgPSBgJHtzZWxlY3Rvcn1beCR7aX1dYDtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbn1cblxuVGFibGUuUHJvcGVydGllcyA9IGNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVzIHtcbiAgY29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5kb2MgPSBwYXJlbnQuZG9jO1xuICAgIHRoaXMudGFibGVTZWxlY3RvciA9IHBhcmVudC5nZXRUYWJsZVNlbGVjdG9yKCk7XG4gIH1cblxuICB0YmxCb3JkZXJzKHgpIHtcbiAgICB4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RoaXMudGFibGVTZWxlY3Rvcn0+dHI+dGQ6Zmlyc3QtY2hpbGRgKS5ib3JkZXJMZWZ0ID0gdGhpcy5fYm9yZGVyKHgubGVmdCkpOyAvLyAwMDEyXG4gICAgeC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGhpcy50YWJsZVNlbGVjdG9yfT50cj50ZDpsYXN0LWNoaWxkYCkuYm9yZGVyUmlnaHQgPSB0aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vIDAwMTJcbiAgICB4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGhpcy50YWJsZVNlbGVjdG9yfT50cjpmaXJzdC1vZi10eXBlPnRkYCkuYm9yZGVyVG9wID0gdGhpcy5fYm9yZGVyKHgudG9wKSk7Ly8gMDAxMlxuICAgIHguYm90dG9tICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHt0aGlzLnRhYmxlU2VsZWN0b3J9PnRyOmxhc3Qtb2YtdHlwZT50ZGApLmJvcmRlckJvdHRvbSA9IHRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vIDAwMTJcblxuICAgIGlmICh4Lmluc2lkZVYpIHtcbiAgICAgIHZhciBjc3MgPSB0aGlzLl9ib3JkZXIoeC5pbnNpZGVWKTtcbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RoaXMudGFibGVTZWxlY3Rvcn0+dHI+dGQ6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKWApOy8vIDAwMjJcbiAgICAgIHN0eWxlLmJvcmRlclJpZ2h0ID0gc3R5bGUuYm9yZGVyTGVmdCA9IGNzcztcbiAgICAgIHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RoaXMudGFibGVTZWxlY3Rvcn0+dHI+dGQ6bGFzdC1jaGlsZGApLmJvcmRlckxlZnQgPSBjc3M7Ly8gMDAxMlxuICAgICAgdGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGhpcy50YWJsZVNlbGVjdG9yfT50cj50ZDpmaXJzdC1jaGlsZGApLmJvcmRlclJpZ2h0ID0gY3NzOy8vIDAwMTJcbiAgICB9XG5cbiAgICBpZiAoeC5pbnNpZGVIKSB7XG4gICAgICB2YXIgY3NzID0gdGhpcy5fYm9yZGVyKHguaW5zaWRlSCk7XG4gICAgICB2YXIgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHt0aGlzLnRhYmxlU2VsZWN0b3J9PnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPnRkYCk7Ly8gMDAyMlxuICAgICAgc3R5bGUuYm9yZGVyVG9wID0gc3R5bGUuYm9yZGVyQm90dG9tID0gY3NzO1xuICAgICAgdGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGhpcy50YWJsZVNlbGVjdG9yfT50cjpsYXN0LW9mLXR5cGU+dGRgKS5ib3JkZXJUb3AgPSBjc3M7Ly8gMDAxMlxuICAgICAgdGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGhpcy50YWJsZVNlbGVjdG9yfT50cjpmaXJzdC1vZi10eXBlPnRkYCkuYm9yZGVyQm90dG9tID0gY3NzOy8vIDAwMTJcbiAgICB9XG4gIH1cblxuICB0YmxDZWxsTWFyKHgpIHtcbiAgICBmb3IgKGNvbnN0IGkgaW4geCkgdGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGhpcy50YWJsZVNlbGVjdG9yfT50cj50ZGApW2BwYWRkaW5nJHt0aGlzLnVwcGVyRmlyc3QoaSl9YF0gPSBgJHt4W2ldIDwgMSAmJiB4W2ldID4gMCA/IDEgOiB4W2ldfXB4YDsvLyAwMDAyXG4gIH1cblxuICB0YmxJbmQoeCkge1xuICAgIHggJiYgKHRoaXMuc3R5bGUubWFyZ2luTGVmdCA9IGAke3h9cHhgKTtcbiAgfVxuXG4gIHRibFcoeCkge1xuICAgIHggJiYgeCAhPSAnYXV0bycgJiYgKHRoaXMuc3R5bGUud2lkdGggPSB4KTtcbiAgfVxufTtcblxuVGFibGUuUm93UHJvcGVydGllcyA9IGNsYXNzIFJvd1Byb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVzIHtcbiAgY29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5kb2MgPSBwYXJlbnQuZG9jO1xuICB9XG59O1xuXG5UYWJsZS5DZWxsUHJvcGVydGllcyA9IGNsYXNzIENlbGxQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllcyB7XG4gIGNvbnN0cnVjdG9yKHN0eWxlLCBwYXJlbnQpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuZG9jID0gcGFyZW50LmRvYztcbiAgfVxuXG4gIHRjQm9yZGVycyh4KSB7XG4gICAgY29uc3QgdGFibGVTZWxlY3RvciA9IHRoaXMucGFyZW50LmdldFRhYmxlU2VsZWN0b3IoKTsgY29uc3RcbiAgICAgIHNlbGVjdG9yID0gdGhpcy5wYXJlbnQuZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvcigpO1xuICAgIHN3aXRjaCAodGhpcy5wYXJlbnQudGFyZ2V0KSB7XG4gICAgICBjYXNlICdmaXJzdFJvdyc6XG4gICAgICBjYXNlICdsYXN0Um93JzpcbiAgICAgIGNhc2UgJ2JhbmQxSG9yeic6XG4gICAgICBjYXNlICdiYW5kMkhvcnonOlxuICAgICAgICB2YXIgc3R5bGU7XG4gICAgICAgIHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGFibGVTZWxlY3Rvcn0+LiR7c2VsZWN0b3J9PnRkOmZpcnN0LWNoaWxkYCkuYm9yZGVyTGVmdCA9IHRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLyAwMDIxXG4gICAgICAgIHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9Pi4ke3NlbGVjdG9yfT50ZDpsYXN0LWNoaWxkYCkuYm9yZGVyUmlnaHQgPSB0aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vIDAwMjFcbiAgICAgICAgeC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9Pi4ke3NlbGVjdG9yfT50ZGApLmJvcmRlclRvcCA9IHRoaXMuX2JvcmRlcih4LnRvcCkpOy8vIDAwMTFcbiAgICAgICAgeC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9Pi4ke3NlbGVjdG9yfT50ZGApLmJvcmRlckJvdHRvbSA9IHRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vLyAvMDAxMVxuICAgICAgICB4Lmluc2lkZVYgJiYgKChzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9Pi4ke3NlbGVjdG9yfT50ZDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpYCkpLmJvcmRlclJpZ2h0ID0gc3R5bGUuYm9yZGVyTGVmdCA9IHRoaXMuX2JvcmRlcih4Lmluc2lkZVYpKTsvLyAwMDMxXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlyc3RDb2wnOlxuICAgICAgY2FzZSAnbGFzdENvbCc6XG4gICAgICBjYXNlICdiYW5kMlZlcnQnOlxuICAgICAgY2FzZSAnYmFuZDFWZXJ0JzpcbiAgICAgICAgeC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyOmZpcnN0LW9mLXR5cGU+LiR7c2VsZWN0b3J9YCkuYm9yZGVyVG9wID0gdGhpcy5fYm9yZGVyKHgudG9wKSk7Ly8gMDAyMVxuICAgICAgICB4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyOmZpcnN0LW9mLXR5cGU+LiR7c2VsZWN0b3J9YCkuYm9yZGVyTGVmdCA9IHRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLyAwMDIxXG4gICAgICAgIHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyOmZpcnN0LW9mLXR5cGU+LiR7c2VsZWN0b3J9YCkuYm9yZGVyUmlnaHQgPSB0aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vIDAwMjFcblxuICAgICAgICB4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGFibGVTZWxlY3Rvcn0+dHI6bGFzdC1vZi10eXBlPi4ke3NlbGVjdG9yfWApLmJvcmRlckJvdHRvbSA9IHRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vIDAwMjFcbiAgICAgICAgeC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHt0YWJsZVNlbGVjdG9yfT50cjpsYXN0LW9mLXR5cGU+LiR7c2VsZWN0b3J9YCkuYm9yZGVyTGVmdCA9IHRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLyAwMDIxXG4gICAgICAgIHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyOmxhc3Qtb2YtdHlwZT4uJHtzZWxlY3Rvcn1gKS5ib3JkZXJSaWdodCA9IHRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8gMDAyMVxuXG4gICAgICAgIHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGFibGVTZWxlY3Rvcn0+dHI6bm90KDpmaXJzdC1vZi10eXBlKTpub3QoOmxhc3Qtb2YtdHlwZSk+LiR7c2VsZWN0b3J9YCkuYm9yZGVyTGVmdCA9IHRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLyAwMDMxXG4gICAgICAgIHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPi4ke3NlbGVjdG9yfWApLmJvcmRlclJpZ2h0ID0gdGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLyAwMDMxXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgeC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZShgJHt0YWJsZVNlbGVjdG9yfT50cj4uJHtzZWxlY3Rvcn1gKS5ib3JkZXJMZWZ0ID0gdGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vIDAwMTFcbiAgICAgICAgeC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUoYCR7dGFibGVTZWxlY3Rvcn0+dHI+LiR7c2VsZWN0b3J9YCkuYm9yZGVyUmlnaHQgPSB0aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vIDAwMTFcbiAgICAgICAgeC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyPi4ke3NlbGVjdG9yfWApLmJvcmRlclRvcCA9IHRoaXMuX2JvcmRlcih4LnRvcCkpOy8vIDAwMTFcbiAgICAgICAgeC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAke3RhYmxlU2VsZWN0b3J9PnRyPi4ke3NlbGVjdG9yfWApLmJvcmRlckJvdHRvbSA9IHRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vIDAwMTFcbiAgICB9XG4gIH1cblxuICBzaGQoeCkge1xuICAgIGlmICh4ICE9ICcjMDAwMDAwJykgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB4O1xuICB9XG5cbiAgZ3JpZFNwYW4oeCkge1xuICAgIHRoaXMucGFyZW50LmNvbnRlbnQuc2V0QXR0cmlidXRlKCdjb2xzcGFuJywgeCk7XG4gIH1cbn07XG5cblRhYmxlLlRhYmxlU3R5bGVzID0gJ2ZpcnN0Um93LGxhc3RSb3csZmlyc3RDb2wsbGFzdENvbCxiYW5kMVZlcnQsYmFuZDJWZXJ0LGJhbmQxSG9yeixiYW5kMkhvcnosbmVDZWxsLG53Q2VsbCxzZUNlbGwsc3dDZWxsJy5zcGxpdCgnLCcpO1xuIl19