import Converter from '../converter';

const Lines = 'dotted,dashed,inset,outset,solid'.split();
const browsers = ',-webkit-,-moz-'.split(','); const
  cssID = Converter.asCssID;

export default class StyleConverter extends Converter {
  constructor() {
    super(...arguments);
    const parentStyle = this.wordModel.getParentStyle();
    parentStyle && this.doc.stylePath(cssID(this.wordModel.id), cssID(parentStyle.id));
  }

  convert(value, name, category) {
    const converter = this._getPropertiesConverter(category);
    converter && converter[name] && converter[name](value);
  }

  _getPropertiesConverter() {

  }
}

StyleConverter.Properties = class Properties {
  constructor(style, parent) {
    this.style = style;
    this.parent = parent;
    parent && (this.doc = parent.doc);
  }

  visit() {
    this.convert(...arguments);
  }

  convert(value, name) {
    this[name] && this[name](value);
  }

  _border(border) {
    if (border.val == 'none' || border.val == 'nil') return '0';
    return `${border.sz < 1 && border.sz > 0 ? 1 : border.sz}pt ${Lines.indexOf(border.val.toLowerCase()) != -1 ? border.val : 'solid'} ${border.color || ''}`;
  }

  equalObj(a, b) {
    const keys = Object.keys(a);
    if (!b || keys.length != Object.keys(b).length) return false;
    if (keys.length != 0) {
      for (var i = 0, len = keys.length; i < len; i++) {
        if (a[keys[i]] != b[keys[i]]) return false;
      }
    }

    for (var i = 2, len = arguments.length; i < len; i++) if (!this.equalObj(a, arguments[i])) return false;
    return true;
  }

  upperFirst(type) {
    return type[0].toUpperCase() + type.slice(1);
  }

  styless(name, value, style) {
    browsers.forEach(function (a) {
      this[a + name] = value;
    }.bind(style || this.style));
  }

  lineStyle(x) {
    if (!x) return 'solid';
    x = x.toLowerCase();
    if (x.indexOf('dot') != -1) return 'dotted';
    if (x.indexOf('dash') != -1) return 'dashed';
    if (x.indexOf('double') != -1 || x.indexOf('gap') != -1) return 'double';
    if (x.indexOf('emboss') != -1) return 'ridge';
    if (x.indexOf('grave') != -1) return 'groove';
    if (x.indexOf('outset') != -1) return 'outset';
    if (x.indexOf('inset') != -1) return 'inset';
    return 'solid';
  }
};
