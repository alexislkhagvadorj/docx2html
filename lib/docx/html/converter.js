'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var divContainers = 'SECTION,DIV,TD'.split(',');

var Converter = function () {
  function Converter(wModel, parentConverter) {
    (0, _classCallCheck3.default)(this, Converter);

    this.wordModel = wModel;
    this.parent = parentConverter;
    this.doc = parentConverter && parentConverter.doc;
    this.content = null;
  }

  (0, _createClass3.default)(Converter, [{
    key: 'visit',


    /** interface API: happen when just word model identified, without children appended yet */
    value: function visit() {
      if (!this.parent || this.parent.content) return this.convert.apply(this, arguments);
    }
  }, {
    key: 'convert',
    value: function convert() {
      this.content = this.createElement();
      if (this.content) {
        this.parent.content.appendChild(this.content);
      } else this.content = this.parent && this.parent.content || null;

      this.convertStyle(this.content);
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      switch ((0, _typeof3.default)(this.tag)) {
        case 'string':
          return this.doc.createElement(this.tag);
        case 'function':
          var el = this.tag();
          return this.doc.createElement(el);
        default:
          return null;
      }
    }
  }, {
    key: 'convertStyle',
    value: function convertStyle(el, a) {
      this.wordModel.getStyleId && (a = this.wordModel.getStyleId()) && this.constructor.addClass(el, this.doc.stylePath(this.constructor.asCssID(a)));
    }
  }, {
    key: '_shouldIgnore',
    value: function _shouldIgnore() {
      return false;
    }
  }, {
    key: 'release',
    value: function release() {}
  }, {
    key: 'wordType',
    get: function get() {
      return null;
    }
  }, {
    key: 'tag',
    get: function get() {
      return null;
    }
  }], [{
    key: 'asCssID',
    value: function asCssID(a) {
      return a.replace(/\s+/g, '_');
    }
  }, {
    key: 'addClass',
    value: function addClass(el, classes) {
      el.setAttribute('class', (el.getAttribute('class') || '') + ' ' + classes);
    }
  }]);
  return Converter;
}();

exports.default = Converter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbImRpdkNvbnRhaW5lcnMiLCJzcGxpdCIsIkNvbnZlcnRlciIsIndNb2RlbCIsInBhcmVudENvbnZlcnRlciIsIndvcmRNb2RlbCIsInBhcmVudCIsImRvYyIsImNvbnRlbnQiLCJjb252ZXJ0IiwiYXJndW1lbnRzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udmVydFN0eWxlIiwidGFnIiwiZWwiLCJhIiwiZ2V0U3R5bGVJZCIsImNvbnN0cnVjdG9yIiwiYWRkQ2xhc3MiLCJzdHlsZVBhdGgiLCJhc0Nzc0lEIiwicmVwbGFjZSIsImNsYXNzZXMiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsZ0JBQWdCLGlCQUFpQkMsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBdEI7O0lBRXFCQyxTO0FBQ25CLHFCQUFZQyxNQUFaLEVBQW9CQyxlQUFwQixFQUFxQztBQUFBOztBQUNuQyxTQUFLQyxTQUFMLEdBQWlCRixNQUFqQjtBQUNBLFNBQUtHLE1BQUwsR0FBY0YsZUFBZDtBQUNBLFNBQUtHLEdBQUwsR0FBV0gsbUJBQW1CQSxnQkFBZ0JHLEdBQTlDO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDRDs7Ozs7O0FBTUQ7NEJBQ1E7QUFDTixVQUFJLENBQUMsS0FBS0YsTUFBTixJQUFnQixLQUFLQSxNQUFMLENBQVlFLE9BQWhDLEVBQXlDLE9BQU8sS0FBS0MsT0FBTCxhQUFnQkMsU0FBaEIsQ0FBUDtBQUMxQzs7OzhCQUVTO0FBQ1IsV0FBS0YsT0FBTCxHQUFlLEtBQUtHLGFBQUwsRUFBZjtBQUNBLFVBQUksS0FBS0gsT0FBVCxFQUFrQjtBQUNoQixhQUFLRixNQUFMLENBQVlFLE9BQVosQ0FBb0JJLFdBQXBCLENBQWdDLEtBQUtKLE9BQXJDO0FBQ0QsT0FGRCxNQUVPLEtBQUtBLE9BQUwsR0FBZSxLQUFLRixNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZRSxPQUEzQixJQUFzQyxJQUFyRDs7QUFFUCxXQUFLSyxZQUFMLENBQWtCLEtBQUtMLE9BQXZCO0FBQ0Q7OztvQ0FFZTtBQUNkLG9DQUFnQixLQUFLTSxHQUFyQjtBQUNFLGFBQUssUUFBTDtBQUNFLGlCQUFPLEtBQUtQLEdBQUwsQ0FBU0ksYUFBVCxDQUF1QixLQUFLRyxHQUE1QixDQUFQO0FBQ0YsYUFBSyxVQUFMO0FBQ0UsY0FBSUMsS0FBSyxLQUFLRCxHQUFMLEVBQVQ7QUFDQSxpQkFBTyxLQUFLUCxHQUFMLENBQVNJLGFBQVQsQ0FBdUJJLEVBQXZCLENBQVA7QUFDRjtBQUNFLGlCQUFPLElBQVA7QUFQSjtBQVNEOzs7aUNBRVlBLEUsRUFBSUMsQyxFQUFHO0FBQ2xCLFdBQUtYLFNBQUwsQ0FBZVksVUFBZixLQUNNRCxJQUFJLEtBQUtYLFNBQUwsQ0FBZVksVUFBZixFQURWLEtBRUssS0FBS0MsV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJKLEVBQTFCLEVBQThCLEtBQUtSLEdBQUwsQ0FBU2EsU0FBVCxDQUFtQixLQUFLRixXQUFMLENBQWlCRyxPQUFqQixDQUF5QkwsQ0FBekIsQ0FBbkIsQ0FBOUIsQ0FGTDtBQUdEOzs7b0NBRWU7QUFDZCxhQUFPLEtBQVA7QUFDRDs7OzhCQUVTLENBQUU7Ozt3QkF4Q0c7QUFBRSxhQUFPLElBQVA7QUFBYzs7O3dCQUVyQjtBQUFFLGFBQU8sSUFBUDtBQUFjOzs7NEJBd0NYQSxDLEVBQUc7QUFDaEIsYUFBT0EsRUFBRU0sT0FBRixDQUFVLE1BQVYsRUFBa0IsR0FBbEIsQ0FBUDtBQUNEOzs7NkJBRWVQLEUsRUFBSVEsTyxFQUFTO0FBQzNCUixTQUFHUyxZQUFILENBQWdCLE9BQWhCLEdBQTRCVCxHQUFHVSxZQUFILENBQWdCLE9BQWhCLEtBQTRCLEVBQXhELFVBQThERixPQUE5RDtBQUNEOzs7OztrQkF4RGtCckIsUyIsImZpbGUiOiJjb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXZDb250YWluZXJzID0gJ1NFQ1RJT04sRElWLFREJy5zcGxpdCgnLCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXIge1xuICBjb25zdHJ1Y3Rvcih3TW9kZWwsIHBhcmVudENvbnZlcnRlcikge1xuICAgIHRoaXMud29yZE1vZGVsID0gd01vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udmVydGVyO1xuICAgIHRoaXMuZG9jID0gcGFyZW50Q29udmVydGVyICYmIHBhcmVudENvbnZlcnRlci5kb2M7XG4gICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgfVxuXG4gIGdldCB3b3JkVHlwZSgpIHsgcmV0dXJuIG51bGw7IH1cblxuICBnZXQgdGFnKCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gIC8qKiBpbnRlcmZhY2UgQVBJOiBoYXBwZW4gd2hlbiBqdXN0IHdvcmQgbW9kZWwgaWRlbnRpZmllZCwgd2l0aG91dCBjaGlsZHJlbiBhcHBlbmRlZCB5ZXQgKi9cbiAgdmlzaXQoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCB0aGlzLnBhcmVudC5jb250ZW50KSByZXR1cm4gdGhpcy5jb252ZXJ0KC4uLmFyZ3VtZW50cyk7XG4gIH1cblxuICBjb252ZXJ0KCkge1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50LmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICB9IGVsc2UgdGhpcy5jb250ZW50ID0gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuY29udGVudCB8fCBudWxsO1xuXG4gICAgdGhpcy5jb252ZXJ0U3R5bGUodGhpcy5jb250ZW50KTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgKHRoaXMudGFnKSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpO1xuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICB2YXIgZWwgPSB0aGlzLnRhZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudChlbCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0U3R5bGUoZWwsIGEpIHtcbiAgICB0aGlzLndvcmRNb2RlbC5nZXRTdHlsZUlkXG4gICAgICAmJiAoYSA9IHRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQoKSlcbiAgICAgICYmIHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3MoZWwsIHRoaXMuZG9jLnN0eWxlUGF0aCh0aGlzLmNvbnN0cnVjdG9yLmFzQ3NzSUQoYSkpKTtcbiAgfVxuXG4gIF9zaG91bGRJZ25vcmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVsZWFzZSgpIHt9XG5cbiAgc3RhdGljIGFzQ3NzSUQoYSkge1xuICAgIHJldHVybiBhLnJlcGxhY2UoL1xccysvZywgJ18nKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRDbGFzcyhlbCwgY2xhc3Nlcykge1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyd9ICR7Y2xhc3Nlc31gKTtcbiAgfVxufVxuIl19