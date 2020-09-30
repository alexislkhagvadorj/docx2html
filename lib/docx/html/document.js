'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDocument = void 0;var CSSStyleDeclaration = void 0;

var Document = function (_Converter) {
  (0, _inherits3.default)(Document, _Converter);

  function Document() {
    (0, _classCallCheck3.default)(this, Document);
    return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
  }

  (0, _createClass3.default)(Document, [{
    key: 'convert',
    value: function convert() {
      this.doc = this.constructor.create(this.options);
      this.content = this.doc;
      var contentStyle = this.content.style;
      contentStyle.backgroundColor = 'transparent';
      contentStyle.minHeight = '1000px';
      contentStyle.width = '100%';
      contentStyle.paddingTop = '20px';
      contentStyle.overflow = 'auto';
      contentStyle.tabSize = '3rem';

      var style = this.doc.createStyle('*');
      style.margin = '0';
      style.border = '0';
      style.padding = '0';
      style.boxSizing = 'border-box';
      style.whiteSpace = 'pre-wrap';

      style = this.doc.createStyle('table');
      style.width = '100%';
      style.borderCollapse = 'collapse';
      style.wordBreak = 'break-word';

      style = this.doc.createStyle('section');
      style.margin = 'auto';
      style.backgroundColor = 'white';
      style.color = 'black';
      style.position = 'relative';
      style.zIndex = 0;

      // style = this.doc.createStyle('p:empty:before');
      // style.content = '""';
      // style.display = 'inline-block';

      style = this.doc.createStyle('ul');
      style.listStyle = 'none';

      style = this.doc.createStyle('ul>li>p');
      style.position = 'relative';

      style = this.doc.createStyle('ul .marker');
      style.position = 'absolute';

      style = this.doc.createStyle('a');
      style.textDecoration = 'none';

      style = this.doc.createStyle('.unsupported');
      style.outline = '2px red solid';

      style = this.doc.createStyle('.warning');
      style.outline = '1px yellow solid';
      this.convertStyle();
    }
  }, {
    key: 'convertStyle',
    value: function convertStyle() {
      var bgStyle = this.wordModel.getBackgroundStyle();
      if (!bgStyle) return;

      var style = this.doc.createStyle('section');
      switch (typeof bgStyle === 'undefined' ? 'undefined' : (0, _typeof3.default)(bgStyle)) {
        case 'object':
          // fill
          console.warn('not support fill color on document background yet');
          break;
        default:
          style.backgroundColor = bgStyle;
          break;
      }
    }

    /**
    * opt: {
    *   template: function(style, html, props){ return (html)},
      extendScript: "http://a.com/a.js"
      }
    */

  }, {
    key: 'toString',
    value: function toString(opt) {
      return this.doc.toString(opt, this.props);
    }
  }, {
    key: 'release',
    value: function release() {
      this.doc.release();
    }
  }, {
    key: 'asZip',
    value: function asZip(opt) {
      return this.doc.asZip(opt, this.props);
    }
  }, {
    key: 'download',
    value: function download(opt) {
      return this.doc.download(opt, this.props);
    }

    /**
    * opt=extend(toString.opt,{
      saveImage: function(arrayBuffer, doc.props): promise(url) {},
      saveHtml: function(){}
    })
    */

  }, {
    key: 'save',
    value: function save(opt) {
      return this.doc.save(opt, this.props);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'html';
    }
  }], [{
    key: 'create',
    value: function create(opt) {
      var selfConverter = this;
      return function (document) {
        var doc = function browserDoc() {
          var _uid = 0;
          var root = (0, _assign2.default)(document.createElement('div'), {
            id: 'A',
            section: null,
            createElement: document.createElement.bind(document),
            createTextNode: document.createTextNode.bind(document),
            createStyleSheet: function createStyleSheet() {
              if (this.stylesheet) return this.stylesheet;
              var elStyle = this.createElement('style');
              this.body.appendChild(elStyle, null);
              return this.stylesheet = elStyle.sheet;
            },
            getStyleText: function getStyleText() {
              var styles = [];
              for (var i = 0, rules = this.stylesheet.cssRules, len = rules.length; i < len; i++) {
                styles.push(rules[i].cssText);
              }return styles.join('\r\n');
            },
            uid: function uid() {
              return this.id + _uid++;
            },
            toString: function toString(opt, props) {
              if (opt && typeof opt.template !== 'undefined' && $tool.isFunction(opt.template)) return opt.template(this.getStyleText(), this._html(), props);
              var html = ['<!doctype html>\r\n<html><head><meta charset=utf-8><meta key="generator" value="docx2html"><title>' + (props.name || '') + '</title><style>'];
              html.push(this.getStyleText());
              html.push('</style></head><body>');
              html.push(this._html());
              opt && opt.extendScript && html.push('<script src="' + opt.extendScript + '"></script>');
              html.push('</body><html>');
              return html.join('\r\n');
            },
            _html: function _html() {
              return this.outerHTML;
            }
          });

          function indexOf(el, els) {
            for (var i = els.length - 1; i > 0; i--) {
              if (el == els[i]) return i;
            }return 0;
          }

          (opt && opt.container || document.body).appendChild(root);
          root.body = root;
          return root;
        }();

        return function mixin(doc) {
          var stylesheet = doc.createStyleSheet();
          var relStyles = {};var styles = {};

          return (0, _assign2.default)(selfConverter['browserify'](doc, stylesheet, opt), {
            createStyle: function createStyle(selector) {
              var _this2 = this;

              if (styles[selector]) return styles[selector];
              var rules = stylesheet.cssRules;var len = rules.length;
              stylesheet.insertRule(selector.split(',').map(function (a) {
                return a.trim()[0] == '#' ? a : '#' + _this2.id + ' ' + a;
              }).join(',') + '{}', len);
              return styles[selector] = stylesheet.cssRules[len].style;
            },
            stylePath: function stylePath(a, parent) {
              if (parent) return relStyles[a] = parent;
              var paths = [a];var parent = a;
              while (parent = relStyles[parent]) {
                paths.unshift(parent);
              }return paths.join(' ');
            },
            release: function release() {
              delete this.section;
              this._release();
            }
          });
        }(doc);
      }(document);
    }
  }, {
    key: 'nodefy',
    value: function nodefy(doc, stylesheet, opt) {
      return (0, _assign2.default)(doc, {
        _release: function _release() {},
        asImageURL: function asImageURL(buffer) {
          if (opt && typeof opt.asImageURL !== 'undefined') return opt.asImageURL(buffer);
          return 'image://notsupport';
        },
        asZip: function asZip() {
          throw new Error('not support');
        },
        download: function download() {
          throw new Error('not support');
        },
        save: function save() {
          throw new Error('not support');
        }
      });
    }
  }, {
    key: 'browserify',
    value: function browserify(doc, stylesheet, opt) {
      var Proto_Blob = function (a) {
        a = URL.createObjectURL(new Blob()).split('/');
        a.pop();
        return a.join('/');
      }();
      var Reg_Proto_Blob = new RegExp(Proto_Blob + '/([\\w\\d-]+)', 'gi');

      return (0, _assign2.default)(doc, {
        asZip: function asZip(opt, props) {
          var zip = new _jszip2.default();var hasImage = false;
          var f = zip.folder('images');
          (0, _keys2.default)(this.images).forEach(function (a) {
            hasImage = true;
            f.file(a.split('/').pop(), this[a]);
          }, this.images);
          zip.file('props.json', (0, _stringify2.default)(props));
          zip.file('main.html', hasImage ? this.toString(opt).replace(Proto_Blob, 'images') : this.toString());
          return zip;
        },
        download: function download(opt, props) {
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.href = URL.createObjectURL(this.asZip(opt, props).generate({ type: 'blob' }));
          a.download = (props.name || 'document') + '.zip';
          a.click();
          URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        },
        save: function save(opt, props) {
          var hasImage = false;var images = {};var me = this;
          return $tool.Deferred.when((this.images && (0, _keys2.default)(this.images) || []).map(function (a) {
            hasImage = true;
            return opt.saveImage(this[a], props).then(function (url) {
              return images[a] = url;
            });
          }, this.images)).then(function () {
            var html = me.toString(opt, props);
            if (hasImage) html = html.replace(Reg_Proto_Blob, function (a, id) {
              return images[a];
            });
            return opt.saveHtml(html, props);
          });
        },

        images: {},
        asImageURL: function asImageURL(arrayBuffer) {
          var url = URL.createObjectURL(new Blob([arrayBuffer], { type: 'image/' + (typeof arrayBuffer === 'string' ? 'svg+xml' : '*') }));
          this.images[url] = arrayBuffer;
          return url;
        },
        _release: function _release() {
          (0, _keys2.default)(this.images).forEach(function (b) {
            URL.revokeObjectURL(b);
          });
          delete this.images;
        }
      });
    }
  }]);
  return Document;
}(_converter2.default);

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsInRhYlNpemUiLCJjcmVhdGVTdHlsZSIsIm1hcmdpbiIsImJvcmRlciIsInBhZGRpbmciLCJib3hTaXppbmciLCJ3aGl0ZVNwYWNlIiwiYm9yZGVyQ29sbGFwc2UiLCJ3b3JkQnJlYWsiLCJjb2xvciIsInBvc2l0aW9uIiwiekluZGV4IiwibGlzdFN0eWxlIiwidGV4dERlY29yYXRpb24iLCJvdXRsaW5lIiwiY29udmVydFN0eWxlIiwiYmdTdHlsZSIsIndvcmRNb2RlbCIsImdldEJhY2tncm91bmRTdHlsZSIsImNvbnNvbGUiLCJ3YXJuIiwib3B0IiwidG9TdHJpbmciLCJwcm9wcyIsInJlbGVhc2UiLCJhc1ppcCIsImRvd25sb2FkIiwic2F2ZSIsInNlbGZDb252ZXJ0ZXIiLCJkb2N1bWVudCIsImJyb3dzZXJEb2MiLCJ1aWQiLCJyb290IiwiY3JlYXRlRWxlbWVudCIsImlkIiwic2VjdGlvbiIsImJpbmQiLCJjcmVhdGVUZXh0Tm9kZSIsImNyZWF0ZVN0eWxlU2hlZXQiLCJzdHlsZXNoZWV0IiwiZWxTdHlsZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNoZWV0IiwiZ2V0U3R5bGVUZXh0Iiwic3R5bGVzIiwiaSIsInJ1bGVzIiwiY3NzUnVsZXMiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwiY3NzVGV4dCIsImpvaW4iLCJ0ZW1wbGF0ZSIsIiR0b29sIiwiaXNGdW5jdGlvbiIsIl9odG1sIiwiaHRtbCIsIm5hbWUiLCJleHRlbmRTY3JpcHQiLCJvdXRlckhUTUwiLCJpbmRleE9mIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwiYSIsInRyaW0iLCJzdHlsZVBhdGgiLCJwYXJlbnQiLCJwYXRocyIsInVuc2hpZnQiLCJfcmVsZWFzZSIsImFzSW1hZ2VVUkwiLCJidWZmZXIiLCJFcnJvciIsIlByb3RvX0Jsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwicG9wIiwiUmVnX1Byb3RvX0Jsb2IiLCJSZWdFeHAiLCJ6aXAiLCJKU1ppcCIsImhhc0ltYWdlIiwiZiIsImZvbGRlciIsImltYWdlcyIsImZvckVhY2giLCJmaWxlIiwicmVwbGFjZSIsImhyZWYiLCJnZW5lcmF0ZSIsInR5cGUiLCJjbGljayIsInJldm9rZU9iamVjdFVSTCIsInJlbW92ZUNoaWxkIiwibWUiLCJEZWZlcnJlZCIsIndoZW4iLCJzYXZlSW1hZ2UiLCJ0aGVuIiwidXJsIiwic2F2ZUh0bWwiLCJhcnJheUJ1ZmZlciIsImIiLCJDb252ZXJ0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLHVCQUFKLENBQW9CLElBQ2xCQyw0QkFEa0I7O0lBR0NDLFE7Ozs7Ozs7Ozs7OEJBR1Q7QUFDUixXQUFLQyxHQUFMLEdBQVcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsS0FBS0MsT0FBN0IsQ0FBWDtBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFLSixHQUFwQjtBQUNBLFVBQU1LLGVBQWUsS0FBS0QsT0FBTCxDQUFhRSxLQUFsQztBQUNBRCxtQkFBYUUsZUFBYixHQUErQixhQUEvQjtBQUNBRixtQkFBYUcsU0FBYixHQUF5QixRQUF6QjtBQUNBSCxtQkFBYUksS0FBYixHQUFxQixNQUFyQjtBQUNBSixtQkFBYUssVUFBYixHQUEwQixNQUExQjtBQUNBTCxtQkFB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WDtBQUFBLGFBQTdCLENBQVA7QUFDZCxtQkFBT25ELElBQUl5RixRQUFKLENBQWFwRCxJQUFiLEVBQW1CbkMsS0FBbkIsQ0FBUDtBQUNELFdBVEksQ0FBUDtBQVVELFNBbEN1Qjs7QUFtQ3hCdUUsZ0JBQVEsRUFuQ2dCO0FBb0N4QmYsa0JBcEN3QixzQkFvQ2JnQyxXQXBDYSxFQW9DQTtBQUN0QixjQUFNRixNQUFNMUIsSUFBSUMsZUFBSixDQUFvQixJQUFJQyxJQUFKLENBQVMsQ0FBQzBCLFdBQUQsQ0FBVCxFQUM5QixFQUFFWCxrQkFBZSxPQUFRVyxXQUFSLEtBQXlCLFFBQXpCLEdBQW9DLFNBQXBDLEdBQWdELEdBQS9ELENBQUYsRUFEOEIsQ0FBcEIsQ0FBWjtBQUVBLGVBQUtqQixNQUFMLENBQVllLEdBQVosSUFBbUJFLFdBQW5CO0FBQ0EsaUJBQU9GLEdBQVA7QUFDRCxTQXpDdUI7QUEwQ3hCL0IsZ0JBMUN3QixzQkEwQ2I7QUFDVCw4QkFBWSxLQUFLZ0IsTUFBakIsRUFBeUJDLE9BQXpCLENBQWlDLFVBQUNpQixDQUFELEVBQU87QUFDdEM3QixnQkFBSW1CLGVBQUosQ0FBb0JVLENBQXBCO0FBQ0QsV0FGRDtBQUdBLGlCQUFPLEtBQUtsQixNQUFaO0FBQ0Q7QUEvQ3VCLE9BQW5CLENBQVA7QUFpREQ7OztFQWxRbUNtQixtQjs7a0JBQWpCOUgsUSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCc7XG5pbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcblxubGV0IGNyZWF0ZURvY3VtZW50OyBsZXRcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBDb252ZXJ0ZXIge1xuICBnZXQgdGFnKCkgeyByZXR1cm4gJ2h0bWwnOyB9XG5cbiAgY29udmVydCgpIHtcbiAgICB0aGlzLmRvYyA9IHRoaXMuY29uc3RydWN0b3IuY3JlYXRlKHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5kb2M7XG4gICAgY29uc3QgY29udGVudFN0eWxlID0gdGhpcy5jb250ZW50LnN0eWxlO1xuICAgIGNvbnRlbnRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIGNvbnRlbnRTdHlsZS5taW5IZWlnaHQgPSAnMTAwMHB4JztcbiAgICBjb250ZW50U3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGVudFN0eWxlLnBhZGRpbmdUb3AgPSAnMjBweCc7XG4gICAgY29udGVudFN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuICAgIGNvbnRlbnRTdHlsZS50YWJTaXplID0gJzNyZW0nXG5cbiAgICBsZXQgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnKicpO1xuICAgIHN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICBzdHlsZS5ib3JkZXIgPSAnMCc7XG4gICAgc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICBzdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd0YWJsZScpO1xuICAgIHN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN0eWxlLmJvcmRlckNvbGxhcHNlID0gJ2NvbGxhcHNlJztcbiAgICBzdHlsZS53b3JkQnJlYWsgPSAnYnJlYWstd29yZCc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdzZWN0aW9uJyk7XG4gICAgc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xuICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBzdHlsZS56SW5kZXggPSAwO1xuXG4gICAgLy8gc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgncDplbXB0eTpiZWZvcmUnKTtcbiAgICAvLyBzdHlsZS5jb250ZW50ID0gJ1wiXCInO1xuICAgIC8vIHN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsJyk7XG4gICAgc3R5bGUubGlzdFN0eWxlID0gJ25vbmUnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgndWw+bGk+cCcpO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsIC5tYXJrZXInKTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdhJyk7XG4gICAgc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcudW5zdXBwb3J0ZWQnKTtcbiAgICBzdHlsZS5vdXRsaW5lID0gJzJweCByZWQgc29saWQnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnLndhcm5pbmcnKTtcbiAgICBzdHlsZS5vdXRsaW5lID0gJzFweCB5ZWxsb3cgc29saWQnO1xuICAgIHRoaXMuY29udmVydFN0eWxlKCk7XG4gIH1cblxuICBjb252ZXJ0U3R5bGUoKSB7XG4gICAgY29uc3QgYmdTdHlsZSA9IHRoaXMud29yZE1vZGVsLmdldEJhY2tncm91bmRTdHlsZSgpO1xuICAgIGlmICghYmdTdHlsZSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpO1xuICAgIHN3aXRjaCAodHlwZW9mIGJnU3R5bGUpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6Ly8gZmlsbFxuICAgICAgICBjb25zb2xlLndhcm4oJ25vdCBzdXBwb3J0IGZpbGwgY29sb3Igb24gZG9jdW1lbnQgYmFja2dyb3VuZCB5ZXQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ1N0eWxlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBvcHQ6IHtcbiAgKiAgIHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcbiAgICBleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxuICAgIH1cbiAgKi9cbiAgdG9TdHJpbmcob3B0KSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLnRvU3RyaW5nKG9wdCwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICByZWxlYXNlKCkge1xuICAgIHRoaXMuZG9jLnJlbGVhc2UoKTtcbiAgfVxuXG4gIGFzWmlwKG9wdCkge1xuICAgIHJldHVybiB0aGlzLmRvYy5hc1ppcChvcHQsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgZG93bmxvYWQob3B0KSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmRvd25sb2FkKG9wdCwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgKiBvcHQ9ZXh0ZW5kKHRvU3RyaW5nLm9wdCx7XG4gICAgc2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxuICAgIHNhdmVIdG1sOiBmdW5jdGlvbigpe31cbiAgfSlcbiAgKi9cbiAgc2F2ZShvcHQpIHtcbiAgICByZXR1cm4gdGhpcy5kb2Muc2F2ZShvcHQsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShvcHQpIHtcbiAgICBjb25zdCBzZWxmQ29udmVydGVyID0gdGhpcztcbiAgICByZXR1cm4gKGZ1bmN0aW9uIChkb2N1bWVudCkge1xuICAgICAgdmFyIGRvYyA9IChmdW5jdGlvbiBicm93c2VyRG9jKCkge1xuICAgICAgICBsZXQgdWlkID0gMDtcbiAgICAgICAgY29uc3Qgcm9vdCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIHtcbiAgICAgICAgICBpZDogJ0EnLFxuICAgICAgICAgIHNlY3Rpb246IG51bGwsXG4gICAgICAgICAgY3JlYXRlRWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKGRvY3VtZW50KSxcbiAgICAgICAgICBjcmVhdGVUZXh0Tm9kZTogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUuYmluZChkb2N1bWVudCksXG4gICAgICAgICAgY3JlYXRlU3R5bGVTaGVldCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlc2hlZXQpIHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG4gICAgICAgICAgICBjb25zdCBlbFN0eWxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKGVsU3R5bGUsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGVzaGVldCA9IGVsU3R5bGUuc2hlZXQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRTdHlsZVRleHQoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBydWxlcyA9IHRoaXMuc3R5bGVzaGVldC5jc3NSdWxlcywgbGVuID0gcnVsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHN0eWxlcy5wdXNoKHJ1bGVzW2ldLmNzc1RleHQpO1xuICAgICAgICAgICAgcmV0dXJuIHN0eWxlcy5qb2luKCdcXHJcXG4nKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVpZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkICsgKHVpZCsrKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRvU3RyaW5nKG9wdCwgcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChvcHQgJiYgdHlwZW9mIG9wdC50ZW1wbGF0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgJHRvb2wuaXNGdW5jdGlvbihvcHQudGVtcGxhdGUpKSByZXR1cm4gb3B0LnRlbXBsYXRlKHRoaXMuZ2V0U3R5bGVUZXh0KCksIHRoaXMuX2h0bWwoKSwgcHJvcHMpO1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IFtgPCFkb2N0eXBlIGh0bWw+XFxyXFxuPGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD11dGYtOD48bWV0YSBrZXk9XCJnZW5lcmF0b3JcIiB2YWx1ZT1cImRvY3gyaHRtbFwiPjx0aXRsZT4ke3Byb3BzLm5hbWUgfHwgJyd9PC90aXRsZT48c3R5bGU+YF07XG4gICAgICAgICAgICBodG1sLnB1c2godGhpcy5nZXRTdHlsZVRleHQoKSk7XG4gICAgICAgICAgICBodG1sLnB1c2goJzwvc3R5bGU+PC9oZWFkPjxib2R5PicpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKHRoaXMuX2h0bWwoKSk7XG4gICAgICAgICAgICBvcHQgJiYgb3B0LmV4dGVuZFNjcmlwdCAmJiBodG1sLnB1c2goYDxzY3JpcHQgc3JjPVwiJHtvcHQuZXh0ZW5kU2NyaXB0fVwiPjwvc2NyaXB0PmApO1xuICAgICAgICAgICAgaHRtbC5wdXNoKCc8L2JvZHk+PGh0bWw+Jyk7XG4gICAgICAgICAgICByZXR1cm4gaHRtbC5qb2luKCdcXHJcXG4nKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9odG1sKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0ZXJIVE1MO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSBlbHMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkgaWYgKGVsID09IGVsc1tpXSkgcmV0dXJuIGk7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICAob3B0ICYmIG9wdC5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICAgIHJvb3QuYm9keSA9IHJvb3Q7XG4gICAgICAgIHJldHVybiByb290O1xuICAgICAgfSgpKTtcblxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2MpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5jcmVhdGVTdHlsZVNoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlbFN0eWxlcyA9IHt9OyBjb25zdFxuICAgICAgICAgIHN0eWxlcyA9IHt9O1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbJ2Jyb3dzZXJpZnknXShkb2MsIHN0eWxlc2hlZXQsIG9wdCksIHtcbiAgICAgICAgICBjcmVhdGVTdHlsZShzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKHN0eWxlc1tzZWxlY3Rvcl0pIHJldHVybiBzdHlsZXNbc2VsZWN0b3JdO1xuICAgICAgICAgICAgY29uc3QgcnVsZXMgPSBzdHlsZXNoZWV0LmNzc1J1bGVzOyBjb25zdCBsZW4gPSBydWxlcy5sZW5ndGg7XG4gICAgICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoYCR7c2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoKGEpID0+IChhLnRyaW0oKVswXSA9PSAnIycgPyBhIDogYCMke3RoaXMuaWR9ICR7YX1gKSkuam9pbignLCcpfXt9YCwgbGVuKTtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXNbc2VsZWN0b3JdID0gc3R5bGVzaGVldC5jc3NSdWxlc1tsZW5dLnN0eWxlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVQYXRoKGEsIHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCkgcmV0dXJuIHJlbFN0eWxlc1thXSA9IHBhcmVudDtcbiAgICAgICAgICAgIGNvbnN0IHBhdGhzID0gW2FdOyB2YXIgcGFyZW50ID0gYTtcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgPSByZWxTdHlsZXNbcGFyZW50XSkgcGF0aHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLmpvaW4oJyAnKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbGVhc2UoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5fcmVsZWFzZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfShkb2MpKTtcbiAgICB9KGRvY3VtZW50KSk7XG4gIH1cblxuICBzdGF0aWMgbm9kZWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLCB7XG4gICAgICBfcmVsZWFzZSgpIHtcblxuICAgICAgfSxcbiAgICAgIGFzSW1hZ2VVUkwoYnVmZmVyKSB7XG4gICAgICAgIGlmIChvcHQgJiYgdHlwZW9mIChvcHQuYXNJbWFnZVVSTCkgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKTtcbiAgICAgICAgcmV0dXJuICdpbWFnZTovL25vdHN1cHBvcnQnO1xuICAgICAgfSxcbiAgICAgIGFzWmlwKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jyk7XG4gICAgICB9LFxuICAgICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKTtcbiAgICAgIH0sXG4gICAgICBzYXZlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGJyb3dzZXJpZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpIHtcbiAgICBjb25zdCBQcm90b19CbG9iID0gKGZ1bmN0aW9uIChhKSB7XG4gICAgICBhID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuICAgICAgYS5wb3AoKTtcbiAgICAgIHJldHVybiBhLmpvaW4oJy8nKTtcbiAgICB9KCkpO1xuICAgIGNvbnN0IFJlZ19Qcm90b19CbG9iID0gbmV3IFJlZ0V4cChgJHtQcm90b19CbG9ifS8oW1xcXFx3XFxcXGQtXSspYCwgJ2dpJyk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2MsIHtcbiAgICAgIGFzWmlwKG9wdCwgcHJvcHMpIHtcbiAgICAgICAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7IGxldCBoYXNJbWFnZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBmID0gemlwLmZvbGRlcignaW1hZ2VzJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgaGFzSW1hZ2UgPSB0cnVlO1xuICAgICAgICAgIGYuZmlsZShhLnNwbGl0KCcvJykucG9wKCksIHRoaXNbYV0pO1xuICAgICAgICB9LCB0aGlzLmltYWdlcyk7XG4gICAgICAgIHppcC5maWxlKCdwcm9wcy5qc29uJywgSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcbiAgICAgICAgemlwLmZpbGUoJ21haW4uaHRtbCcsIGhhc0ltYWdlID8gdGhpcy50b1N0cmluZyhvcHQpLnJlcGxhY2UoUHJvdG9fQmxvYiwgJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHppcDtcbiAgICAgIH0sXG4gICAgICBkb3dubG9hZChvcHQsIHByb3BzKSB7XG4gICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgIGEuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQsIHByb3BzKS5nZW5lcmF0ZSh7IHR5cGU6ICdibG9iJyB9KSk7XG4gICAgICAgIGEuZG93bmxvYWQgPSBgJHtwcm9wcy5uYW1lIHx8ICdkb2N1bWVudCd9LnppcGA7XG4gICAgICAgIGEuY2xpY2soKTtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgfSxcbiAgICAgIHNhdmUob3B0LCBwcm9wcykge1xuICAgICAgICBsZXQgaGFzSW1hZ2UgPSBmYWxzZTsgY29uc3QgaW1hZ2VzID0ge307IGNvbnN0XG4gICAgICAgICAgbWUgPSB0aGlzO1xuICAgICAgICByZXR1cm4gJHRvb2wuRGVmZXJyZWQud2hlbigodGhpcy5pbWFnZXMgJiYgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpIHx8IFtdKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICBoYXNJbWFnZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSW1hZ2UodGhpc1thXSwgcHJvcHMpXG4gICAgICAgICAgICAudGhlbigodXJsKSA9PiBpbWFnZXNbYV0gPSB1cmwpO1xuICAgICAgICB9LCB0aGlzLmltYWdlcykpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGh0bWwgPSBtZS50b1N0cmluZyhvcHQsIHByb3BzKTtcbiAgICAgICAgICAgIGlmIChoYXNJbWFnZSkgaHRtbCA9IGh0bWwucmVwbGFjZShSZWdfUHJvdG9fQmxvYiwgKGEsIGlkKSA9PiBpbWFnZXNbYV0pO1xuICAgICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSHRtbChodG1sLCBwcm9wcyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW1hZ2VzOiB7fSxcbiAgICAgIGFzSW1hZ2VVUkwoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxuICAgICAgICAgIHsgdHlwZTogYGltYWdlLyR7dHlwZW9mIChhcnJheUJ1ZmZlcikgPT09ICdzdHJpbmcnID8gJ3N2Zyt4bWwnIDogJyonfWAgfSkpO1xuICAgICAgICB0aGlzLmltYWdlc1t1cmxdID0gYXJyYXlCdWZmZXI7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9LFxuICAgICAgX3JlbGVhc2UoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKChiKSA9PiB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmltYWdlcztcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==