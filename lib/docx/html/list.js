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

var _p = require('./p');

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Paragraph) {
  (0, _inherits3.default)(List, _Paragraph);

  function List() {
    (0, _classCallCheck3.default)(this, List);
    return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
  }

  (0, _createClass3.default)(List, [{
    key: 'convert',
    value: function convert() {
      var elParent = this.parent.content;var ul = elParent.lastElementChild;
      var listStyle = this.wordModel.getNumberingStyle();
      var numId = listStyle.id;var level = this.wordModel.getLevel();

      var makeStructure = function (parent) {
        ul = this.doc.createElement('ul');
        ul.id = listStyle.id;
        ul.setAttribute('level', level);
        this.constructor.addClass(ul, listStyle.getParentStyle().id);
        parent.appendChild(ul);
      }.bind(this);

      if (!ul || ul.localName != 'ul' || ul.id != numId) {
        makeStructure(elParent);
      } else if (ul.getAttribute('level') != level) {
        var possibleParent = ul.querySelector('[level="' + level + '"]');
        if (!possibleParent) {
          makeStructure(ul.querySelector('[level="' + (parseInt(level) - 1) + '"]') || ul);
        } else {
          ul = possibleParent;
        }
      }
      var li = this.doc.createElement('li');
      ul.appendChild(li);
      li.appendChild(this.content = this.createElement());
      var marker = this.doc.createElement('span');
      this.constructor.addClass(marker, 'marker');
      this.content.appendChild(marker); // as marker
      this.convertStyle(this.content);
    }
  }]);
  return List;
}(_p2.default);

exports.default = List;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiZWxQYXJlbnQiLCJwYXJlbnQiLCJjb250ZW50IiwidWwiLCJsYXN0RWxlbWVudENoaWxkIiwibGlzdFN0eWxlIiwid29yZE1vZGVsIiwiZ2V0TnVtYmVyaW5nU3R5bGUiLCJudW1JZCIsImlkIiwibGV2ZWwiLCJnZXRMZXZlbCIsIm1ha2VTdHJ1Y3R1cmUiLCJkb2MiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29uc3RydWN0b3IiLCJhZGRDbGFzcyIsImdldFBhcmVudFN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJiaW5kIiwibG9jYWxOYW1lIiwiZ2V0QXR0cmlidXRlIiwicG9zc2libGVQYXJlbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFyc2VJbnQiLCJsaSIsIm1hcmtlciIsImNvbnZlcnRTdHlsZSIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzhCQUNUO0FBQ1IsVUFBTUMsV0FBVyxLQUFLQyxNQUFMLENBQVlDLE9BQTdCLENBQXNDLElBQ3BDQyxLQUFLSCxTQUFTSSxnQkFEc0I7QUFFdEMsVUFBTUMsWUFBWSxLQUFLQyxTQUFMLENBQWVDLGlCQUFmLEVBQWxCO0FBQ0EsVUFBTUMsUUFBUUgsVUFBVUksRUFBeEIsQ0FBNEIsSUFDMUJDLFFBQVEsS0FBS0osU0FBTCxDQUFlSyxRQUFmLEVBRGtCOztBQUc1QixVQUFNQyxnQkFBZ0IsVUFBVVgsTUFBVixFQUFrQjtBQUN0Q0UsYUFBSyxLQUFLVSxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBTDtBQUNBWCxXQUFHTSxFQUFILEdBQVFKLFVBQVVJLEVBQWxCO0FBQ0FOLFdBQUdZLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBeUJMLEtBQXpCO0FBQ0EsYUFBS00sV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJkLEVBQTFCLEVBQThCRSxVQUFVYSxjQUFWLEdBQTJCVCxFQUF6RDtBQUNBUixlQUFPa0IsV0FBUCxDQUFtQmhCLEVBQW5CO0FBQ0QsT0FOcUIsQ0FNcEJpQixJQU5vQixDQU1mLElBTmUsQ0FBdEI7O0FBUUEsVUFBSSxDQUFDakIsRUFBRCxJQUFPQSxHQUFHa0IsU0FBSCxJQUFnQixJQUF2QixJQUErQmxCLEdBQUdNLEVBQUgsSUFBU0QsS0FBNUMsRUFBbUQ7QUFDakRJLHNCQUFjWixRQUFkO0FBQ0QsT0FGRCxNQUVPLElBQUlHLEdBQUdtQixZQUFILENBQWdCLE9BQWhCLEtBQTRCWixLQUFoQyxFQUF1QztBQUM1QyxZQUFNYSxpQkFBaUJwQixHQUFHcUIsYUFBSCxjQUE0QmQsS0FBNUIsUUFBdkI7QUFDQSxZQUFJLENBQUNhLGNBQUwsRUFBcUI7QUFDbkJYLHdCQUFjVCxHQUFHcUIsYUFBSCxlQUE0QkMsU0FBU2YsS0FBVCxJQUFrQixDQUE5QyxhQUF3RFAsRUFBdEU7QUFDRCxTQUZELE1BRU87QUFBRUEsZUFBS29CLGNBQUw7QUFBc0I7QUFDaEM7QUFDRCxVQUFNRyxLQUFLLEtBQUtiLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0FYLFNBQUdnQixXQUFILENBQWVPLEVBQWY7QUFDQUEsU0FBR1AsV0FBSCxDQUFlLEtBQUtqQixPQUFMLEdBQWUsS0FBS1ksYUFBTCxFQUE5QjtBQUNBLFVBQU1hLFNBQVMsS0FBS2QsR0FBTCxDQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQWY7QUFDQSxXQUFLRSxXQUFMLENBQWlCQyxRQUFqQixDQUEwQlUsTUFBMUIsRUFBa0MsUUFBbEM7QUFDQSxXQUFLekIsT0FBTCxDQUFhaUIsV0FBYixDQUF5QlEsTUFBekIsRUE1QlEsQ0E0QnlCO0FBQ2pDLFdBQUtDLFlBQUwsQ0FBa0IsS0FBSzFCLE9BQXZCO0FBQ0Q7OztFQS9CK0IyQixXOztrQkFBYjlCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFBhcmFncmFwaCB7XG4gIGNvbnZlcnQoKSB7XG4gICAgY29uc3QgZWxQYXJlbnQgPSB0aGlzLnBhcmVudC5jb250ZW50OyBsZXRcbiAgICAgIHVsID0gZWxQYXJlbnQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBsaXN0U3R5bGUgPSB0aGlzLndvcmRNb2RlbC5nZXROdW1iZXJpbmdTdHlsZSgpO1xuICAgIGNvbnN0IG51bUlkID0gbGlzdFN0eWxlLmlkOyBjb25zdFxuICAgICAgbGV2ZWwgPSB0aGlzLndvcmRNb2RlbC5nZXRMZXZlbCgpO1xuXG4gICAgY29uc3QgbWFrZVN0cnVjdHVyZSA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIHVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgIHVsLmlkID0gbGlzdFN0eWxlLmlkO1xuICAgICAgdWwuc2V0QXR0cmlidXRlKCdsZXZlbCcsIGxldmVsKTtcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3ModWwsIGxpc3RTdHlsZS5nZXRQYXJlbnRTdHlsZSgpLmlkKTtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh1bCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgaWYgKCF1bCB8fCB1bC5sb2NhbE5hbWUgIT0gJ3VsJyB8fCB1bC5pZCAhPSBudW1JZCkge1xuICAgICAgbWFrZVN0cnVjdHVyZShlbFBhcmVudCk7XG4gICAgfSBlbHNlIGlmICh1bC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykgIT0gbGV2ZWwpIHtcbiAgICAgIGNvbnN0IHBvc3NpYmxlUGFyZW50ID0gdWwucXVlcnlTZWxlY3RvcihgW2xldmVsPVwiJHtsZXZlbH1cIl1gKTtcbiAgICAgIGlmICghcG9zc2libGVQYXJlbnQpIHtcbiAgICAgICAgbWFrZVN0cnVjdHVyZSh1bC5xdWVyeVNlbGVjdG9yKGBbbGV2ZWw9XCIke3BhcnNlSW50KGxldmVsKSAtIDF9XCJdYCkgfHwgdWwpO1xuICAgICAgfSBlbHNlIHsgdWwgPSBwb3NzaWJsZVBhcmVudDsgfVxuICAgIH1cbiAgICBjb25zdCBsaSA9IHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgIGxpLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCA9IHRoaXMuY3JlYXRlRWxlbWVudCgpKTtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5hZGRDbGFzcyhtYXJrZXIsICdtYXJrZXInKTtcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobWFya2VyKTsvLyBhcyBtYXJrZXJcbiAgICB0aGlzLmNvbnZlcnRTdHlsZSh0aGlzLmNvbnRlbnQpO1xuICB9XG59XG4iXX0=