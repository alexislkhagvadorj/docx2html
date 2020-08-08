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

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = /[a-zA-Z]+$/g;
function asNum(a) {
  return parseFloat(a.replace(unit, ''));
}

var Anchor = function (_Drawing) {
  (0, _inherits3.default)(Anchor, _Drawing);

  function Anchor() {
    (0, _classCallCheck3.default)(this, Anchor);
    return (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).apply(this, arguments));
  }

  (0, _createClass3.default)(Anchor, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      el.style.display = 'inline-block';
      el.style.position = 'relative';

      (0, _get3.default)(Anchor.prototype.__proto__ || (0, _getPrototypeOf2.default)(Anchor.prototype), 'convertStyle', this).apply(this, arguments);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'div';
    }
  }]);
  return Anchor;
}(_drawing2.default);

exports.default = Anchor;


var PositionH = {
  page: function page(x) {
    var style = this.style;

    var t = void 0;
    switch (x.align) {
      case 'left':
        if ((t = this.world.width - asNum(this.doc.section.style.paddingLeft)) >= 0) style.left = 0;else style.left = -t + 'px';
        break;
      case 'center':
        style.left = (asNum(this.doc.section.style.width) - this.world.width) / 2 + 'px';
        break;
      case 'right':
        if ((t = this.world.width - asNum(this.doc.section.style.paddingRight)) >= 0) style.right = 0;else style.right = -t + 'px';
        break;
      case 'inside':
        style.left = 0;
        break;
      case 'outside':
        style.right = 0;
        break;
      default:
        style.left = x.posOffset + 'px';
        break;
    }
  },
  margin: function margin(x) {
    var sect = this.doc.section.style;
    switch (x.align) {
      case 'inside':
      case 'left':
        this.style.left = sect.paddingLeft;
        break;
      case 'center':
        this.style.left = (asNum(sect.width) - asNum(sect.paddingRight) + asNum(sect.paddingLeft) - this.world.width) / 2 + 'px';
        break;
      case 'outside':
      case 'right':
        this.style.right = sect.paddingRight;
        break;
      default:
        this.style.left = x.posOffset + asNum(sect.paddingLeft) + 'px';
        break;
    }
  },
  column: function column(x) {
    Anchor.addClass(this.parent.content, 'warning warning-positionH-column');
    PositionH.margin.call(this, x);
  },
  character: function character(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-character');
  },
  leftMargin: function leftMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-leftMargin');
  },
  rightMargin: function rightMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-rightMargin');
  },
  insideMargin: function insideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-insideMargin');
  },
  outsideMargin: function outsideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-outsideMargin');
  }
};
var PositionV = {
  page: function page(x) {
    var style = this.style;

    var sect = this.doc.section.style;
    switch (x.align) {
      case 'top':
        style.top = 0;
        break;
      case 'bottom':
        style.bottom = 0;
        break;
      case 'center':
      case 'outside':
      case 'inside':
        Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-page-' + x.align);
        break;
      default:
        style.top = x.posOffset + 'px';
        break;
    }
  },
  margin: function margin(x) {
    var style = this.style;

    var sect = this.doc.section.style;
    switch (x.align) {
      case 'top':
        style.top = sect.paddingTop;
        break;
      case 'bottom':
        style.bottom = sect.paddingBottom;
        break;
      case 'center':
      case 'outside':
      case 'inside':
        Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-margin-' + x.align);
        break;
      default:
        style.top = asNum(sect.paddingTop) + x.posOffset + 'px';
        break;
    }
  },
  line: function line(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-line');
  },
  topMargin: function topMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-topMargin');
  },
  bottomMargin: function bottomMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-bottomMargin');
  },
  insideMargin: function insideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-insideMargin');
  },
  outsideMargin: function outsideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-outsideMargin');
  },
  paragraph: function paragraph(x) {
    // only offset
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-paragraph');
  }
};

// only support absolute page offset

var Properties = function (_Drawing$Properties) {
  (0, _inherits3.default)(Properties, _Drawing$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'getParagraphPaddingLeft',
    value: function getParagraphPaddingLeft() {
      return '0pt';
    }
  }, {
    key: 'positionH',
    value: function positionH(x) {
      PositionH[x.relativeFrom].call(this, x);
    }
  }, {
    key: 'positionV',
    value: function positionV(x) {
      PositionV[x.relativeFrom].call(this, x);
    }
  }, {
    key: 'wrap',
    value: function wrap(x) {
      switch (x) {
        case 'tight':
        case 'through':
        case 'square':
        case 'topAndBottom':
          Anchor.addClass(this.parent.content, 'unsupported unsupported-wrap-' + x);
          break;
        default:
          this.style.position = 'absolute';
      }
    }
  }, {
    key: 'behindDoc',
    value: function behindDoc(x) {
      this.style.zIndex = -1;
    }
  }]);
  return Properties;
}(_drawing2.default.Properties);

Anchor.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJ1bml0IiwiYXNOdW0iLCJhIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJBbmNob3IiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsInBvc2l0aW9uIiwiYXJndW1lbnRzIiwiRHJhd2luZyIsIlBvc2l0aW9uSCIsInBhZ2UiLCJ4IiwidCIsImFsaWduIiwid29ybGQiLCJ3aWR0aCIsImRvYyIsInNlY3Rpb24iLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBvc09mZnNldCIsIm1hcmdpbiIsInNlY3QiLCJjb2x1bW4iLCJhZGRDbGFzcyIsInBhcmVudCIsImNvbnRlbnQiLCJjYWxsIiwiY2hhcmFjdGVyIiwibGVmdE1hcmdpbiIsInJpZ2h0TWFyZ2luIiwiaW5zaWRlTWFyZ2luIiwib3V0c2lkZU1hcmdpbiIsIlBvc2l0aW9uViIsInRvcCIsImJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibGluZSIsInRvcE1hcmdpbiIsImJvdHRvbU1hcmdpbiIsInBhcmFncmFwaCIsIlByb3BlcnRpZXMiLCJyZWxhdGl2ZUZyb20iLCJ6SW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPLGFBQWI7QUFDQSxTQUFTQyxLQUFULENBQWVDLENBQWYsRUFBa0I7QUFDaEIsU0FBT0MsV0FBV0QsRUFBRUUsT0FBRixDQUFVSixJQUFWLEVBQWdCLEVBQWhCLENBQVgsQ0FBUDtBQUNEOztJQUVvQkssTTs7Ozs7Ozs7OztpQ0FHTkMsRSxFQUFJO0FBQ2ZBLFNBQUdDLEtBQUgsQ0FBU0MsT0FBVCxHQUFtQixjQUFuQjtBQUNBRixTQUFHQyxLQUFILENBQVNFLFFBQVQsR0FBb0IsVUFBcEI7O0FBRUEsMElBQXNCQyxTQUF0QjtBQUNEOzs7d0JBUFM7QUFB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RGdCLHFCQXdETmhDLENBeERNLEVBd0RIO0FBQUU7QUFDYlQsV0FBT3dCLFFBQVAsQ0FBZ0IsS0FBS0MsTUFBTCxDQUFZQyxPQUE1QixFQUFxQyw2Q0FBckM7QUFDRDtBQTFEZSxDQUFsQjs7QUE2REE7O0lBQ01nQixVOzs7Ozs7Ozs7OzhDQUNzQjtBQUN4QixhQUFPLEtBQVA7QUFDRDs7OzhCQUVTakMsQyxFQUFHO0FBQ1hGLGdCQUFVRSxFQUFFa0MsWUFBWixFQUEwQmhCLElBQTFCLENBQStCLElBQS9CLEVBQXFDbEIsQ0FBckM7QUFDRDs7OzhCQUVTQSxDLEVBQUc7QUFDWHdCLGdCQUFVeEIsRUFBRWtDLFlBQVosRUFBMEJoQixJQUExQixDQUErQixJQUEvQixFQUFxQ2xCLENBQXJDO0FBQ0Q7Ozt5QkFFSUEsQyxFQUFHO0FBQ04sY0FBUUEsQ0FBUjtBQUNFLGFBQUssT0FBTDtBQUNBLGFBQUssU0FBTDtBQUNBLGFBQUssUUFBTDtBQUNBLGFBQUssY0FBTDtBQUNFVCxpQkFBT3dCLFFBQVAsQ0FBZ0IsS0FBS0MsTUFBTCxDQUFZQyxPQUE1QixvQ0FBcUVqQixDQUFyRTtBQUNBO0FBQ0Y7QUFDRSxlQUFLUCxLQUFMLENBQVdFLFFBQVgsR0FBc0IsVUFBdEI7QUFSSjtBQVVEOzs7OEJBRVNLLEMsRUFBRztBQUNYLFdBQUtQLEtBQUwsQ0FBVzBDLE1BQVgsR0FBb0IsQ0FBQyxDQUFyQjtBQUNEOzs7RUE1QnNCdEMsa0JBQVFvQyxVOztBQStCakMxQyxPQUFPMEMsVUFBUCxHQUFvQkEsVUFBcEIiLCJmaWxlIjoiZHJhd2luZ0FuY2hvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZyc7XG5cbmNvbnN0IHVuaXQgPSAvW2EtekEtWl0rJC9nO1xuZnVuY3Rpb24gYXNOdW0oYSkge1xuICByZXR1cm4gcGFyc2VGbG9hdChhLnJlcGxhY2UodW5pdCwgJycpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRHJhd2luZyB7XG4gIGdldCB0YWcoKSB7IHJldHVybiAnZGl2JzsgfVxuXG4gIGNvbnZlcnRTdHlsZShlbCkge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cbiAgICBzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG52YXIgUG9zaXRpb25IID0ge1xuICBwYWdlKHgpIHtcbiAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzO1xuICAgIGxldCB0O1xuICAgIHN3aXRjaCAoeC5hbGlnbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGlmICgodCA9IHRoaXMud29ybGQud2lkdGggLSBhc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLnBhZGRpbmdMZWZ0KSkgPj0gMCkgc3R5bGUubGVmdCA9IDA7XG4gICAgICAgIGVsc2Ugc3R5bGUubGVmdCA9IGAkey10fXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBzdHlsZS5sZWZ0ID0gYCR7KGFzTnVtKHRoaXMuZG9jLnNlY3Rpb24uc3R5bGUud2lkdGgpIC0gdGhpcy53b3JsZC53aWR0aCkgLyAyfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGlmICgodCA9IHRoaXMud29ybGQud2lkdGggLSBhc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLnBhZGRpbmdSaWdodCkpID49IDApIHN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgZWxzZSBzdHlsZS5yaWdodCA9IGAkey10fXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnNpZGUnOlxuICAgICAgICBzdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvdXRzaWRlJzpcbiAgICAgICAgc3R5bGUucmlnaHQgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0eWxlLmxlZnQgPSBgJHt4LnBvc09mZnNldH1weGA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcbiAgbWFyZ2luKHgpIHtcbiAgICBjb25zdCBzZWN0ID0gdGhpcy5kb2Muc2VjdGlvbi5zdHlsZTtcbiAgICBzd2l0Y2ggKHguYWxpZ24pIHtcbiAgICAgIGNhc2UgJ2luc2lkZSc6XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdGhpcy5zdHlsZS5sZWZ0ID0gc2VjdC5wYWRkaW5nTGVmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHsoYXNOdW0oc2VjdC53aWR0aCkgLSBhc051bShzZWN0LnBhZGRpbmdSaWdodCkgKyBhc051bShzZWN0LnBhZGRpbmdMZWZ0KSAtIHRoaXMud29ybGQud2lkdGgpIC8gMn1weGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3V0c2lkZSc6XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuc3R5bGUucmlnaHQgPSBzZWN0LnBhZGRpbmdSaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHt4LnBvc09mZnNldCArIGFzTnVtKHNlY3QucGFkZGluZ0xlZnQpfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuICBjb2x1bW4oeCkge1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCAnd2FybmluZyB3YXJuaW5nLXBvc2l0aW9uSC1jb2x1bW4nKTtcbiAgICBQb3NpdGlvbkgubWFyZ2luLmNhbGwodGhpcywgeCk7XG4gIH0sXG4gIGNoYXJhY3Rlcih4KSB7XG4gICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsICd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtY2hhcmFjdGVyJyk7XG4gIH0sXG4gIGxlZnRNYXJnaW4oeCkge1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCAndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILWxlZnRNYXJnaW4nKTtcbiAgfSxcbiAgcmlnaHRNYXJnaW4oeCkge1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCAndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILXJpZ2h0TWFyZ2luJyk7XG4gIH0sXG4gIGluc2lkZU1hcmdpbih4KSB7XG4gICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsICd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtaW5zaWRlTWFyZ2luJyk7XG4gIH0sXG4gIG91dHNpZGVNYXJnaW4oeCkge1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCAndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILW91dHNpZGVNYXJnaW4nKTtcbiAgfSxcbn07XG5jb25zdCBQb3NpdGlvblYgPSB7XG4gIHBhZ2UoeCkge1xuICAgIGNvbnN0IHsgc3R5bGUgfSA9IHRoaXM7XG4gICAgY29uc3Qgc2VjdCA9IHRoaXMuZG9jLnNlY3Rpb24uc3R5bGU7XG4gICAgc3dpdGNoICh4LmFsaWduKSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBzdHlsZS50b3AgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHN0eWxlLmJvdHRvbSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIGNhc2UgJ291dHNpZGUnOlxuICAgICAgY2FzZSAnaW5zaWRlJzpcbiAgICAgICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsIGB1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtcGFnZS0ke3guYWxpZ259YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc3R5bGUudG9wID0gYCR7eC5wb3NPZmZzZXR9cHhgO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG4gIG1hcmdpbih4KSB7XG4gICAgY29uc3QgeyBzdHlsZSB9ID0gdGhpcztcbiAgICBjb25zdCBzZWN0ID0gdGhpcy5kb2Muc2VjdGlvbi5zdHlsZTtcbiAgICBzd2l0Y2ggKHguYWxpZ24pIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHN0eWxlLnRvcCA9IHNlY3QucGFkZGluZ1RvcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBzdHlsZS5ib3R0b20gPSBzZWN0LnBhZGRpbmdCb3R0b207XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIGNhc2UgJ291dHNpZGUnOlxuICAgICAgY2FzZSAnaW5zaWRlJzpcbiAgICAgICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsIGB1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtbWFyZ2luLSR7eC5hbGlnbn1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHlsZS50b3AgPSBgJHthc051bShzZWN0LnBhZGRpbmdUb3ApICsgeC5wb3NPZmZzZXR9cHhgO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG4gIGxpbmUoeCkge1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCAndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLWxpbmUnKTtcbiAgfSxcbiAgdG9wTWFyZ2luKHgpIHtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwgJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi10b3BNYXJnaW4nKTtcbiAgfSxcbiAgYm90dG9tTWFyZ2luKHgpIHtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwgJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1ib3R0b21NYXJnaW4nKTtcbiAgfSxcbiAgaW5zaWRlTWFyZ2luKHgpIHtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwgJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1pbnNpZGVNYXJnaW4nKTtcbiAgfSxcbiAgb3V0c2lkZU1hcmdpbih4KSB7XG4gICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsICd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtb3V0c2lkZU1hcmdpbicpO1xuICB9LFxuICBwYXJhZ3JhcGgoeCkgeyAvLyBvbmx5IG9mZnNldFxuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCAndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLXBhcmFncmFwaCcpO1xuICB9LFxufTtcblxuLy8gb25seSBzdXBwb3J0IGFic29sdXRlIHBhZ2Ugb2Zmc2V0XG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgRHJhd2luZy5Qcm9wZXJ0aWVzIHtcbiAgZ2V0UGFyYWdyYXBoUGFkZGluZ0xlZnQoKSB7XG4gICAgcmV0dXJuICcwcHQnO1xuICB9XG5cbiAgcG9zaXRpb25IKHgpIHtcbiAgICBQb3NpdGlvbkhbeC5yZWxhdGl2ZUZyb21dLmNhbGwodGhpcywgeCk7XG4gIH1cblxuICBwb3NpdGlvblYoeCkge1xuICAgIFBvc2l0aW9uVlt4LnJlbGF0aXZlRnJvbV0uY2FsbCh0aGlzLCB4KTtcbiAgfVxuXG4gIHdyYXAoeCkge1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAndGlnaHQnOlxuICAgICAgY2FzZSAndGhyb3VnaCc6XG4gICAgICBjYXNlICdzcXVhcmUnOlxuICAgICAgY2FzZSAndG9wQW5kQm90dG9tJzpcbiAgICAgICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsIGB1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC13cmFwLSR7eH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICB9XG4gIH1cblxuICBiZWhpbmREb2MoeCkge1xuICAgIHRoaXMuc3R5bGUuekluZGV4ID0gLTE7XG4gIH1cbn1cblxuQW5jaG9yLlByb3BlcnRpZXMgPSBQcm9wZXJ0aWVzO1xuIl19