'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = docx2html;

var _docx4js = require('docx4js');

var _docx4js2 = _interopRequireDefault(_docx4js);

var _factory = require('./docx/html/factory');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function docx2html(file, opt) {
  return _docx4js2.default.load(file).then(function (docx) {
    return docx.parse(_docx4js2.default.createVisitorFactory(_factory2.default, opt));
  });
}

docx2html.parser = _docx4js2.default;
docx2html.converters = _factory2.default;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4Mmh0bWwiLCJmaWxlIiwib3B0IiwiZG9jeDRqcyIsImxvYWQiLCJ0aGVuIiwiZG9jeCIsInBhcnNlIiwiY3JlYXRlVmlzaXRvckZhY3RvcnkiLCJjb252ZXJ0ZXJzIiwicGFyc2VyIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFHd0JBLFM7O0FBSHhCOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVNBLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QjtBQUMzQyxTQUFPQyxrQkFBUUMsSUFBUixDQUFhSCxJQUFiLEVBQ0pJLElBREksQ0FDQyxVQUFDQyxJQUFEO0FBQUEsV0FBVUEsS0FBS0MsS0FBTCxDQUFXSixrQkFBUUssb0JBQVIsQ0FBNkJDLGlCQUE3QixFQUF5Q1AsR0FBekMsQ0FBWCxDQUFWO0FBQUEsR0FERCxDQUFQO0FBRUQ7O0FBRURGLFVBQVVVLE1BQVYsR0FBbUJQLGlCQUFuQjtBQUNBSCxVQUFVUyxVQUFWLEdBQXVCQSxpQkFBdkIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tICdkb2N4NGpzJztcbmltcG9ydCBjb252ZXJ0ZXJzIGZyb20gJy4vZG9jeC9odG1sL2ZhY3RvcnknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb2N4Mmh0bWwoZmlsZSwgb3B0KSB7XG4gIHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSlcbiAgICAudGhlbigoZG9jeCkgPT4gZG9jeC5wYXJzZShkb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KGNvbnZlcnRlcnMsIG9wdCkpKTtcbn1cblxuZG9jeDJodG1sLnBhcnNlciA9IGRvY3g0anM7XG5kb2N4Mmh0bWwuY29udmVydGVycyA9IGNvbnZlcnRlcnM7XG4iXX0=