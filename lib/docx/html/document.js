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

      var style = this.doc.createStyle('*');
      style.margin = '0';
      style.border = '0';
      style.padding = '0';
      style.boxSizing = 'border-box';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImNyZWF0ZVN0eWxlIiwibWFyZ2luIiwiYm9yZGVyIiwicGFkZGluZyIsImJveFNpemluZyIsImJvcmRlckNvbGxhcHNlIiwid29yZEJyZWFrIiwiY29sb3IiLCJwb3NpdGlvbiIsInpJbmRleCIsImRpc3BsYXkiLCJsaXN0U3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsIm91dGxpbmUiLCJjb252ZXJ0U3R5bGUiLCJiZ1N0eWxlIiwid29yZE1vZGVsIiwiZ2V0QmFja2dyb3VuZFN0eWxlIiwiY29uc29sZSIsIndhcm4iLCJvcHQiLCJ0b1N0cmluZyIsInByb3BzIiwicmVsZWFzZSIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwic2VsZkNvbnZlcnRlciIsImRvY3VtZW50IiwiYnJvd3NlckRvYyIsInVpZCIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiYmluZCIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJlbFN0eWxlIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJnZXRTdHlsZVRleHQiLCJzdHlsZXMiLCJpIiwicnVsZXMiLCJjc3NSdWxlcyIsImxlbiIsImxlbmd0aCIsInB1c2giLCJjc3NUZXh0Iiwiam9pbiIsInRlbXBsYXRlIiwiJHRvb2wiLCJpc0Z1bmN0aW9uIiwiX2h0bWwiLCJodG1sIiwibmFtZSIsImV4dGVuZFNjcmlwdCIsImRpdnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwib3V0ZXJIVE1MIiwiZGl2Y29udGFpbmVyIiwiZGl2IiwicGFyZW50IiwicGFyZW50Tm9kZSIsInNldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJjaGlsZE5vZGVzIiwiX3RyYW5zZm9ybWVyIiwiYSIsInF1ZXJ5U2VsZWN0b3IiLCJwYXJlbnRJZCIsImdldEF0dHJpYnV0ZSIsImluZGV4IiwicGFyc2VJbnQiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVDaGlsZCIsImVsIiwiZWxzIiwiY29udGFpbmVyIiwibWl4aW4iLCJyZWxTdHlsZXMiLCJpc05vZGUiLCJzZWxlY3RvciIsImluc2VydFJ1bGUiLCJzcGxpdCIsIm1hcCIsInRyaW0iLCJzdHlsZVBhdGgiLCJwYXRocyIsInVuc2hpZnQiLCJfcmVsZWFzZSIsImFzSW1hZ2VVUkwiLCJidWZmZXIiLCJFcnJvciIsIlByb3RvX0Jsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwicG9wIiwiUmVnX1Byb3RvX0Jsb2IiLCJSZWdFeHAiLCJ6aXAiLCJKU1ppcCIsImhhc0ltYWdlIiwiZiIsImZvbGRlciIsImltYWdlcyIsImZvckVhY2giLCJmaWxlIiwicmVwbGFjZSIsImhyZWYiLCJnZW5lcmF0ZSIsInR5cGUiLCJjbGljayIsInJldm9rZU9iamVjdFVSTCIsIm1lIiwiRGVmZXJyZWQiLCJ3aGVuIiwic2F2ZUltYWdlIiwidGhlbiIsInVybCIsInNhdmVIdG1sIiwiYXJyYXlCdWZmZXIiLCJiIiwiQ29udmVydGVyIiwibSIsInJlcXVpcmUiLCJqc2RvbSIsIndpbmRvdyIsImRlZmF1bHRWaWV3IiwiZ2xvYmFsIiwiYnRvYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsdUJBQUosQ0FBb0IsSUFDbEJDLDRCQURrQjs7SUFHQ0MsUTs7Ozs7Ozs7Ozs4QkFHVDtBQUNSLFdBQUtDLEdBQUwsR0FBVyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixLQUFLQyxPQUE3QixDQUFYO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLEtBQUtKLEdBQXBCO0FBQ0EsVUFBTUssZUFBZSxLQUFLRCxPQUFMLENBQWFFLEtBQWxDO0FBQ0FELG1CQUFhRSxlQUFiLEdBQStCLGFBQS9CO0FBQ0FGLG1CQUFhRyxTQUFiLEdBQXlCLFFBQXpCO0FBQ0FILG1CQUFhSSxLQUFiLEdBQXFCLE1BQXJCO0FBQ0FKLG1CQUFhSyxVQUFiLEdBQTBCLE1BQTFCO0FBQ0FMLG1CQUFhTSxRQUFiLEdBQXdCLE1BQXhCOztBQUVBLFVBQUlMLFFBQVEsS0FBS04sR0FBTCxDQUFTWSxXQUFULENBQXFCLEdBQXJCLENBQVo7QUFDQU4sWUFBTU8sTUFBTixHQUFlLEdBQWY7QUFDQVAsWUFBTVEsTUFBTixHQUFlLEdBQWY7QUFDQVIsWUFBTVMsT0FBTixHQUFnQixHQUFoQjtBQUNBVCxZQUFNVSxTQUFOLEdBQWtCLFlBQWxCOztBQUVBVixjQUFRLEtBQUtOLEdBQUwsQ0FBU1ksV0FBVCxDQUFxQixPQUFyQixDQUFSO0FBQ0FOLFlBQU1HLEtBQU4sR0FBYyxNQUFkO0FBQ0FILFlBQU1XLGNBQU4sR0FBdUIsVUFBdkI7QUFDQVgsWUFBTVksU0FBTixHQUFrQixZQUFsQjs7QUFFQVosY0FBUSxLQUFLTixHQUFMLENBQVNZLFdBQVQsQ0FBcUIsU0FBckIsQ0FBUjtBQUNBTixZQUFNTyxNQUFOLEdBQWUsTUFBZjtBQUNBUCxZQUFNQyxlQUFOLEdBQXdCLE9BQXhCO0FBQ0FELFlBQU1hLEtBQU4sR0FBYyxPQUFkO0FBQ0FiLFlBQU1jLFFBQU4sR0FBaUIsVUFBakI7QUFDQWQsWUFBTWUsTUFBTixHQUFlLENBQWY7O0FBRUFmLGNBQVEsS0FBS04sR0FBTCxDQUFTWSxXQUFULENBQXFCLGdCQUFyQixDQUFSO0FBQ0FOLFlBQU1GLE9BQU4sR0FBZ0IsSUFBaEI7QUFDQUUsWUFBTWdCLE9BQU4sR0FBZ0IsY0FBaEI7O0FBRUFoQixjQUFRLEtBQUtOLEdBQUwsQ0FBU1ksV0FBVCxDQUFxQixJQUFyQixDQUFSO0FBQ0FOLFlBQU1pQixTQUFOLEdBQWtCLE1BQWxCOztBQUVBakIsY0FBUSxLQUFLTixHQUFMLENBQVNZLFdBQVQsQ0FBcUIsU0FBckIsQ0FBUjtBQUNBTixZQUFNYyxRQUFOLEdBQWlCLFVBQWpCOztBQUVBZCxjQUFRLEtBQUtOLEdBQUwsQ0FBU1ksV0FBVCxDQUFxQixZQUFyQixDQUFSO0FBQ0FOLFlBQU1jLFFBQU4sR0FBaUIsVUFBakI7O0FBRUFkLGNBQVEsS0FBS04sR0FBTCxDQUFTWSxXQUFULENBQXFCLEdBQXJCLENBQVI7QUFDQU4sWUFBTWtCLGNBQU4sR0FBdUIsTUFBdkI7O0FBRUFsQixjQUFRLEtBQUtOLEdBQUwsQ0FBU1ksV0FBVCxDQUFxQixjQUFyQixDQUFSO0FBQ0FOLFlBQU1tQixPQUFOLEdBQWdCLGVBQWhCOztBQUVBbkIsY0FBUSxLQUFLTixHQUFMLENBQVNZLFdBQVQsQ0FBcUIsVUFBckIsQ0FBUjtBQUNBTixZQUFNbUIsT0FBTixHQUFnQixrQkFBaEI7QUFDQSxXQUFLQyxZQUFMO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1DLFVBQVUsS0FBS0MsU0FBTCxDQUFlQyxrQkFBZixFQUFoQjtBQUNBLFVBQUksQ0FBQ0YsT0FBTCxFQUFjOztBQUVkLFVBQU1yQixRQUFRLEtBQUtOLEdBQUwsQ0FBU1ksV0FBVCxDQUFxQixTQUFyQixDQUFkO0FBQ0EscUJBQWVlLE9BQWYsdURBQWVBLE9BQWY7QUFDRSxhQUFLLFFBQUw7QUFBYztBQUNaRyxrQkFBUUMsSUFBUixDQUFhLG1EQUFiO0FBQ0E7QUFDRjtBQUNFekIsZ0JBQU1DLGVBQU4sR0FBd0JvQixPQUF4QjtBQUNBO0FBTko7QUFRRDs7QUFFRDs7Ozs7Ozs7OzZCQU1TSyxHLEVBQUs7QUFDWixhQUFPLEtBQUtoQyxHQUFMLENBQVNpQyxRQUFULENBQWtCRCxHQUFsQixFQUF1QixLQUFLRSxLQUE1QixDQUFQO0FBQ0Q7Ozs4QkFFUztBQUNSLFdBQUtsQyxHQUFMLENBQVNtQyxPQUFUO0FBQ0Q7OzswQkFFS0gsRyxFQUFLO0FBQ1QsYUFBTyxLQUFLaEMsR0FBTCxDQUFTb0MsS0FBVCxDQUFlSixHQUFmLEVBQW9CLEtBQUtFLEtBQXpCLENBQVA7QUFDRDs7OzZCQUVRRixHLEVBQUs7QUFDWixhQUFPLEtBQUtoQyxHQUFMLENBQVNxQyxRQUFULENBQWtCTCxHQUFsQixFQUF1QixLQUFLRSxLQUE1QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozt5QkFNS0YsRyxFQUFLO0FBQ1IsYUFBTyxLQUFLaEMsR0FBTCxDQUFTc0MsSUFBVCxDQUFjTixHQUFkLEVBQW1CLEtBQUtFLEtBQXhCLENBQVA7QUFDRDs7O3dCQW5HUztBQUFFLGFBQU8sTUFBUDtBQUFnQjs7OzJCQXFHZEYsRyxFQUFLO0FBQ2pCLFVBQU1PLGdCQUFnQixJQUF0QjtBQUNBLGFBQVEsVUFBVUMsUUFBVixFQUFvQjtBQUMxQixZQUFJeEMsTUFBTyxTQUFTeUMsVUFBVCxHQUFzQjtBQUMvQixjQUFJQyxPQUFNLENBQVY7QUFDQSxjQUFNQyxPQUFPLHNCQUFjSCxTQUFTSSxhQUFULENBQXVCLEtBQXZCLENBQWQsRUFBNkM7QUFDeERDLGdCQUFJLEdBRG9EO0FBRXhEQyxxQkFBUyxJQUYrQztBQUd4REYsMkJBQWVKLFNBQVNJLGFBQVQsQ0FBdUJHLElBQXZCLENBQTRCUCxRQUE1QixDQUh5QztBQUl4RFEsNEJBQWdCUixTQUFTUSxjQUFULENBQXdCRCxJQUF4QixDQUE2QlAsUUFBN0IsQ0FKd0M7QUFLeERTLDRCQUx3RCw4QkFLckM7QUFDakIsa0JBQUksS0FBS0MsVUFBVCxFQUFxQixPQUFPLEtBQUtBLFVBQVo7QUFDckIsa0JBQU1DLFVBQVUsS0FBS1AsYUFBTCxDQUFtQixPQUFuQixDQUFoQjtBQUNBLG1CQUFLUSxJQUFMLENBQVVDLFdBQVYsQ0FBc0JGLE9BQXRCLEVBQStCLElBQS9CO0FBQ0EscUJBQU8sS0FBS0QsVUFBTCxHQUFrQkMsUUFBUUcsS0FBakM7QUFDRCxhQVZ1RDtBQVd4REMsd0JBWHdELDBCQVd6QztBQUNiLGtCQUFNQyxTQUFTLEVBQWY7QUFDQSxtQkFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsUUFBUSxLQUFLUixVQUFMLENBQWdCUyxRQUFuQyxFQUE2Q0MsTUFBTUYsTUFBTUcsTUFBOUQsRUFBc0VKLElBQUlHLEdBQTFFLEVBQStFSCxHQUEvRTtBQUFvRkQsdUJBQU9NLElBQVAsQ0FBWUosTUFBTUQsQ0FBTixFQUFTTSxPQUFyQjtBQUFwRixlQUNBLE9BQU9QLE9BQU9RLElBQVAsQ0FBWSxNQUFaLENBQVA7QUFDRCxhQWZ1RDtBQWdCeER0QixlQWhCd0QsaUJBZ0JsRDtBQUNKLHFCQUFPLEtBQUtHLEVBQUwsR0FBV0gsTUFBbEI7QUFDRCxhQWxCdUQ7QUFtQnhEVCxvQkFuQndELG9CQW1CL0NELEdBbkIrQyxFQW1CMUNFLEtBbkIwQyxFQW1CbkM7QUFDbkIsa0JBQUlGLE9BQU8sT0FBT0EsSUFBSWlDLFFBQVgsS0FBd0IsV0FBL0IsSUFBOENDLE1BQU1DLFVBQU4sQ0FBaUJuQyxJQUFJaUMsUUFBckIsQ0FBbEQsRUFBa0YsT0FBT2pDLElBQUlpQyxRQUFKLENBQWEsS0FBS1YsWUFBTCxFQUFiLEVBQWtDLEtBQUthLEtBQUwsRUFBbEMsRUFBZ0RsQyxLQUFoRCxDQUFQO0FBQ2xGLGtCQUFNbUMsT0FBTyx5R0FBc0duQyxNQUFNb0MsSUFBTixJQUFjLEVBQXBILHNCQUFiO0FBQ0FELG1CQUFLUCxJQUFMLENBQVUsS0FBS1AsWUFBTCxFQUFWO0FBQ0FjLG1CQUFLUCxJQUFMLENBQVUsdUJBQVY7QUFDQU8sbUJBQUtQLElBQUwsQ0FBVSxLQUFLTSxLQUFMLEVBQVY7QUFDQXBDLHFCQUFPQSxJQUFJdUMsWUFBWCxJQUEyQkYsS0FBS1AsSUFBTCxtQkFBMEI5QixJQUFJdUMsWUFBOUIsaUJBQTNCO0FBQ0FGLG1CQUFLUCxJQUFMLENBQVUsZUFBVjtBQUNBLHFCQUFPTyxLQUFLTCxJQUFMLENBQVUsTUFBVixDQUFQO0FBQ0QsYUE1QnVEO0FBNkJ4REksaUJBN0J3RCxtQkE2QmhEO0FBQ04sa0JBQU1JLE9BQU8sS0FBS0MsZ0JBQUwsQ0FBc0IsaUJBQXRCLENBQWI7QUFDQSxrQkFBSUQsS0FBS1gsTUFBTCxJQUFlLENBQW5CLEVBQXNCLE9BQU8sS0FBS2EsU0FBWjs7QUFFdEI7Ozs7QUFJQSxrQkFBTUMsZUFBZTNFLElBQUk0QyxhQUFKLENBQWtCLEtBQWxCLENBQXJCLENBQStDLElBQzdDRixNQUFNLENBRHVDO0FBRS9DaUMsMkJBQWE5QixFQUFiLEdBQWtCLGNBQWxCO0FBQ0E4QiwyQkFBYXJFLEtBQWIsQ0FBbUJnQixPQUFuQixHQUE2QixNQUE3QjtBQUNBLG1CQUFLK0IsV0FBTCxDQUFpQnNCLFlBQWpCO0FBQ0EsbUJBQUssSUFBSWxCLElBQUllLEtBQUtYLE1BQUwsR0FBYyxDQUEzQixFQUE4QkosSUFBSSxDQUFDLENBQW5DLEVBQXNDQSxHQUF0QyxFQUEyQztBQUN6QyxvQkFBTW1CLE1BQU1KLEtBQUtmLENBQUwsQ0FBWjtBQUNBLG9CQUFNb0IsU0FBU0QsSUFBSUUsVUFBbkI7O0FBRUEsb0JBQUksQ0FBQ0YsSUFBSS9CLEVBQVQsRUFBYStCLElBQUkvQixFQUFKLFVBQWMsRUFBRUgsR0FBaEI7O0FBRWIsb0JBQUksQ0FBQ21DLE9BQU9oQyxFQUFaLEVBQWdCZ0MsT0FBT2hDLEVBQVAsVUFBaUJILEdBQWpCOztBQUVoQmtDLG9CQUFJRyxZQUFKLENBQWlCLGFBQWpCLEVBQWdDRixPQUFPaEMsRUFBdkM7QUFDQStCLG9CQUFJRyxZQUFKLENBQWlCLFlBQWpCLEVBQStCQyxRQUFRSixHQUFSLEVBQWFDLE9BQU9JLFVBQXBCLENBQS9COztBQUVBTiw2QkFBYXRCLFdBQWIsQ0FBeUJtQixLQUFLZixDQUFMLENBQXpCO0FBQ0Q7O0FBRUQsa0JBQU1ZLE9BQVUsS0FBS0ssU0FBZixxQkFBd0MsS0FBS1EsWUFBTCxDQUFrQmpELFFBQWxCLEVBQXhDLGtCQUFOO0FBQ0EsbUJBQUtpRCxZQUFMO0FBQ0EscUJBQU9iLElBQVA7QUFDRCxhQTNEdUQ7QUE0RHhEYSx3QkE1RHdELDBCQTREekM7QUFDYixrQkFBTUMsSUFBSTNDLFNBQVM0QyxhQUFULENBQXVCLGVBQXZCLENBQVY7QUFDQSxtQkFBSyxJQUFJWixPQUFPVyxFQUFFRixVQUFiLEVBQXlCeEIsSUFBSWUsS0FBS1gsTUFBTCxHQUFjLENBQWhELEVBQW1ESixJQUFJLENBQUMsQ0FBeEQsRUFBMkRBLEdBQTNELEVBQWdFO0FBQzlELG9CQUFNbUIsTUFBTUosS0FBS2YsQ0FBTCxDQUFaO0FBQ0Esb0JBQU00QixXQUFXVCxJQUFJVSxZQUFKLENBQWlCLGFBQWpCLENBQWpCO0FBQ0Esb0JBQU1DLFFBQVFDLFNBQVNaLElBQUlVLFlBQUosQ0FBaUIsWUFBakIsQ0FBVCxDQUFkO0FBQ0Esb0JBQU1ULFNBQVNyQyxTQUFTNEMsYUFBVCxPQUEyQkMsUUFBM0IsQ0FBZjtBQUNBUix1QkFBT1ksWUFBUCxDQUFvQmIsR0FBcEIsRUFBeUJDLE9BQU9JLFVBQVAsQ0FBa0JNLEtBQWxCLENBQXpCO0FBQ0Q7QUFDREosZ0JBQUVMLFVBQUYsQ0FBYVksV0FBYixDQUF5QlAsQ0FBekI7QUFDRDtBQXRFdUQsV0FBN0MsQ0FBYjs7QUF5RUEsbUJBQVNILE9BQVQsQ0FBaUJXLEVBQWpCLEVBQXFCQyxHQUFyQixFQUEwQjtBQUN4QixpQkFBSyxJQUFJbkMsSUFBSW1DLElBQUkvQixNQUFKLEdBQWEsQ0FBMUIsRUFBNkJKLElBQUksQ0FBakMsRUFBb0NBLEdBQXBDO0FBQXlDLGtCQUFJa0MsTUFBTUMsSUFBSW5DLENBQUosQ0FBVixFQUFrQixPQUFPQSxDQUFQO0FBQTNELGFBQ0EsT0FBTyxDQUFQO0FBQ0Q7O0FBRUQsV0FBQ3pCLE9BQU9BLElBQUk2RCxTQUFYLElBQXdCckQsU0FBU1ksSUFBbEMsRUFBd0NDLFdBQXhDLENBQW9EVixJQUFwRDtBQUNBQSxlQUFLUyxJQUFMLEdBQVlULElBQVo7QUFDQSxpQkFBT0EsSUFBUDtBQUNELFNBbkZVLEVBQVg7O0FBcUZBLGVBQVEsU0FBU21ELEtBQVQsQ0FBZTlGLEdBQWYsRUFBb0I7QUFDMUIsY0FBTWtELGFBQWFsRCxJQUFJaUQsZ0JBQUosRUFBbkI7QUFDQSxjQUFNOEMsWUFBWSxFQUFsQixDQUFzQixJQUNwQnZDLFNBQVMsRUFEVzs7QUFHdEIsaUJBQU8sc0JBQWNqQixjQUFjMkIsTUFBTThCLE1BQU4sR0FBZSxRQUFmLEdBQTBCLFlBQXhDLEVBQXNEaEcsR0FBdEQsRUFBMkRrRCxVQUEzRCxFQUF1RWxCLEdBQXZFLENBQWQsRUFBMkY7QUFDaEdwQix1QkFEZ0csdUJBQ3BGcUYsUUFEb0YsRUFDMUU7QUFBQTs7QUFDcEIsa0JBQUl6QyxPQUFPeUMsUUFBUCxDQUFKLEVBQXNCLE9BQU96QyxPQUFPeUMsUUFBUCxDQUFQO0FBQ3RCLGtCQUFNdkMsUUFBUVIsV0FBV1MsUUFBekIsQ0FBbUMsSUFBTUMsTUFBTUYsTUFBTUcsTUFBbEI7QUFDbkNYLHlCQUFXZ0QsVUFBWCxDQUF5QkQsU0FBU0UsS0FBVCxDQUFlLEdBQWYsRUFBb0JDLEdBQXBCLENBQXdCLFVBQUNqQixDQUFEO0FBQUEsdUJBQVFBLEVBQUVrQixJQUFGLEdBQVMsQ0FBVCxLQUFlLEdBQWYsR0FBcUJsQixDQUFyQixTQUE2QixPQUFLdEMsRUFBbEMsU0FBd0NzQyxDQUFoRDtBQUFBLGVBQXhCLEVBQThFbkIsSUFBOUUsQ0FBbUYsR0FBbkYsQ0FBekIsU0FBc0hKLEdBQXRIO0FBQ0EscUJBQU9KLE9BQU95QyxRQUFQLElBQW1CL0MsV0FBV1MsUUFBWCxDQUFvQkMsR0FBcEIsRUFBeUJ0RCxLQUFuRDtBQUNELGFBTitGO0FBT2hHZ0cscUJBUGdHLHFCQU90Rm5CLENBUHNGLEVBT25GTixNQVBtRixFQU8zRTtBQUNuQixrQkFBSUEsTUFBSixFQUFZLE9BQU9rQixVQUFVWixDQUFWLElBQWVOLE1BQXRCO0FBQ1osa0JBQU0wQixRQUFRLENBQUNwQixDQUFELENBQWQsQ0FBbUIsSUFBSU4sU0FBU00sQ0FBYjtBQUNuQixxQkFBT04sU0FBU2tCLFVBQVVsQixNQUFWLENBQWhCO0FBQW1DMEIsc0JBQU1DLE9BQU4sQ0FBYzNCLE1BQWQ7QUFBbkMsZUFDQSxPQUFPMEIsTUFBTXZDLElBQU4sQ0FBVyxHQUFYLENBQVA7QUFDRCxhQVorRjtBQWFoRzdCLG1CQWJnRyxxQkFhdEY7QUFDUixxQkFBTyxLQUFLVyxPQUFaO0FBQ0EsbUJBQUsyRCxRQUFMO0FBQ0Q7QUFoQitGLFdBQTNGLENBQVA7QUFrQkQsU0F2Qk8sQ0F1Qk56RyxHQXZCTSxDQUFSO0FBd0JELE9BOUdPLENBOEdOa0UsTUFBTThCLE1BQU4sR0FBZW5HLGdCQUFmLEdBQWtDMkMsUUE5RzVCLENBQVI7QUErR0Q7OzsyQkFFYXhDLEcsRUFBS2tELFUsRUFBWWxCLEcsRUFBSztBQUNsQyxhQUFPLHNCQUFjaEMsR0FBZCxFQUFtQjtBQUN4QnlHLGdCQUR3QixzQkFDYixDQUVWLENBSHVCO0FBSXhCQyxrQkFKd0Isc0JBSWJDLE1BSmEsRUFJTDtBQUNqQixjQUFJM0UsT0FBTyxPQUFRQSxJQUFJMEUsVUFBWixLQUE0QixXQUF2QyxFQUFvRCxPQUFPMUUsSUFBSTBFLFVBQUosQ0FBZUMsTUFBZixDQUFQO0FBQ3BELGlCQUFPLG9CQUFQO0FBQ0QsU0FQdUI7QUFReEJ2RSxhQVJ3QixtQkFRaEI7QUFDTixnQkFBTSxJQUFJd0UsS0FBSixDQUFVLGFBQVYsQ0FBTjtBQUNELFNBVnVCO0FBV3hCdkUsZ0JBWHdCLHNCQVdiO0FBQ1QsZ0JBQU0sSUFBSXVFLEtBQUosQ0FBVSxhQUFWLENBQU47QUFDRCxTQWJ1QjtBQWN4QnRFLFlBZHdCLGtCQWNqQjtBQUNMLGdCQUFNLElBQUlzRSxLQUFKLENBQVUsYUFBVixDQUFOO0FBQ0Q7QUFoQnVCLE9BQW5CLENBQVA7QUFrQkQ7OzsrQkFFaUI1RyxHLEVBQUtrRCxVLEVBQVlsQixHLEVBQUs7QUFDdEMsVUFBTTZFLGFBQWMsVUFBVTFCLENBQVYsRUFBYTtBQUMvQkEsWUFBSTJCLElBQUlDLGVBQUosQ0FBb0IsSUFBSUMsSUFBSixFQUFwQixFQUFnQ2IsS0FBaEMsQ0FBc0MsR0FBdEMsQ0FBSjtBQUNBaEIsVUFBRThCLEdBQUY7QUFDQSxlQUFPOUIsRUFBRW5CLElBQUYsQ0FBTyxHQUFQLENBQVA7QUFDRCxPQUptQixFQUFwQjtBQUtBLFVBQU1rRCxpQkFBaUIsSUFBSUMsTUFBSixDQUFjTixVQUFkLG9CQUF5QyxJQUF6QyxDQUF2Qjs7QUFFQSxhQUFPLHNCQUFjN0csR0FBZCxFQUFtQjtBQUN4Qm9DLGFBRHdCLGlCQUNsQkosR0FEa0IsRUFDYkUsS0FEYSxFQUNOO0FBQ2hCLGNBQU1rRixNQUFNLElBQUlDLGVBQUosRUFBWixDQUF5QixJQUFJQyxXQUFXLEtBQWY7QUFDekIsY0FBTUMsSUFBSUgsSUFBSUksTUFBSixDQUFXLFFBQVgsQ0FBVjtBQUNBLDhCQUFZLEtBQUtDLE1BQWpCLEVBQXlCQyxPQUF6QixDQUFpQyxVQUFVdkMsQ0FBVixFQUFhO0FBQzVDbUMsdUJBQVcsSUFBWDtBQUNBQyxjQUFFSSxJQUFGLENBQU94QyxFQUFFZ0IsS0FBRixDQUFRLEdBQVIsRUFBYWMsR0FBYixFQUFQLEVBQTJCLEtBQUs5QixDQUFMLENBQTNCO0FBQ0QsV0FIRCxFQUdHLEtBQUtzQyxNQUhSO0FBSUFMLGNBQUlPLElBQUosQ0FBUyxZQUFULEVBQXVCLHlCQUFlekYsS0FBZixDQUF2QjtBQUNBa0YsY0FBSU8sSUFBSixDQUFTLFdBQVQsRUFBc0JMLFdBQVcsS0FBS3JGLFFBQUwsQ0FBY0QsR0FBZCxFQUFtQjRGLE9BQW5CLENBQTJCZixVQUEzQixFQUF1QyxRQUF2QyxDQUFYLEdBQThELEtBQUs1RSxRQUFMLEVBQXBGO0FBQ0EsaUJBQU9tRixHQUFQO0FBQ0QsU0FYdUI7QUFZeEIvRSxnQkFad0Isb0JBWWZMLEdBWmUsRUFZVkUsS0FaVSxFQVlIO0FBQ25CLGNBQU1pRCxJQUFJM0MsU0FBU0ksYUFBVCxDQUF1QixHQUF2QixDQUFWO0FBQ0FKLG1CQUFTWSxJQUFULENBQWNDLFdBQWQsQ0FBMEI4QixDQUExQjtBQUNBQSxZQUFFMEMsSUFBRixHQUFTZixJQUFJQyxlQUFKLENBQW9CLEtBQUszRSxLQUFMLENBQVdKLEdBQVgsRUFBZ0JFLEtBQWhCLEVBQXVCNEYsUUFBdkIsQ0FBZ0MsRUFBRUMsTUFBTSxNQUFSLEVBQWhDLENBQXBCLENBQVQ7QUFDQTVDLFlBQUU5QyxRQUFGLElBQWdCSCxNQUFNb0MsSUFBTixJQUFjLFVBQTlCO0FBQ0FhLFlBQUU2QyxLQUFGO0FBQ0FsQixjQUFJbUIsZUFBSixDQUFvQjlDLEVBQUUwQyxJQUF0QjtBQUNBckYsbUJBQVNZLElBQVQsQ0FBY3NDLFdBQWQsQ0FBMEJQLENBQTFCO0FBQ0QsU0FwQnVCO0FBcUJ4QjdDLFlBckJ3QixnQkFxQm5CTixHQXJCbUIsRUFxQmRFLEtBckJjLEVBcUJQO0FBQ2YsY0FBSW9GLFdBQVcsS0FBZixDQUFzQixJQUFNRyxTQUFTLEVBQWYsQ0FBbUIsSUFDdkNTLEtBQUssSUFEa0M7QUFFekMsaUJBQU9oRSxNQUFNaUUsUUFBTixDQUFlQyxJQUFmLENBQW9CLENBQUMsS0FBS1gsTUFBTCxJQUFlLG9CQUFZLEtBQUtBLE1BQWpCLENBQWYsSUFBMkMsRUFBNUMsRUFBZ0RyQixHQUFoRCxDQUFvRCxVQUFVakIsQ0FBVixFQUFhO0FBQzFGbUMsdUJBQVcsSUFBWDtBQUNBLG1CQUFPdEYsSUFBSXFHLFNBQUosQ0FBYyxLQUFLbEQsQ0FBTCxDQUFkLEVBQXVCakQsS0FBdkIsRUFDSm9HLElBREksQ0FDQyxVQUFDQyxHQUFEO0FBQUEscUJBQVNkLE9BQU90QyxDQUFQLElBQVlvRCxHQUFyQjtBQUFBLGFBREQsQ0FBUDtBQUVELFdBSjBCLEVBSXhCLEtBQUtkLE1BSm1CLENBQXBCLEVBS0phLElBTEksQ0FLQyxZQUFNO0FBQ1YsZ0JBQUlqRSxPQUFPNkQsR0FBR2pHLFFBQUgsQ0FBWUQsR0FBWixFQUFpQkUsS0FBakIsQ0FBWDtBQUNBLGdCQUFJb0YsUUFBSixFQUFjakQsT0FBT0EsS0FBS3VELE9BQUwsQ0FBYVYsY0FBYixFQUE2QixVQUFDL0IsQ0FBRCxFQUFJdEMsRUFBSjtBQUFBLHFCQUFXNEUsT0FBT3RDLENBQVAsQ0FBWDtBQUFBLGFBQTdCLENBQVA7QUFDZCxtQkFBT25ELElBQUl3RyxRQUFKLENBQWFuRSxJQUFiLEVBQW1CbkMsS0FBbkIsQ0FBUDtBQUNELFdBVEksQ0FBUDtBQVVELFNBbEN1Qjs7QUFtQ3hCdUYsZ0JBQVEsRUFuQ2dCO0FBb0N4QmYsa0JBcEN3QixzQkFvQ2IrQixXQXBDYSxFQW9DQTtBQUN0QixjQUFNRixNQUFNekIsSUFBSUMsZUFBSixDQUFvQixJQUFJQyxJQUFKLENBQVMsQ0FBQ3lCLFdBQUQsQ0FBVCxFQUM5QixFQUFFVixrQkFBZSxPQUFRVSxXQUFSLEtBQXlCLFFBQXpCLEdBQW9DLFNBQXBDLEdBQWdELEdBQS9ELENBQUYsRUFEOEIsQ0FBcEIsQ0FBWjtBQUVBLGVBQUtoQixNQUFMLENBQVljLEdBQVosSUFBbUJFLFdBQW5CO0FBQ0EsaUJBQU9GLEdBQVA7QUFDRCxTQXpDdUI7QUEwQ3hCOUIsZ0JBMUN3QixzQkEwQ2I7QUFDVCw4QkFBWSxLQUFLZ0IsTUFBakIsRUFBeUJDLE9BQXpCLENBQWlDLFVBQUNnQixDQUFELEVBQU87QUFDdEM1QixnQkFBSW1CLGVBQUosQ0FBb0JTLENBQXBCO0FBQ0QsV0FGRDtBQUdBLGlCQUFPLEtBQUtqQixNQUFaO0FBQ0Q7QUEvQ3VCLE9BQW5CLENBQVA7QUFpREQ7OztFQXZTbUNrQixtQjs7a0JBQWpCNUksUTs7O0FBMFNwQixXQUFVaUcsTUFBVixFQUFrQjRDLENBQWxCLEVBQXFCO0FBQ3BCLE1BQUksQ0FBQzVDLE1BQUwsRUFBYTs7QUFFYm5HLG1CQUFpQmdKLFFBQVFELENBQVIsRUFBV0UsS0FBNUI7QUFDQSxNQUFNQyxTQUFTbEosaUJBQWlCbUosV0FBaEM7O0FBRUFDLFNBQU9DLElBQVAsR0FBY0gsT0FBT0csSUFBckI7QUFDQXBKLHdCQUFzQmlKLE9BQU9qSixtQkFBN0I7QUFDRCxDQVJBLEVBUUNvRSxNQUFNOEIsTUFSUCxFQVFlLE9BUmYsQ0FBRCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCc7XG5pbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcblxubGV0IGNyZWF0ZURvY3VtZW50OyBsZXRcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBDb252ZXJ0ZXIge1xuICBnZXQgdGFnKCkgeyByZXR1cm4gJ2h0bWwnOyB9XG5cbiAgY29udmVydCgpIHtcbiAgICB0aGlzLmRvYyA9IHRoaXMuY29uc3RydWN0b3IuY3JlYXRlKHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5kb2M7XG4gICAgY29uc3QgY29udGVudFN0eWxlID0gdGhpcy5jb250ZW50LnN0eWxlO1xuICAgIGNvbnRlbnRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIGNvbnRlbnRTdHlsZS5taW5IZWlnaHQgPSAnMTAwMHB4JztcbiAgICBjb250ZW50U3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGVudFN0eWxlLnBhZGRpbmdUb3AgPSAnMjBweCc7XG4gICAgY29udGVudFN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuXG4gICAgbGV0IHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKTtcbiAgICBzdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgc3R5bGUuYm9yZGVyID0gJzAnO1xuICAgIHN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKTtcbiAgICBzdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzdHlsZS5ib3JkZXJDb2xsYXBzZSA9ICdjb2xsYXBzZSc7XG4gICAgc3R5bGUud29yZEJyZWFrID0gJ2JyZWFrLXdvcmQnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpO1xuICAgIHN0eWxlLm1hcmdpbiA9ICdhdXRvJztcbiAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIHN0eWxlLmNvbG9yID0gJ2JsYWNrJztcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgc3R5bGUuekluZGV4ID0gMDtcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJyk7XG4gICAgc3R5bGUuY29udGVudCA9ICdcIlwiJztcbiAgICBzdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCcpO1xuICAgIHN0eWxlLmxpc3RTdHlsZSA9ICdub25lJztcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsPmxpPnAnKTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cbiAgICBzdHlsZSA9IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCAubWFya2VyJyk7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnYScpO1xuICAgIHN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnO1xuXG4gICAgc3R5bGUgPSB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnLnVuc3VwcG9ydGVkJyk7XG4gICAgc3R5bGUub3V0bGluZSA9ICcycHggcmVkIHNvbGlkJztcblxuICAgIHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJy53YXJuaW5nJyk7XG4gICAgc3R5bGUub3V0bGluZSA9ICcxcHggeWVsbG93IHNvbGlkJztcbiAgICB0aGlzLmNvbnZlcnRTdHlsZSgpO1xuICB9XG5cbiAgY29udmVydFN0eWxlKCkge1xuICAgIGNvbnN0IGJnU3R5bGUgPSB0aGlzLndvcmRNb2RlbC5nZXRCYWNrZ3JvdW5kU3R5bGUoKTtcbiAgICBpZiAoIWJnU3R5bGUpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NlY3Rpb24nKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBiZ1N0eWxlKSB7XG4gICAgICBjYXNlICdvYmplY3QnOi8vIGZpbGxcbiAgICAgICAgY29uc29sZS53YXJuKCdub3Qgc3VwcG9ydCBmaWxsIGNvbG9yIG9uIGRvY3VtZW50IGJhY2tncm91bmQgeWV0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmdTdHlsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogb3B0OiB7XG4gICogICB0ZW1wbGF0ZTogZnVuY3Rpb24oc3R5bGUsIGh0bWwsIHByb3BzKXsgcmV0dXJuIChodG1sKX0sXG4gICAgZXh0ZW5kU2NyaXB0OiBcImh0dHA6Ly9hLmNvbS9hLmpzXCJcbiAgICB9XG4gICovXG4gIHRvU3RyaW5nKG9wdCkge1xuICAgIHJldHVybiB0aGlzLmRvYy50b1N0cmluZyhvcHQsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLmRvYy5yZWxlYXNlKCk7XG4gIH1cblxuICBhc1ppcChvcHQpIHtcbiAgICByZXR1cm4gdGhpcy5kb2MuYXNaaXAob3B0LCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIGRvd25sb2FkKG9wdCkge1xuICAgIHJldHVybiB0aGlzLmRvYy5kb3dubG9hZChvcHQsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICogb3B0PWV4dGVuZCh0b1N0cmluZy5vcHQse1xuICAgIHNhdmVJbWFnZTogZnVuY3Rpb24oYXJyYXlCdWZmZXIsIGRvYy5wcm9wcyk6IHByb21pc2UodXJsKSB7fSxcbiAgICBzYXZlSHRtbDogZnVuY3Rpb24oKXt9XG4gIH0pXG4gICovXG4gIHNhdmUob3B0KSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLnNhdmUob3B0LCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUob3B0KSB7XG4gICAgY29uc3Qgc2VsZkNvbnZlcnRlciA9IHRoaXM7XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgIHZhciBkb2MgPSAoZnVuY3Rpb24gYnJvd3NlckRvYygpIHtcbiAgICAgICAgbGV0IHVpZCA9IDA7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCB7XG4gICAgICAgICAgaWQ6ICdBJyxcbiAgICAgICAgICBzZWN0aW9uOiBudWxsLFxuICAgICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChkb2N1bWVudCksXG4gICAgICAgICAgY3JlYXRlVGV4dE5vZGU6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlLmJpbmQoZG9jdW1lbnQpLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHlsZXNoZWV0KSByZXR1cm4gdGhpcy5zdHlsZXNoZWV0O1xuICAgICAgICAgICAgY29uc3QgZWxTdHlsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlc2hlZXQgPSBlbFN0eWxlLnNoZWV0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0U3R5bGVUZXh0KCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgcnVsZXMgPSB0aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbiA9IHJ1bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSBzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXMuam9pbignXFxyXFxuJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1aWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZCArICh1aWQrKyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0b1N0cmluZyhvcHQsIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAob3B0ICYmIHR5cGVvZiBvcHQudGVtcGxhdGUgIT09ICd1bmRlZmluZWQnICYmICR0b29sLmlzRnVuY3Rpb24ob3B0LnRlbXBsYXRlKSkgcmV0dXJuIG9wdC50ZW1wbGF0ZSh0aGlzLmdldFN0eWxlVGV4dCgpLCB0aGlzLl9odG1sKCksIHByb3BzKTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBbYDwhZG9jdHlwZSBodG1sPlxcclxcbjxodG1sPjxoZWFkPjxtZXRhIGNoYXJzZXQ9dXRmLTg+PG1ldGEga2V5PVwiZ2VuZXJhdG9yXCIgdmFsdWU9XCJkb2N4Mmh0bWxcIj48dGl0bGU+JHtwcm9wcy5uYW1lIHx8ICcnfTwvdGl0bGU+PHN0eWxlPmBdO1xuICAgICAgICAgICAgaHRtbC5wdXNoKHRoaXMuZ2V0U3R5bGVUZXh0KCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKCc8L3N0eWxlPjwvaGVhZD48Ym9keT4nKTtcbiAgICAgICAgICAgIGh0bWwucHVzaCh0aGlzLl9odG1sKCkpO1xuICAgICAgICAgICAgb3B0ICYmIG9wdC5leHRlbmRTY3JpcHQgJiYgaHRtbC5wdXNoKGA8c2NyaXB0IHNyYz1cIiR7b3B0LmV4dGVuZFNjcmlwdH1cIj48L3NjcmlwdD5gKTtcbiAgICAgICAgICAgIGh0bWwucHVzaCgnPC9ib2R5PjxodG1sPicpO1xuICAgICAgICAgICAgcmV0dXJuIGh0bWwuam9pbignXFxyXFxuJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfaHRtbCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3A+ZGl2LCBzcGFuPmRpdicpO1xuICAgICAgICAgICAgaWYgKGRpdnMubGVuZ3RoID09IDApIHJldHVybiB0aGlzLm91dGVySFRNTDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIGlsbGVnYWwgPHA+IDxkaXYvPiA8L3A+XG4gICAgICAgICAgICAqIERPTSBvcGVyYXRpb24gZGlyZWN0bHkgaW4gb25sb2FkXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgZGl2Y29udGFpbmVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBsZXRcbiAgICAgICAgICAgICAgdWlkID0gMDtcbiAgICAgICAgICAgIGRpdmNvbnRhaW5lci5pZCA9ICdkaXZjb250YWluZXInO1xuICAgICAgICAgICAgZGl2Y29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGRpdmNvbnRhaW5lcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gZGl2cy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkaXZzW2ldO1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBkaXYucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgICBpZiAoIWRpdi5pZCkgZGl2LmlkID0gYF96JHsrK3VpZH1gO1xuXG4gICAgICAgICAgICAgIGlmICghcGFyZW50LmlkKSBwYXJlbnQuaWQgPSBgX3kke3VpZH1gO1xuXG4gICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JywgcGFyZW50LmlkKTtcbiAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4T2YoZGl2LCBwYXJlbnQuY2hpbGROb2RlcykpO1xuXG4gICAgICAgICAgICAgIGRpdmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGAke3RoaXMub3V0ZXJIVE1MfVxcblxccjxzY3JpcHQ+KCR7dGhpcy5fdHJhbnNmb3JtZXIudG9TdHJpbmcoKX0pKCk7PC9zY3JpcHQ+YDtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zZm9ybWVyKCk7XG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF90cmFuc2Zvcm1lcigpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2Y29udGFpbmVyJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBkaXZzID0gYS5jaGlsZE5vZGVzLCBpID0gZGl2cy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkaXZzW2ldO1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJZCA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50Jyk7XG4gICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKTtcbiAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cGFyZW50SWR9YCk7XG4gICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZGl2LCBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSBlbHMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkgaWYgKGVsID09IGVsc1tpXSkgcmV0dXJuIGk7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICAob3B0ICYmIG9wdC5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICAgIHJvb3QuYm9keSA9IHJvb3Q7XG4gICAgICAgIHJldHVybiByb290O1xuICAgICAgfSgpKTtcblxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2MpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5jcmVhdGVTdHlsZVNoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlbFN0eWxlcyA9IHt9OyBjb25zdFxuICAgICAgICAgIHN0eWxlcyA9IHt9O1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbJHRvb2wuaXNOb2RlID8gJ25vZGVmeScgOiAnYnJvd3NlcmlmeSddKGRvYywgc3R5bGVzaGVldCwgb3B0KSwge1xuICAgICAgICAgIGNyZWF0ZVN0eWxlKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzW3NlbGVjdG9yXSkgcmV0dXJuIHN0eWxlc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICBjb25zdCBydWxlcyA9IHN0eWxlc2hlZXQuY3NzUnVsZXM7IGNvbnN0IGxlbiA9IHJ1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgJHtzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcCgoYSkgPT4gKGEudHJpbSgpWzBdID09ICcjJyA/IGEgOiBgIyR7dGhpcy5pZH0gJHthfWApKS5qb2luKCcsJyl9e31gLCBsZW4pO1xuICAgICAgICAgICAgcmV0dXJuIHN0eWxlc1tzZWxlY3Rvcl0gPSBzdHlsZXNoZWV0LmNzc1J1bGVzW2xlbl0uc3R5bGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZVBhdGgoYSwgcGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50KSByZXR1cm4gcmVsU3R5bGVzW2FdID0gcGFyZW50O1xuICAgICAgICAgICAgY29uc3QgcGF0aHMgPSBbYV07IHZhciBwYXJlbnQgPSBhO1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCA9IHJlbFN0eWxlc1twYXJlbnRdKSBwYXRocy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgICByZXR1cm4gcGF0aHMuam9pbignICcpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVsZWFzZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlY3Rpb247XG4gICAgICAgICAgICB0aGlzLl9yZWxlYXNlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KGRvYykpO1xuICAgIH0oJHRvb2wuaXNOb2RlID8gY3JlYXRlRG9jdW1lbnQoKSA6IGRvY3VtZW50KSk7XG4gIH1cblxuICBzdGF0aWMgbm9kZWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLCB7XG4gICAgICBfcmVsZWFzZSgpIHtcblxuICAgICAgfSxcbiAgICAgIGFzSW1hZ2VVUkwoYnVmZmVyKSB7XG4gICAgICAgIGlmIChvcHQgJiYgdHlwZW9mIChvcHQuYXNJbWFnZVVSTCkgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKTtcbiAgICAgICAgcmV0dXJuICdpbWFnZTovL25vdHN1cHBvcnQnO1xuICAgICAgfSxcbiAgICAgIGFzWmlwKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jyk7XG4gICAgICB9LFxuICAgICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKTtcbiAgICAgIH0sXG4gICAgICBzYXZlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGJyb3dzZXJpZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpIHtcbiAgICBjb25zdCBQcm90b19CbG9iID0gKGZ1bmN0aW9uIChhKSB7XG4gICAgICBhID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuICAgICAgYS5wb3AoKTtcbiAgICAgIHJldHVybiBhLmpvaW4oJy8nKTtcbiAgICB9KCkpO1xuICAgIGNvbnN0IFJlZ19Qcm90b19CbG9iID0gbmV3IFJlZ0V4cChgJHtQcm90b19CbG9ifS8oW1xcXFx3XFxcXGQtXSspYCwgJ2dpJyk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2MsIHtcbiAgICAgIGFzWmlwKG9wdCwgcHJvcHMpIHtcbiAgICAgICAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7IGxldCBoYXNJbWFnZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBmID0gemlwLmZvbGRlcignaW1hZ2VzJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgaGFzSW1hZ2UgPSB0cnVlO1xuICAgICAgICAgIGYuZmlsZShhLnNwbGl0KCcvJykucG9wKCksIHRoaXNbYV0pO1xuICAgICAgICB9LCB0aGlzLmltYWdlcyk7XG4gICAgICAgIHppcC5maWxlKCdwcm9wcy5qc29uJywgSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcbiAgICAgICAgemlwLmZpbGUoJ21haW4uaHRtbCcsIGhhc0ltYWdlID8gdGhpcy50b1N0cmluZyhvcHQpLnJlcGxhY2UoUHJvdG9fQmxvYiwgJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHppcDtcbiAgICAgIH0sXG4gICAgICBkb3dubG9hZChvcHQsIHByb3BzKSB7XG4gICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgIGEuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQsIHByb3BzKS5nZW5lcmF0ZSh7IHR5cGU6ICdibG9iJyB9KSk7XG4gICAgICAgIGEuZG93bmxvYWQgPSBgJHtwcm9wcy5uYW1lIHx8ICdkb2N1bWVudCd9LnppcGA7XG4gICAgICAgIGEuY2xpY2soKTtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgfSxcbiAgICAgIHNhdmUob3B0LCBwcm9wcykge1xuICAgICAgICBsZXQgaGFzSW1hZ2UgPSBmYWxzZTsgY29uc3QgaW1hZ2VzID0ge307IGNvbnN0XG4gICAgICAgICAgbWUgPSB0aGlzO1xuICAgICAgICByZXR1cm4gJHRvb2wuRGVmZXJyZWQud2hlbigodGhpcy5pbWFnZXMgJiYgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpIHx8IFtdKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICBoYXNJbWFnZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSW1hZ2UodGhpc1thXSwgcHJvcHMpXG4gICAgICAgICAgICAudGhlbigodXJsKSA9PiBpbWFnZXNbYV0gPSB1cmwpO1xuICAgICAgICB9LCB0aGlzLmltYWdlcykpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGh0bWwgPSBtZS50b1N0cmluZyhvcHQsIHByb3BzKTtcbiAgICAgICAgICAgIGlmIChoYXNJbWFnZSkgaHRtbCA9IGh0bWwucmVwbGFjZShSZWdfUHJvdG9fQmxvYiwgKGEsIGlkKSA9PiBpbWFnZXNbYV0pO1xuICAgICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSHRtbChodG1sLCBwcm9wcyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW1hZ2VzOiB7fSxcbiAgICAgIGFzSW1hZ2VVUkwoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxuICAgICAgICAgIHsgdHlwZTogYGltYWdlLyR7dHlwZW9mIChhcnJheUJ1ZmZlcikgPT09ICdzdHJpbmcnID8gJ3N2Zyt4bWwnIDogJyonfWAgfSkpO1xuICAgICAgICB0aGlzLmltYWdlc1t1cmxdID0gYXJyYXlCdWZmZXI7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9LFxuICAgICAgX3JlbGVhc2UoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKChiKSA9PiB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmltYWdlcztcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuKGZ1bmN0aW9uIChpc05vZGUsIG0pIHtcbiAgaWYgKCFpc05vZGUpIHJldHVybjtcblxuICBjcmVhdGVEb2N1bWVudCA9IHJlcXVpcmUobSkuanNkb207XG4gIGNvbnN0IHdpbmRvdyA9IGNyZWF0ZURvY3VtZW50KCkuZGVmYXVsdFZpZXc7XG5cbiAgZ2xvYmFsLmJ0b2EgPSB3aW5kb3cuYnRvYTtcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHdpbmRvdy5DU1NTdHlsZURlY2xhcmF0aW9uO1xufSgkdG9vbC5pc05vZGUsICdqc2RvbScpKTtcbiJdfQ==