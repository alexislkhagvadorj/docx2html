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

var AZ = /[A-Z]/g;
var r = function r(a) {
  return '-' + a.toLowerCase();
};
var clozed = /Z$/gi;

function asStyle(x) {
  var a = [];
  for (var i in x) {
    !$tool.isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
  }return a.join(';');
}

var Shape = function (_Converter) {
  (0, _inherits3.default)(Shape, _Converter);

  function Shape() {
    (0, _classCallCheck3.default)(this, Shape);
    return (0, _possibleConstructorReturn3.default)(this, (Shape.__proto__ || (0, _getPrototypeOf2.default)(Shape)).apply(this, arguments));
  }

  (0, _createClass3.default)(Shape, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      el.style.position = 'absolute';
      el.style.overflow = 'hidden';

      var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 };
      var bgStyle = this.makeBackgroundStyle();
      (0, _get3.default)(Shape.prototype.__proto__ || (0, _getPrototypeOf2.default)(Shape.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      var propConverter = new this.constructor.Properties(el.style, this, pathStyle, bgStyle);
      style && style.parse([propConverter]);
      if (this.path) {
        if (el.style.background) pathStyle.fillOpacity = 0;
        var bgImage = el.style.background;
        var grad = pathStyle.grad;

        delete pathStyle.grad;

        var svg = '<svg xmlns="http://www.w3.org/2000/svg">' + (grad ? '<defs>' + grad + '</defs>' : '') + this.path + ' style="' + asStyle(pathStyle) + '" /></svg>';
        var svgImage = 'url(' + this.doc.asImageURL(svg) + ')';
        bgStyle.backgroundImage = svgImage;
        bgStyle.backgroundSize = '100% 100%';
      }
    }
  }, {
    key: 'makeBackgroundStyle',
    value: function makeBackgroundStyle() {
      // make background el to hold svg background
      var id = 'shape' + this.doc.uid();
      this.content.setAttribute('id', id);
      var style = this.doc.createStyle('#' + id + '::before');
      style.content = '""';
      style.zIndex = -1;
      style.position = 'absolute';
      style.width = '100%';
      style.height = '100%';
      style.left = 0;
      style.top = 0;
      return style;
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'div';
    }
  }]);
  return Shape;
}(_converter2.default);

exports.default = Shape;


Shape.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties(style, parent, pathStyle, bgStyle) {
    (0, _classCallCheck3.default)(this, Properties);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

    _this2.pathStyle = pathStyle;
    _this2.bgStyle = bgStyle;
    return _this2;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'xfrm',
    value: function xfrm(x) {
      this.style.width = x.width + 'px';
      this.style.height = x.height + 'px';
      x.x && (this.style.left = x.x + 'px');
      x.y && (this.style.top = x.y + 'px');

      x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

      this.world = x;
    }
  }, {
    key: 'ln',
    value: function ln(x) {
      x.color && (this.pathStyle.stroke = x.color);
      x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'px');

      switch (x.cap) {
        case 'rnd':
          this.pathStyle.strokeLinecap = 'round';
          break;
        default:
      }

      if (x.dash) {
        switch (this.lineStyle(x.dash)) {
          case 'dotted':
            this.pathStyle.strokeDasharray = '5,5';
            break;
            break;
          case 'dashed':
            this.pathStyle.strokeDasharray = '10,10';
            break;
        }
      }
    }
  }, {
    key: 'solidFill',
    value: function solidFill(x) {
      this.pathStyle.fill = x;
      this.pathStyle.fillOpacity = 1;
    }
  }, {
    key: 'gradFill',
    value: function gradFill(x) {
      if (this.style.backgroundImage) return;

      var grad = [];
      switch (x.path) {
        case 'linear':
          grad.push('<linearGradient id="grad"');
          switch (x.angel) {
            case 0:
              grad.push('x1="0%" y1="0%" x2="100%" y2="0%">');
              break;
            case 90:
              grad.push('x1="0%" y1="0%" x2="0%" y2="100%">');
              break;
            case 180:
              grad.push('x1="100%" y1="0%" x2="0%" y2="0%">');
              break;
            case 270:
              grad.push('x1="0%" y1="100%" x2="0%" y2="0%">');
              break;
          }
          grad.push('</linearGradient>');
          break;
        case 'circle':
          grad.push('<radialGradient  id="grad"');
          grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">');
          grad.push('</radialGradient>');
          break;
      }
      var end = grad.pop();
      for (var i = 0, len = x.stops.length, a; i < len; i++) {
        grad.push('<stop offset="' + (a = x.stops[i]).position + '%" style="stop-opacity:1;stop-color:' + a.color + '"/>');
      }grad.push(end);

      this.pathStyle.grad = grad.join(' ');
      this.pathStyle.fill = 'url(#grad)';
      this.pathStyle.fillOpacity = 1;
    }
  }, {
    key: 'blipFill',
    value: function blipFill(x) {
      this.style.background = 'url(' + this.doc.asImageURL(x) + ')';
      this.style.backgroundSize = '100% 100%';
      this.noFill();
    }
  }, {
    key: 'noFill',
    value: function noFill(x) {
      this.pathStyle.fillOpacity = 0;
    }
  }, {
    key: 'lnRef',
    value: function lnRef(x) {
      this.ln(x);
    }
  }, {
    key: 'fillRef',
    value: function fillRef(x) {
      if (this.style.backgroundImage) return;

      if (typeof x.path !== 'undefined') return this.gradFill(x);

      if (typeof x === 'string') this.pathStyle.fill = x;else if (typeof x.color !== 'undefined') this.pathStyle.fill = x.color;else return;
      this.pathStyle.fillOpacity = 1;
    }
  }, {
    key: 'fontRef',
    value: function fontRef(x) {
      x.color && (this.style.color = x.color);
      x.family && (this.style.fontFamily = x.family);
    }
  }, {
    key: 'path',
    value: function path(x, t) {
      switch (x.shape) {
        case 'line':
          this.parent.path = '<line x1="0" y1="0" x2="' + this.world.width + 'pt" y2="' + this.world.height + 'pt"';
          break;
        case 'rect':
          this.parent.path = '<rect width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
          break;
        case 'roundRect':
          this.parent.path = '<rect rx="' + (t = Math.min(this.world.width, this.world.height) / 12) + 'pt" ry="' + t + 'pt" width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
          break;
        case 'ellipse':
          this.parent.path = '<ellipse cx="' + this.world.width / 2 + 'pt" cy="' + this.world.height / 2 + 'pt" rx="' + this.world.width / 2 + 'pt" ry="' + this.world.height / 2 + 'pt"';
          break;
        case 'path':
          this.parent.path = '<path d="' + x.path + '"';
          if (!clozed.test(x.path)) this.noFill();
          break;
      }
    }
  }, {
    key: 'spAutoFit',
    value: function spAutoFit() {
      this.style.height = 'auto';
    }
  }, {
    key: 'lIns',
    value: function lIns(x) {
      this.style.paddingLeft = x + 'px';
    }
  }, {
    key: 'tIns',
    value: function tIns(x) {
      this.style.paddingTop = x + 'px';
    }
  }, {
    key: 'rIns',
    value: function rIns(x) {
      this.style.paddingRight = x + 'px';
    }
  }, {
    key: 'bIns',
    value: function bIns(x) {
      this.style.paddingBottom = x + 'px';
    }
  }, {
    key: 'anchor',
    value: function anchor(x) {
      this.style.display = 'table-cell';
      this.style.verticalAlign = x;
    }
  }, {
    key: 'vert',
    value: function vert(x) {
      this.style.height = this.world.width + 'px';
      this.style.width = this.world.height + 'px';
      var delta = (this.world.width - this.world.height) / 2;

      this.bgStyle.height = this.world.height + 'px';
      this.bgStyle.width = this.world.width + 'px';
      this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

      this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
    }
  }]);
  return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiQVoiLCJyIiwiYSIsInRvTG93ZXJDYXNlIiwiY2xvemVkIiwiYXNTdHlsZSIsIngiLCJpIiwiJHRvb2wiLCJpc0Z1bmN0aW9uIiwicHVzaCIsInJlcGxhY2UiLCJqb2luIiwiU2hhcGUiLCJlbCIsInN0eWxlIiwicG9zaXRpb24iLCJvdmVyZmxvdyIsInBhdGhTdHlsZSIsInN0cm9rZSIsInN0cm9rZVdpZHRoIiwiZmlsbE9wYWNpdHkiLCJiZ1N0eWxlIiwibWFrZUJhY2tncm91bmRTdHlsZSIsImFyZ3VtZW50cyIsIndvcmRNb2RlbCIsImdldERpcmVjdFN0eWxlIiwicHJvcENvbnZlcnRlciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsInBhcnNlIiwicGF0aCIsImJhY2tncm91bmQiLCJiZ0ltYWdlIiwiZ3JhZCIsInN2ZyIsInN2Z0ltYWdlIiwiZG9jIiwiYXNJbWFnZVVSTCIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRTaXplIiwiaWQiLCJ1aWQiLCJjb250ZW50Iiwic2V0QXR0cmlidXRlIiwiY3JlYXRlU3R5bGUiLCJ6SW5kZXgiLCJ3aWR0aCIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJDb252ZXJ0ZXIiLCJwYXJlbnQiLCJ5Iiwicm90YXRpb24iLCJzdHlsZXNzIiwid29ybGQiLCJjb2xvciIsInVuZGVmaW5lZCIsImNhcCIsInN0cm9rZUxpbmVjYXAiLCJkYXNoIiwibGluZVN0eWxlIiwic3Ryb2tlRGFzaGFycmF5IiwiZmlsbCIsImFuZ2VsIiwiZW5kIiwicG9wIiwibGVuIiwic3RvcHMiLCJsZW5ndGgiLCJub0ZpbGwiLCJsbiIsImdyYWRGaWxsIiwiZmFtaWx5IiwiZm9udEZhbWlseSIsInQiLCJzaGFwZSIsIk1hdGgiLCJtaW4iLCJ0ZXN0IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ0JvdHRvbSIs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RSxhQUFYLEdBQTJCaEYsQ0FBM0I7QUFDRDtBQS9KSDtBQUFBO0FBQUEseUJBaUtPQSxDQWpLUCxFQWlLVTtBQUNOLFdBQUtTLEtBQUwsQ0FBV2lDLE1BQVgsR0FBdUIsS0FBS1EsS0FBTCxDQUFXVCxLQUFsQztBQUNBLFdBQUtoQyxLQUFMLENBQVdnQyxLQUFYLEdBQXNCLEtBQUtTLEtBQUwsQ0FBV1IsTUFBakM7QUFDQSxVQUFNdUMsUUFBUSxDQUFDLEtBQUsvQixLQUFMLENBQVdULEtBQVgsR0FBbUIsS0FBS1MsS0FBTCxDQUFXUixNQUEvQixJQUF5QyxDQUF2RDs7QUFFQSxXQUFLMUIsT0FBTCxDQUFhMEIsTUFBYixHQUF5QixLQUFLUSxLQUFMLENBQVdSLE1BQXBDO0FBQ0EsV0FBSzFCLE9BQUwsQ0FBYXlCLEtBQWIsR0FBd0IsS0FBS1MsS0FBTCxDQUFXVCxLQUFuQztBQUNBLFdBQUtRLE9BQUwsQ0FBYSxXQUFiLGtCQUF3Q2dDLEtBQXhDLFdBQW1EQSxLQUFuRCxvQkFBdUVqRixDQUF2RSxZQUFpRixLQUFLZ0IsT0FBdEY7O0FBRUEsV0FBS2lDLE9BQUwsQ0FBYSxXQUFiLGlCQUF1Q2dDLEtBQXZDLFlBQW1EQSxLQUFuRCxvQkFBc0VqRixJQUFJLEtBQUtrRCxLQUFMLENBQVdGLFFBQWYsSUFBMkIsQ0FBakc7QUFDRDtBQTNLSDtBQUFBO0FBQUEsRUFBNENrQyxvQkFBTTNELFVBQWxEIiwiZmlsZSI6InNoYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9jb252ZXJ0ZXInO1xuXG5jb25zdCBBWiA9IC9bQS1aXS9nO1xuY29uc3QgciA9IGZ1bmN0aW9uIChhKSB7IHJldHVybiBgLSR7YS50b0xvd2VyQ2FzZSgpfWA7IH07XG5jb25zdCBjbG96ZWQgPSAvWiQvZ2k7XG5cbmZ1bmN0aW9uIGFzU3R5bGUoeCkge1xuICBjb25zdCBhID0gW107XG4gIGZvciAoY29uc3QgaSBpbiB4KSAhJHRvb2wuaXNGdW5jdGlvbih4W2ldKSAmJiBhLnB1c2goYCR7aS5yZXBsYWNlKEFaLCByKX06JHt4W2ldfWApO1xuICByZXR1cm4gYS5qb2luKCc7Jyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgQ29udmVydGVyIHtcbiAgZ2V0IHRhZygpIHsgcmV0dXJuICdkaXYnOyB9XG5cbiAgY29udmVydFN0eWxlKGVsKSB7XG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICBjb25zdCBwYXRoU3R5bGUgPSB7IHN0cm9rZTogJ2JsYWNrJywgc3Ryb2tlV2lkdGg6IDIsIGZpbGxPcGFjaXR5OiAwIH07XG4gICAgY29uc3QgYmdTdHlsZSA9IHRoaXMubWFrZUJhY2tncm91bmRTdHlsZSgpO1xuICAgIHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKTtcbiAgICBjb25zdCBwcm9wQ29udmVydGVyID0gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSwgdGhpcywgcGF0aFN0eWxlLCBiZ1N0eWxlKTtcbiAgICBzdHlsZSAmJiBzdHlsZS5wYXJzZShbcHJvcENvbnZlcnRlcl0pO1xuICAgIGlmICh0aGlzLnBhdGgpIHtcbiAgICAgIGlmIChlbC5zdHlsZS5iYWNrZ3JvdW5kKSBwYXRoU3R5bGUuZmlsbE9wYWNpdHkgPSAwO1xuICAgICAgY29uc3QgYmdJbWFnZSA9IGVsLnN0eWxlLmJhY2tncm91bmQ7XG4gICAgICBjb25zdCB7IGdyYWQgfSA9IHBhdGhTdHlsZTtcbiAgICAgIGRlbGV0ZSBwYXRoU3R5bGUuZ3JhZDtcblxuICAgICAgY29uc3Qgc3ZnID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPiR7XG4gICAgICAgIGdyYWQgPyBgPGRlZnM+JHtncmFkfTwvZGVmcz5gIDogJydcbiAgICAgIH0ke3RoaXMucGF0aH0gc3R5bGU9XCIke2FzU3R5bGUocGF0aFN0eWxlKX1cIiAvPjwvc3ZnPmA7XG4gICAgICBjb25zdCBzdmdJbWFnZSA9IGB1cmwoJHt0aGlzLmRvYy5hc0ltYWdlVVJMKHN2Zyl9KWA7XG4gICAgICBiZ1N0eWxlLmJhY2tncm91bmRJbWFnZSA9IHN2Z0ltYWdlO1xuICAgICAgYmdTdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlIDEwMCUnO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VCYWNrZ3JvdW5kU3R5bGUoKSB7XG4gICAgLy8gbWFrZSBiYWNrZ3JvdW5kIGVsIHRvIGhvbGQgc3ZnIGJhY2tncm91bmRcbiAgICBjb25zdCBpZCA9IGBzaGFwZSR7dGhpcy5kb2MudWlkKCl9YDtcbiAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGAjJHtpZH06OmJlZm9yZWApO1xuICAgIHN0eWxlLmNvbnRlbnQgPSAnXCJcIic7XG4gICAgc3R5bGUuekluZGV4ID0gLTE7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBzdHlsZS5sZWZ0ID0gMDtcbiAgICBzdHlsZS50b3AgPSAwO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfVxufVxuXG5TaGFwZS5Qcm9wZXJ0aWVzID0gY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXMge1xuICBjb25zdHJ1Y3RvcihzdHlsZSwgcGFyZW50LCBwYXRoU3R5bGUsIGJnU3R5bGUpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMucGF0aFN0eWxlID0gcGF0aFN0eWxlO1xuICAgIHRoaXMuYmdTdHlsZSA9IGJnU3R5bGU7XG4gIH1cblxuICB4ZnJtKHgpIHtcbiAgICB0aGlzLnN0eWxlLndpZHRoID0gYCR7eC53aWR0aH1weGA7XG4gICAgdGhpcy5zdHlsZS5oZWlnaHQgPSBgJHt4LmhlaWdodH1weGA7XG4gICAgeC54ICYmICh0aGlzLnN0eWxlLmxlZnQgPSBgJHt4Lnh9cHhgKTtcbiAgICB4LnkgJiYgKHRoaXMuc3R5bGUudG9wID0gYCR7eC55fXB4YCk7XG5cbiAgICB4LnJvdGF0aW9uICYmIHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywgYHJvdGF0ZSgke3gucm90YXRpb259ZGVnKWApO1xuXG4gICAgdGhpcy53b3JsZCA9IHg7XG4gIH1cblxuICBsbih4KSB7XG4gICAgeC5jb2xvciAmJiAodGhpcy5wYXRoU3R5bGUuc3Ryb2tlID0geC5jb2xvcik7XG4gICAgeC53aWR0aCAhPSB1bmRlZmluZWQgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZVdpZHRoID0gYCR7eC53aWR0aH1weGApO1xuXG4gICAgc3dpdGNoICh4LmNhcCkge1xuICAgICAgY2FzZSAncm5kJzpcbiAgICAgICAgdGhpcy5wYXRoU3R5bGUuc3Ryb2tlTGluZWNhcCA9ICdyb3VuZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG5cbiAgICBpZiAoeC5kYXNoKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMubGluZVN0eWxlKHguZGFzaCkpIHtcbiAgICAgICAgY2FzZSAnZG90dGVkJzpcbiAgICAgICAgICB0aGlzLnBhdGhTdHlsZS5zdHJva2VEYXNoYXJyYXkgPSAnNSw1JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGFzaGVkJzpcbiAgICAgICAgICB0aGlzLnBhdGhTdHlsZS5zdHJva2VEYXNoYXJyYXkgPSAnMTAsMTAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvbGlkRmlsbCh4KSB7XG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbCA9IHg7XG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHkgPSAxO1xuICB9XG5cbiAgZ3JhZEZpbGwoeCkge1xuICAgIGlmICh0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZ3JhZCA9IFtdO1xuICAgIHN3aXRjaCAoeC5wYXRoKSB7XG4gICAgICBjYXNlICdsaW5lYXInOlxuICAgICAgICBncmFkLnB1c2goJzxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRcIicpO1xuICAgICAgICBzd2l0Y2ggKHguYW5nZWwpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA5MDpcbiAgICAgICAgICAgIGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjAlXCIgeTI9XCIxMDAlXCI+Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE4MDpcbiAgICAgICAgICAgIGdyYWQucHVzaCgneDE9XCIxMDAlXCIgeTE9XCIwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI3MDpcbiAgICAgICAgICAgIGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMTAwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBncmFkLnB1c2goJzwvbGluZWFyR3JhZGllbnQ+Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgICAgZ3JhZC5wdXNoKCc8cmFkaWFsR3JhZGllbnQgIGlkPVwiZ3JhZFwiJyk7XG4gICAgICAgIGdyYWQucHVzaCgnY3g9XCI1MCVcIiBjeT1cIjUwJVwiIHI9XCI1MCVcIiBmeD1cIjUwJVwiIGZ5PVwiNTAlXCI+Jyk7XG4gICAgICAgIGdyYWQucHVzaCgnPC9yYWRpYWxHcmFkaWVudD4nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IGVuZCA9IGdyYWQucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHguc3RvcHMubGVuZ3RoLCBhOyBpIDwgbGVuOyBpKyspIGdyYWQucHVzaChgPHN0b3Agb2Zmc2V0PVwiJHsoYSA9IHguc3RvcHNbaV0pLnBvc2l0aW9ufSVcIiBzdHlsZT1cInN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6JHthLmNvbG9yfVwiLz5gKTtcbiAgICBncmFkLnB1c2goZW5kKTtcblxuICAgIHRoaXMucGF0aFN0eWxlLmdyYWQgPSBncmFkLmpvaW4oJyAnKTtcbiAgICB0aGlzLnBhdGhTdHlsZS5maWxsID0gJ3VybCgjZ3JhZCknO1xuICAgIHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5ID0gMTtcbiAgfVxuXG4gIGJsaXBGaWxsKHgpIHtcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCR7dGhpcy5kb2MuYXNJbWFnZVVSTCh4KX0pYDtcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUgMTAwJSc7XG4gICAgdGhpcy5ub0ZpbGwoKTtcbiAgfVxuXG4gIG5vRmlsbCh4KSB7XG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHkgPSAwO1xuICB9XG5cbiAgbG5SZWYoeCkge1xuICAgIHRoaXMubG4oeCk7XG4gIH1cblxuICBmaWxsUmVmKHgpIHtcbiAgICBpZiAodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpIHJldHVybjtcblxuICAgIGlmICh0eXBlb2YgKHgucGF0aCkgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcy5ncmFkRmlsbCh4KTtcblxuICAgIGlmICh0eXBlb2YgKHgpID09PSAnc3RyaW5nJykgdGhpcy5wYXRoU3R5bGUuZmlsbCA9IHg7XG4gICAgZWxzZSBpZiAodHlwZW9mICh4LmNvbG9yKSAhPT0gJ3VuZGVmaW5lZCcpIHRoaXMucGF0aFN0eWxlLmZpbGwgPSB4LmNvbG9yO1xuICAgIGVsc2UgcmV0dXJuO1xuICAgIHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5ID0gMTtcbiAgfVxuXG4gIGZvbnRSZWYoeCkge1xuICAgIHguY29sb3IgJiYgKHRoaXMuc3R5bGUuY29sb3IgPSB4LmNvbG9yKTtcbiAgICB4LmZhbWlseSAmJiAodGhpcy5zdHlsZS5mb250RmFtaWx5ID0geC5mYW1pbHkpO1xuICB9XG5cbiAgcGF0aCh4LCB0KSB7XG4gICAgc3dpdGNoICh4LnNoYXBlKSB7XG4gICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgdGhpcy5wYXJlbnQucGF0aCA9IGA8bGluZSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIiR7dGhpcy53b3JsZC53aWR0aH1wdFwiIHkyPVwiJHt0aGlzLndvcmxkLmhlaWdodH1wdFwiYDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZWN0JzpcbiAgICAgICAgdGhpcy5wYXJlbnQucGF0aCA9IGA8cmVjdCB3aWR0aD1cIiR7dGhpcy53b3JsZC53aWR0aH1wdFwiIGhlaWdodD1cIiR7dGhpcy53b3JsZC5oZWlnaHR9cHRcImA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncm91bmRSZWN0JzpcbiAgICAgICAgdGhpcy5wYXJlbnQucGF0aCA9IGA8cmVjdCByeD1cIiR7dCA9IE1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KSAvIDEyfXB0XCIgcnk9XCIke3R9cHRcIiB3aWR0aD1cIiR7dGhpcy53b3JsZC53aWR0aH1wdFwiIGhlaWdodD1cIiR7dGhpcy53b3JsZC5oZWlnaHR9cHRcImA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICAgIHRoaXMucGFyZW50LnBhdGggPSBgPGVsbGlwc2UgY3g9XCIke3RoaXMud29ybGQud2lkdGggLyAyfXB0XCIgY3k9XCIke3RoaXMud29ybGQuaGVpZ2h0IC8gMn1wdFwiIHJ4PVwiJHt0aGlzLndvcmxkLndpZHRoIC8gMn1wdFwiIHJ5PVwiJHt0aGlzLndvcmxkLmhlaWdodCAvIDJ9cHRcImA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGF0aCc6XG4gICAgICAgIHRoaXMucGFyZW50LnBhdGggPSBgPHBhdGggZD1cIiR7eC5wYXRofVwiYDtcbiAgICAgICAgaWYgKCFjbG96ZWQudGVzdCh4LnBhdGgpKSB0aGlzLm5vRmlsbCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzcEF1dG9GaXQoKSB7XG4gICAgdGhpcy5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gIH1cblxuICBsSW5zKHgpIHtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0ID0gYCR7eH1weGA7XG4gIH1cblxuICB0SW5zKHgpIHtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdUb3AgPSBgJHt4fXB4YDtcbiAgfVxuXG4gIHJJbnMoeCkge1xuICAgIHRoaXMuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7eH1weGA7XG4gIH1cblxuICBiSW5zKHgpIHtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBgJHt4fXB4YDtcbiAgfVxuXG4gIGFuY2hvcih4KSB7XG4gICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ3RhYmxlLWNlbGwnO1xuICAgIHRoaXMuc3R5bGUudmVydGljYWxBbGlnbiA9IHg7XG4gIH1cblxuICB2ZXJ0KHgpIHtcbiAgICB0aGlzLnN0eWxlLmhlaWdodCA9IGAke3RoaXMud29ybGQud2lkdGh9cHhgO1xuICAgIHRoaXMuc3R5bGUud2lkdGggPSBgJHt0aGlzLndvcmxkLmhlaWdodH1weGA7XG4gICAgY29uc3QgZGVsdGEgPSAodGhpcy53b3JsZC53aWR0aCAtIHRoaXMud29ybGQuaGVpZ2h0KSAvIDI7XG5cbiAgICB0aGlzLmJnU3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy53b3JsZC5oZWlnaHR9cHhgO1xuICAgIHRoaXMuYmdTdHlsZS53aWR0aCA9IGAke3RoaXMud29ybGQud2lkdGh9cHhgO1xuICAgIHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgtJHtkZWx0YX1wdCwke2RlbHRhfXB0KSByb3RhdGUoLSR7eH1kZWcpIGAsIHRoaXMuYmdTdHlsZSk7XG5cbiAgICB0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtkZWx0YX1wdCwtJHtkZWx0YX1wdCkgcm90YXRlKCR7eCArIHRoaXMud29ybGQucm90YXRpb24gfHwgMH1kZWcpYCk7XG4gIH1cbn07XG4iXX0=