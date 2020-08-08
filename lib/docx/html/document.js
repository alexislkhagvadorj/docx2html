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

      style = this.doc.createStyle('p:empty:before');
      style.content = '""';
      style.display = 'inline-block';

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
              var divs = this.querySelectorAll('p>div, span>div');
              if (divs.length == 0) return this.outerHTML;

              /**
              * illegal <p> <div/> </p>
              * DOM operation directly in onload
              */
              var divcontainer = doc.createElement('div');var uid = 0;
              divcontainer.id = 'divcontainer';
              divcontainer.style.display = 'none';
              this.appendChild(divcontainer);
              for (var i = divs.length - 1; i > -1; i--) {
                var div = divs[i];
                var parent = div.parentNode;

                if (!div.id) div.id = '_z' + ++uid;

                if (!parent.id) parent.id = '_y' + uid;

                div.setAttribute('data-parent', parent.id);
                div.setAttribute('data-index', indexOf(div, parent.childNodes));

                divcontainer.appendChild(divs[i]);
              }

              var html = this.outerHTML + '\n\r<script>(' + this._transformer.toString() + ')();</script>';
              this._transformer();
              return html;
            },
            _transformer: function _transformer() {
              var a = document.querySelector('#divcontainer');
              for (var divs = a.childNodes, i = divs.length - 1; i > -1; i--) {
                var div = divs[i];
                var parentId = div.getAttribute('data-parent');
                var index = parseInt(div.getAttribute('data-index'));
                var parent = document.querySelector('#' + parentId);
                parent.insertBefore(div, parent.childNodes[index]);
              }
              a.parentNode.removeChild(a);
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

          return (0, _assign2.default)(selfConverter[$tool.isNode ? 'nodefy' : 'browserify'](doc, stylesheet, opt), {
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
      }($tool.isNode ? createDocument() : document);
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


(function (isNode, m) {
  if (!isNode) return;

  createDocument = require(m).jsdom;
  var window = createDocument().defaultView;

  global.btoa = window.btoa;
  CSSStyleDeclaration = window.CSSStyleDeclaration;
})($tool.isNode, 'jsdom');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsInRhYlNpemUiLCJjcmVhdGVTdHlsZSIsIm1hcmdpbiIsImJvcmRlciIsInBhZGRpbmciLCJib3hTaXppbmciLCJ3aGl0ZVNwYWNlIiwiYm9yZGVyQ29sbGFwc2UiLCJ3b3JkQnJlYWsiLCJjb2xvciIsInBvc2l0aW9uIiwiekluZGV4IiwiZGlzcGxheSIsImxpc3RTdHlsZSIsInRleHREZWNvcmF0aW9uIiwib3V0bGluZSIsImNvbnZlcnRTdHlsZSIsImJnU3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXRCYWNrZ3JvdW5kU3R5bGUiLCJjb25zb2xlIiwid2FybiIsIm9wdCIsInRvU3RyaW5nIiwicHJvcHMiLCJyZWxlYXNlIiwiYXNaaXAiLCJkb3dubG9hZCIsInNhdmUiLCJzZWxmQ29udmVydGVyIiwiZG9jdW1lbnQiLCJicm93c2VyRG9jIiwidWlkIiwicm9vdCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInNlY3Rpb24iLCJiaW5kIiwiY3JlYXRlVGV4dE5vZGUiLCJjcmVhdGVTdHlsZVNoZWV0Iiwic3R5bGVzaGVldCIsImVsU3R5bGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzaGVldCIsImdldFN0eWxlVGV4dCIsInN0eWxlcyIsImkiLCJydWxlcyIsImNzc1J1bGVzIiwibGVuIiwibGVuZ3RoIiwicHVzaCIsImNzc1RleHQiLCJqb2luIiwidGVtcGxhdGUiLCIkdG9vbCIsImlzRnVuY3Rpb24iLCJfaHRtbCIsImh0bWwiLCJuYW1lIiwiZXh0ZW5kU2NyaXB0IiwiZGl2cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvdXRlckhUTUwiLCJkaXZjb250YWluZXIiLCJkaXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwic2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsImNoaWxkTm9kZXMiLCJfdHJhbnNmb3JtZXIiLCJhIiwicXVlcnlTZWxlY3RvciIsInBhcmVudElkIiwiZ2V0QXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsImlzTm9kZSIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwidHJpbSIsInN0eWxlUGF0aCIsInBhdGhzIiwidW5zaGlmdCIsIl9yZWxlYXNlIiwiYXNJbWFnZVVSTCIsImJ1ZmZlciIsIkVycm9yIiwiUHJvdG9fQmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJwb3AiLCJSZWdfUHJvdG9fQmxvYiIsIlJlZ0V4cCIsInppcCIsIkpTWmlwIiwiaGFzSW1hZ2UiLCJmIiwiZm9sZGVyIiwiaW1hZ2VzIiwiZm9yRWFjaCIsImZpbGUiLCJyZXBsYWNlIiwiaHJlZiIsImdlbmVyYXRlIiwidHlwZSIsImNsaWNrIiwicmV2b2tlT2JqZWN0VVJMIiwibWUiLCJEZWZlcnJlZCIsIndoZW4iLCJzYXZlSW1hZ2UiLCJ0aGVuIiwidXJsIiwic2F2ZUh0bWwiLCJhcnJheUJ1ZmZlciIsImIiLCJDb252ZXJ0ZXIiLCJtIiwicmVxdWlyZSIsImpzZG9tIiwid2luZG93IiwiZGVmYXVsdFZpZXciLCJnbG9iYWwiLCJidG9hIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSx1QkFBSixDQUFvQixJQUNsQkMsNEJBRGtCOztJQUdDQyxROzs7Ozs7Ozs7OzhCQUdUO0FBQ1IsV0FBS0Ms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aW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5cbmxldCBjcmVhdGVEb2N1bWVudDsgbGV0XG4gIENTU1N0eWxlRGVjbGFyYXRpb247XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVyIHtcbiAgZ2V0IHRhZygpIHsgcmV0dXJuICdodG1sJzsgfVxuXG4gIGNvbnZlcnQoKSB7XG4gICAgdGhpcy5kb2MgPSB0aGlzLmNvbnN0cnVjdG9yLmNyZWF0ZSh0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuZG9jO1xuICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IHRoaXMuY29udGVudC5zdHlsZTtcbiAgICBjb250ZW50U3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICBjb250ZW50U3R5bGUubWluSGVpZ2h0ID0gJzEwMDBweCc7XG4gICAgY29udGVudFN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRlbnRTdHlsZS5wYWRkaW5nVG9wID0gJzIwcHgnO1xuICAgIGNvbnRlbnRTdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICBjb250ZW50U3R5bGUudGFiU2l6ZSA9ICczcmVtJ1xuXG4gICAgbGV0IHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKTtcbiAgICBzdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgc3R5bGUuYm9yZGVyID0gJzAnO1xuICAgIHN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKTtcbiAgICBzdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzdHlsZS5ib3JkZXJDb2xsYXBzZSA9ICdjb2xsYXBzZSc7XG4gICAgc3R5bGUud29yZEJyZWFrID0gJ2JyZWFrLXdvcmQnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpO1xuICAgIHN0eWxlLm1hcmdpbiA9ICdhdXRvJztcbiAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIHN0eWxlLmNvbG9yID0gJ2JsYWNrJztcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgc3R5bGUuekluZGV4ID0gMDtcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJyk7XG4gICAgc3R5bGUuY29udGVudCA9ICdcIlwiJztcbiAgICBzdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCcpO1xuICAgIHN0eWxlLmxpc3RTdHlsZSA9ICdub25lJztcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsPmxpPnAnKTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCAubWFya2VyJyk7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnYScpO1xuICAgIHN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnLnVuc3VwcG9ydGVkJyk7XG4gICAgc3R5bGUub3V0bGluZSA9ICcycHggcmVkIHNvbGlkJztcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJy53YXJuaW5nJyk7XG4gICAgc3R5bGUub3V0bGluZSA9ICcxcHggeWVsbG93IHNvbGlkJztcbiAgICB0aGlzLmNvbnZlcnRTdHlsZSgpO1xuICB9XG5cbiAgY29udmVydFN0eWxlKCkge1xuICAgIGNvbnN0IGJnU3R5bGUgPSB0aGlzLndvcmRNb2RlbC5nZXRCYWNrZ3JvdW5kU3R5bGUoKTtcbiAgICBpZiAoIWJnU3R5bGUpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NlY3Rpb24nKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBiZ1N0eWxlKSB7XG4gICAgICBjYXNlICdvYmplY3QnOi8vIGZpbGxcbiAgICAgICAgY29uc29sZS53YXJuKCdub3Qgc3VwcG9ydCBmaWxsIGNvbG9yIG9uIGRvY3VtZW50IGJhY2tncm91bmQgeWV0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmdTdHlsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogb3B0OiB7XG4gICogICB0ZW1wbGF0ZTogZnVuY3Rpb24oc3R5bGUsIGh0bWwsIHByb3BzKXsgcmV0dXJuIChodG1sKX0sXG4gICAgZXh0ZW5kU2NyaXB0OiBcImh0dHA6Ly9hLmNvbS9hLmpzXCJcbiAgICB9XG4gICovXG4gIHRvU3RyaW5nKG9wdCkge1xuICAgIHJldHVybiB0aGlzLmRvYy50b1N0cmluZyhvcHQsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLmRvYy5yZWxlYXNlKCk7XG4gIH1cblxuICBhc1ppcChvcHQpIHtcbiAgICByZXR1cm4gdGhpcy5kb2MuYXNaaXAob3B0LCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIGRvd25sb2FkKG9wdCkge1xuICAgIHJldHVybiB0aGlzLmRvYy5kb3dubG9hZChvcHQsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICogb3B0PWV4dGVuZCh0b1N0cmluZy5vcHQse1xuICAgIHNhdmVJbWFnZTogZnVuY3Rpb24oYXJyYXlCdWZmZXIsIGRvYy5wcm9wcyk6IHByb21pc2UodXJsKSB7fSxcbiAgICBzYXZlSHRtbDogZnVuY3Rpb24oKXt9XG4gIH0pXG4gICovXG4gIHNhdmUob3B0KSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLnNhdmUob3B0LCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUob3B0KSB7XG4gICAgY29uc3Qgc2VsZkNvbnZlcnRlciA9IHRoaXM7XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgIHZhciBkb2MgPSAoZnVuY3Rpb24gYnJvd3NlckRvYygpIHtcbiAgICAgICAgbGV0IHVpZCA9IDA7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCB7XG4gICAgICAgICAgaWQ6ICdBJyxcbiAgICAgICAgICBzZWN0aW9uOiBudWxsLFxuICAgICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChkb2N1bWVudCksXG4gICAgICAgICAgY3JlYXRlVGV4dE5vZGU6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlLmJpbmQoZG9jdW1lbnQpLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHlsZXNoZWV0KSByZXR1cm4gdGhpcy5zdHlsZXNoZWV0O1xuICAgICAgICAgICAgY29uc3QgZWxTdHlsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlc2hlZXQgPSBlbFN0eWxlLnNoZWV0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0U3R5bGVUZXh0KCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgcnVsZXMgPSB0aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbiA9IHJ1bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSBzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXMuam9pbignXFxyXFxuJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1aWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZCArICh1aWQrKyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0b1N0cmluZyhvcHQsIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAob3B0ICYmIHR5cGVvZiBvcHQudGVtcGxhdGUgIT09ICd1bmRlZmluZWQnICYmICR0b29sLmlzRnVuY3Rpb24ob3B0LnRlbXBsYXRlKSkgcmV0dXJuIG9wdC50ZW1wbGF0ZSh0aGlzLmdldFN0eWxlVGV4dCgpLCB0aGlzLl9odG1sKCksIHByb3BzKTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBbYDwhZG9jdHlwZSBodG1sPlxcclxcbjxodG1sPjxoZWFkPjxtZXRhIGNoYXJzZXQ9dXRmLTg+PG1ldGEga2V5PVwiZ2VuZXJhdG9yXCIgdmFsdWU9XCJkb2N4Mmh0bWxcIj48dGl0bGU+JHtwcm9wcy5uYW1lIHx8ICcnfTwvdGl0bGU+PHN0eWxlPmBdO1xuICAgICAgICAgICAgaHRtbC5wdXNoKHRoaXMuZ2V0U3R5bGVUZXh0KCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKCc8L3N0eWxlPjwvaGVhZD48Ym9keT4nKTtcbiAgICAgICAgICAgIGh0bWwucHVzaCh0aGlzLl9odG1sKCkpO1xuICAgICAgICAgICAgb3B0ICYmIG9wdC5leHRlbmRTY3JpcHQgJiYgaHRtbC5wdXNoKGA8c2NyaXB0IHNyYz1cIiR7b3B0LmV4dGVuZFNjcmlwdH1cIj48L3NjcmlwdD5gKTtcbiAgICAgICAgICAgIGh0bWwucHVzaCgnPC9ib2R5PjxodG1sPicpO1xuICAgICAgICAgICAgcmV0dXJuIGh0bWwuam9pbignXFxyXFxuJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfaHRtbCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3A+ZGl2LCBzcGFuPmRpdicpO1xuICAgICAgICAgICAgaWYgKGRpdnMubGVuZ3RoID09IDApIHJldHVybiB0aGlzLm91dGVySFRNTDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIGlsbGVnYWwgPHA+IDxkaXYvPiA8L3A+XG4gICAgICAgICAgICAqIERPTSBvcGVyYXRpb24gZGlyZWN0bHkgaW4gb25sb2FkXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgZGl2Y29udGFpbmVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBsZXRcbiAgICAgICAgICAgICAgdWlkID0gMDtcbiAgICAgICAgICAgIGRpdmNvbnRhaW5lci5pZCA9ICdkaXZjb250YWluZXInO1xuICAgICAgICAgICAgZGl2Y29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGRpdmNvbnRhaW5lcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gZGl2cy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkaXZzW2ldO1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBkaXYucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgICBpZiAoIWRpdi5pZCkgZGl2LmlkID0gYF96JHsrK3VpZH1gO1xuXG4gICAgICAgICAgICAgIGlmICghcGFyZW50LmlkKSBwYXJlbnQuaWQgPSBgX3kke3VpZH1gO1xuXG4gICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JywgcGFyZW50LmlkKTtcbiAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4T2YoZGl2LCBwYXJlbnQuY2hpbGROb2RlcykpO1xuXG4gICAgICAgICAgICAgIGRpdmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGAke3RoaXMub3V0ZXJIVE1MfVxcblxccjxzY3JpcHQ+KCR7dGhpcy5fdHJhbnNmb3JtZXIudG9TdHJpbmcoKX0pKCk7PC9zY3JpcHQ+YDtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zZm9ybWVyKCk7XG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF90cmFuc2Zvcm1lcigpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2Y29udGFpbmVyJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBkaXZzID0gYS5jaGlsZE5vZGVzLCBpID0gZGl2cy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkaXZzW2ldO1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJZCA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50Jyk7XG4gICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKTtcbiAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cGFyZW50SWR9YCk7XG4gICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZGl2LCBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSBlbHMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkgaWYgKGVsID09IGVsc1tpXSkgcmV0dXJuIGk7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICAob3B0ICYmIG9wdC5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICAgIHJvb3QuYm9keSA9IHJvb3Q7XG4gICAgICAgIHJldHVybiByb290O1xuICAgICAgfSgpKTtcblxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2MpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5jcmVhdGVTdHlsZVNoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlbFN0eWxlcyA9IHt9OyBjb25zdFxuICAgICAgICAgIHN0eWxlcyA9IHt9O1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbJHRvb2wuaXNOb2RlID8gJ25vZGVmeScgOiAnYnJvd3NlcmlmeSddKGRvYywgc3R5bGVzaGVldCwgb3B0KSwge1xuICAgICAgICAgIGNyZWF0ZVN0eWxlKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzW3NlbGVjdG9yXSkgcmV0dXJuIHN0eWxlc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICBjb25zdCBydWxlcyA9IHN0eWxlc2hlZXQuY3NzUnVsZXM7IGNvbnN0IGxlbiA9IHJ1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgJHtzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcCgoYSkgPT4gKGEudHJpbSgpWzBdID09ICcjJyA/IGEgOiBgIyR7dGhpcy5pZH0gJHthfWApKS5qb2luKCcsJyl9e31gLCBsZW4pO1xuICAgICAgICAgICAgcmV0dXJuIHN0eWxlc1tzZWxlY3Rvcl0gPSBzdHlsZXNoZWV0LmNzc1J1bGVzW2xlbl0uc3R5bGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZVBhdGgoYSwgcGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50KSByZXR1cm4gcmVsU3R5bGVzW2FdID0gcGFyZW50O1xuICAgICAgICAgICAgY29uc3QgcGF0aHMgPSBbYV07IHZhciBwYXJlbnQgPSBhO1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCA9IHJlbFN0eWxlc1twYXJlbnRdKSBwYXRocy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgICByZXR1cm4gcGF0aHMuam9pbignICcpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVsZWFzZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlY3Rpb247XG4gICAgICAgICAgICB0aGlzLl9yZWxlYXNlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KGRvYykpO1xuICAgIH0oJHRvb2wuaXNOb2RlID8gY3JlYXRlRG9jdW1lbnQoKSA6IGRvY3VtZW50KSk7XG4gIH1cblxuICBzdGF0aWMgbm9kZWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLCB7XG4gICAgICBfcmVsZWFzZSgpIHtcblxuICAgICAgfSxcbiAgICAgIGFzSW1hZ2VVUkwoYnVmZmVyKSB7XG4gICAgICAgIGlmIChvcHQgJiYgdHlwZW9mIChvcHQuYXNJbWFnZVVSTCkgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKTtcbiAgICAgICAgcmV0dXJuICdpbWFnZTovL25vdHN1cHBvcnQnO1xuICAgICAgfSxcbiAgICAgIGFzWmlwKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jyk7XG4gICAgICB9LFxuICAgICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKTtcbiAgICAgIH0sXG4gICAgICBzYXZlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGJyb3dzZXJpZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpIHtcbiAgICBjb25zdCBQcm90b19CbG9iID0gKGZ1bmN0aW9uIChhKSB7XG4gICAgICBhID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuICAgICAgYS5wb3AoKTtcbiAgICAgIHJldHVybiBhLmpvaW4oJy8nKTtcbiAgICB9KCkpO1xuICAgIGNvbnN0IFJlZ19Qcm90b19CbG9iID0gbmV3IFJlZ0V4cChgJHtQcm90b19CbG9ifS8oW1xcXFx3XFxcXGQtXSspYCwgJ2dpJyk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2MsIHtcbiAgICAgIGFzWmlwKG9wdCwgcHJvcHMpIHtcbiAgICAgICAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7IGxldCBoYXNJbWFnZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBmID0gemlwLmZvbGRlcignaW1hZ2VzJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgaGFzSW1hZ2UgPSB0cnVlO1xuICAgICAgICAgIGYuZmlsZShhLnNwbGl0KCcvJykucG9wKCksIHRoaXNbYV0pO1xuICAgICAgICB9LCB0aGlzLmltYWdlcyk7XG4gICAgICAgIHppcC5maWxlKCdwcm9wcy5qc29uJywgSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcbiAgICAgICAgemlwLmZpbGUoJ21haW4uaHRtbCcsIGhhc0ltYWdlID8gdGhpcy50b1N0cmluZyhvcHQpLnJlcGxhY2UoUHJvdG9fQmxvYiwgJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHppcDtcbiAgICAgIH0sXG4gICAgICBkb3dubG9hZChvcHQsIHByb3BzKSB7XG4gICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgIGEuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQsIHByb3BzKS5nZW5lcmF0ZSh7IHR5cGU6ICdibG9iJyB9KSk7XG4gICAgICAgIGEuZG93bmxvYWQgPSBgJHtwcm9wcy5uYW1lIHx8ICdkb2N1bWVudCd9LnppcGA7XG4gICAgICAgIGEuY2xpY2soKTtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgfSxcbiAgICAgIHNhdmUob3B0LCBwcm9wcykge1xuICAgICAgICBsZXQgaGFzSW1hZ2UgPSBmYWxzZTsgY29uc3QgaW1hZ2VzID0ge307IGNvbnN0XG4gICAgICAgICAgbWUgPSB0aGlzO1xuICAgICAgICByZXR1cm4gJHRvb2wuRGVmZXJyZWQud2hlbigodGhpcy5pbWFnZXMgJiYgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpIHx8IFtdKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICBoYXNJbWFnZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSW1hZ2UodGhpc1thXSwgcHJvcHMpXG4gICAgICAgICAgICAudGhlbigodXJsKSA9PiBpbWFnZXNbYV0gPSB1cmwpO1xuICAgICAgICB9LCB0aGlzLmltYWdlcykpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGh0bWwgPSBtZS50b1N0cmluZyhvcHQsIHByb3BzKTtcbiAgICAgICAgICAgIGlmIChoYXNJbWFnZSkgaHRtbCA9IGh0bWwucmVwbGFjZShSZWdfUHJvdG9fQmxvYiwgKGEsIGlkKSA9PiBpbWFnZXNbYV0pO1xuICAgICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSHRtbChodG1sLCBwcm9wcyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW1hZ2VzOiB7fSxcbiAgICAgIGFzSW1hZ2VVUkwoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxuICAgICAgICAgIHsgdHlwZTogYGltYWdlLyR7dHlwZW9mIChhcnJheUJ1ZmZlcikgPT09ICdzdHJpbmcnID8gJ3N2Zyt4bWwnIDogJyonfWAgfSkpO1xuICAgICAgICB0aGlzLmltYWdlc1t1cmxdID0gYXJyYXlCdWZmZXI7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9LFxuICAgICAgX3JlbGVhc2UoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKChiKSA9PiB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmltYWdlcztcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuKGZ1bmN0aW9uIChpc05vZGUsIG0pIHtcbiAgaWYgKCFpc05vZGUpIHJldHVybjtcblxuICBjcmVhdGVEb2N1bWVudCA9IHJlcXVpcmUobSkuanNkb207XG4gIGNvbnN0IHdpbmRvdyA9IGNyZWF0ZURvY3VtZW50KCkuZGVmYXVsdFZpZXc7XG5cbiAgZ2xvYmFsLmJ0b2EgPSB3aW5kb3cuYnRvYTtcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHdpbmRvdy5DU1NTdHlsZURlY2xhcmF0aW9uO1xufSgkdG9vbC5pc05vZGUsICdqc2RvbScpKTtcbiJdfQ==