'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphic = function (_Drawing) {
  (0, _inherits3.default)(Graphic, _Drawing);

  function Graphic() {
    (0, _classCallCheck3.default)(this, Graphic);
    return (0, _possibleConstructorReturn3.default)(this, (Graphic.__proto__ || (0, _getPrototypeOf2.default)(Graphic)).apply(this, arguments));
  }

  (0, _createClass3.default)(Graphic, [{
    key: 'tag',
    get: function get() {
      return 'span';
    }
  }]);
  return Graphic;
}(_drawing2.default);

exports.default = Graphic;

var Properties = function (_Drawing$Properties) {
  (0, _inherits3.default)(Properties, _Drawing$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'solidFill',
    value: function solidFill(x) {
      this.style.backgroundColor = x;
    }
  }, {
    key: 'gradFill',
    value: function gradFill(x) {}
  }, {
    key: 'noFill',
    value: function noFill(x) {
      this.style.background = 'transparent';
    }
  }, {
    key: 'fillRef',
    value: function fillRef(x) {
      switch (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) {
        case 'string':
          return this.solidFill(x);
        case 'object':
          return this.gradFill(x);
        case 'number':
          return this.noFill(x);
      }
    }
  }, {
    key: 'ln',
    value: function ln(x) {
      x.color && (this.style.borderColor = x.color);
      x.width && (this.style.borderWidth = x.width + 'px', this.style.borderStyle = 'solid');
      x.dash && (this.style.borderStyle = this.lineStyle(x.dash));
      x.cap === 'rnd' && (this.style.borderRadius = x.width * 2 + 'px');
    }
  }, {
    key: 'xfrm',
    value: function xfrm(x) {
      this.style.width = x.width + 'px';
      this.style.height = x.height + 'px';
      x.x && (this.style.left = x.x + 'px');
      x.y && (this.style.top = x.y + 'px');
    }
  }]);
  return Properties;
}(_drawing2.default.Properties);

Graphic.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6WyJHcmFwaGljIiwiRHJhd2luZyIsIlByb3BlcnRpZXMiLCJ4Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kIiwic29saWRGaWxsIiwiZ3JhZEZpbGwiLCJub0ZpbGwiLCJjb2xvciIsImJvcmRlckNvbG9yIiwid2lkdGgiLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiZGFzaCIsImxpbmVTdHlsZSIsImNhcCIsImJvcmRlclJhZGl1cyIsImhlaWdodCIsImxlZnQiLCJ5IiwidG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O3dCQUNUO0FBQUUsYUFBTyxNQUFQO0FBQWdCOzs7RUFET0MsaUI7O2tCQUFoQkQsTzs7SUFJZkUsVTs7Ozs7Ozs7Ozs4QkFDTUMsQyxFQUFHO0FBQ1gsV0FBS0MsS0FBTCxDQUFXQyxlQUFYLEdBQTZCRixDQUE3QjtBQUNEOzs7NkJBRVFBLEMsRUFBRyxDQUVYOzs7MkJBRU1BLEMsRUFBRztBQUNSLFdBQUtDLEtBQUwsQ0FBV0UsVUFBWCxHQUF3QixhQUF4QjtBQUNEOzs7NEJBRU9ILEMsRUFBRztBQUNULHFCQUFnQkEsQ0FBaEIsdURBQWdCQSxDQUFoQjtBQUNFLGFBQUssUUFBTDtBQUNFLGlCQUFPLEtBQUtJLFNBQUwsQ0FBZUosQ0FBZixDQUFQO0FBQ0YsYUFBSyxRQUFMO0FBQ0UsaUJBQU8sS0FBS0ssUUFBTCxDQUFjTCxDQUFkLENBQVA7QUFDRixhQUFLLFFBQUw7QUFDRSxpQkFBTyxLQUFLTSxNQUFMLENBQVlOLENBQVosQ0FBUDtBQU5KO0FBUUQ7Ozt1QkFFRUEsQyxFQUFHO0FBQ0pBLFFBQUVPLEtBQUYsS0FBWSxLQUFLTixLQUFMLENBQVdPLFdBQVgsR0FBeUJSLEVBQUVPLEtBQXZDO0FBQ0FQLFFBQUVTLEtBQUYsS0FBWSxLQUFLUixLQUFMLENBQVdTLFdBQVgsR0FBNEJWLEVBQUVTLEtBQTlCLFNBQXlDLEtBQUtSLEtBQUwsQ0FBV1UsV0FBWCxHQUF5QixPQUE5RTtBQUNBWCxRQUFFWSxJQUFGLEtBQVcsS0FBS1gsS0FBTCxDQUFXVSxXQUFYLEdBQXlCLEtBQUtFLFNBQUwsQ0FBZWIsRUFBRVksSUFBakIsQ0FBcEM7QUFDQVosUUFBRWMsR0FBRixLQUFVLEtBQVYsS0FBb0IsS0FBS2IsS0FBTCxDQUFXYyxZQUFYLEdBQTZCZixFQUFFUyxLQUFGLEdBQVUsQ0FBdkMsT0FBcEI7QUFDRDs7O3lCQUVJVCxDLEVBQUc7QUFDTixXQUFLQyxLQUFMLENBQVdRLEtBQVgsR0FBc0JULEVBQUVTLEtBQXhCO0FBQ0EsV0FBS1IsS0FBTCxDQUFXZSxNQUFYLEdBQXVCaEIsRUFBRWdCLE1BQXpCO0FBQ0FoQixRQUFFQSxDQUFGLEtBQVEsS0FBS0MsS0FBTCxDQUFXZ0IsSUFBWCxHQUFxQmpCLEVBQUVBLENBQXZCLE9BQVI7QUFDQUEsUUFBRWtCLENBQUYsS0FBUSxLQUFLakIsS0FBTCxDQUFXa0IsR0FBWCxHQUFvQm5CLEVBQUVrQixDQUF0QixPQUFSO0FBQ0Q7OztFQXBDc0JwQixrQkFBUUMsVTs7QUF1Q2pDRixRQUFRRSxVQUFSLEdBQXFCQSxVQUFyQiIsImZpbGUiOiJncmFwaGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyYXdpbmcgZnJvbSAnLi9kcmF3aW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpYyBleHRlbmRzIERyYXdpbmcge1xuICBnZXQgdGFnKCkgeyByZXR1cm4gJ3NwYW4nOyB9XG59XG5cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBEcmF3aW5nLlByb3BlcnRpZXMge1xuICBzb2xpZEZpbGwoeCkge1xuICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0geDtcbiAgfVxuXG4gIGdyYWRGaWxsKHgpIHtcblxuICB9XG5cbiAgbm9GaWxsKHgpIHtcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xuICB9XG5cbiAgZmlsbFJlZih4KSB7XG4gICAgc3dpdGNoICh0eXBlb2YgKHgpKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gdGhpcy5zb2xpZEZpbGwoeCk7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gdGhpcy5ncmFkRmlsbCh4KTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB0aGlzLm5vRmlsbCh4KTtcbiAgICB9XG4gIH1cblxuICBsbih4KSB7XG4gICAgeC5jb2xvciAmJiAodGhpcy5zdHlsZS5ib3JkZXJDb2xvciA9IHguY29sb3IpO1xuICAgIHgud2lkdGggJiYgKHRoaXMuc3R5bGUuYm9yZGVyV2lkdGggPSBgJHt4LndpZHRofXB4YCwgdGhpcy5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCcpO1xuICAgIHguZGFzaCAmJiAodGhpcy5zdHlsZS5ib3JkZXJTdHlsZSA9IHRoaXMubGluZVN0eWxlKHguZGFzaCkpO1xuICAgIHguY2FwID09PSAncm5kJyAmJiAodGhpcy5zdHlsZS5ib3JkZXJSYWRpdXMgPSBgJHt4LndpZHRoICogMn1weGApO1xuICB9XG5cbiAgeGZybSh4KSB7XG4gICAgdGhpcy5zdHlsZS53aWR0aCA9IGAke3gud2lkdGh9cHhgO1xuICAgIHRoaXMuc3R5bGUuaGVpZ2h0ID0gYCR7eC5oZWlnaHR9cHhgO1xuICAgIHgueCAmJiAodGhpcy5zdHlsZS5sZWZ0ID0gYCR7eC54fXB4YCk7XG4gICAgeC55ICYmICh0aGlzLnN0eWxlLnRvcCA9IGAke3gueX1weGApO1xuICB9XG59XG5cbkdyYXBoaWMuUHJvcGVydGllcyA9IFByb3BlcnRpZXM7XG4iXX0=