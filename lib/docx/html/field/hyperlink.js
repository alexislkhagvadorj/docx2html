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

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uptrim(el) {
  var parent = el.parentNode;
  parent.removeChild(el);
  if (parent.childNodes.length == 0) uptrim(parent);
}

var Hyperlink = function (_Field) {
  (0, _inherits3.default)(Hyperlink, _Field);

  function Hyperlink() {
    (0, _classCallCheck3.default)(this, Hyperlink);
    return (0, _possibleConstructorReturn3.default)(this, (Hyperlink.__proto__ || (0, _getPrototypeOf2.default)(Hyperlink)).apply(this, arguments));
  }

  (0, _createClass3.default)(Hyperlink, [{
    key: 'convert',
    value: function convert(elEnd) {
      var a = this.doc.createElement('a');
      a.href = this.wordModel.getLink();
      elEnd.id = this.doc.uid();

      var current = this.elStart;var parent = current.parentNode;
      while (!parent.querySelector('#' + elEnd.id)) {
        current = parent;
        parent = current.parentNode;
      }
      parent.insertBefore(a, current);
      while (a.nextSibling) {
        a.appendChild(a.nextSibling);
      }uptrim(this.elStart);
      uptrim(elEnd);
    }
  }]);
  return Hyperlink;
}(_field2.default);

exports.default = Hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbInVwdHJpbSIsImVsIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsIkh5cGVybGluayIsImVsRW5kIiwiYSIsImRvYyIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwid29yZE1vZGVsIiwiZ2V0TGluayIsImlkIiwidWlkIiwiY3VycmVudCIsImVsU3RhcnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJhcHBlbmRDaGlsZCIsIkZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFvQjtBQUNsQixNQUFNQyxTQUFTRCxHQUFHRSxVQUFsQjtBQUNBRCxTQUFPRSxXQUFQLENBQW1CSCxFQUFuQjtBQUNBLE1BQUlDLE9BQU9HLFVBQVAsQ0FBa0JDLE1BQWxCLElBQTRCLENBQWhDLEVBQW1DTixPQUFPRSxNQUFQO0FBQ3BDOztJQUNvQkssUzs7Ozs7Ozs7Ozs0QkFDWEMsSyxFQUFPO0FBQ2IsVUFBTUMsSUFBSSxLQUFLQyxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBVjtBQUNBRixRQUFFRyxJQUFGLEdBQVMsS0FBS0MsU0FBTCxDQUFlQyxPQUFmLEVBQVQ7QUFDQU4sWUFBTU8sRUFBTixHQUFXLEtBQUtMLEdBQUwsQ0FBU00sR0FBVCxFQUFYOztBQUVBLFVBQUlDLFVBQVUsS0FBS0MsT0FBbkIsQ0FBNEIsSUFDMUJoQixTQUFTZSxRQUFRZCxVQURTO0FBRTVCLGFBQU8sQ0FBQ0QsT0FBT2lCLGFBQVAsT0FBeUJYLE1BQU1PLEVBQS9CLENBQVIsRUFBOEM7QUFDNUNFLGtCQUFVZixNQUFWO0FBQ0FBLGlCQUFTZSxRQUFRZCxVQUFqQjtBQUNEO0FBQ0RELGFBQU9rQixZQUFQLENBQW9CWCxDQUFwQixFQUF1QlEsT0FBdkI7QUFDQSxhQUFPUixFQUFFWSxXQUFUO0FBQXNCWixVQUFFYSxXQUFGLENBQWNiLEVBQUVZLFdBQWhCO0FBQXRCLE9BRUFyQixPQUFPLEtBQUtrQixPQUFaO0FBQ0FsQixhQUFPUSxLQUFQO0FBQ0Q7OztFQWpCb0NlLGU7O2tCQUFsQmhCLFMiLCJmaWxlIjoiaHlwZXJsaW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZpZWxkIGZyb20gJy4vZmllbGQnO1xuXG5mdW5jdGlvbiB1cHRyaW0oZWwpIHtcbiAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgaWYgKHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwKSB1cHRyaW0ocGFyZW50KTtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh5cGVybGluayBleHRlbmRzIEZpZWxkIHtcbiAgY29udmVydChlbEVuZCkge1xuICAgIGNvbnN0IGEgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdGhpcy53b3JkTW9kZWwuZ2V0TGluaygpO1xuICAgIGVsRW5kLmlkID0gdGhpcy5kb2MudWlkKCk7XG5cbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZWxTdGFydDsgbGV0XG4gICAgICBwYXJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgd2hpbGUgKCFwYXJlbnQucXVlcnlTZWxlY3RvcihgIyR7ZWxFbmQuaWR9YCkpIHtcbiAgICAgIGN1cnJlbnQgPSBwYXJlbnQ7XG4gICAgICBwYXJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoYSwgY3VycmVudCk7XG4gICAgd2hpbGUgKGEubmV4dFNpYmxpbmcpIGEuYXBwZW5kQ2hpbGQoYS5uZXh0U2libGluZyk7XG5cbiAgICB1cHRyaW0odGhpcy5lbFN0YXJ0KTtcbiAgICB1cHRyaW0oZWxFbmQpO1xuICB9XG59XG4iXX0=