import Converter from './converter';
import Style from './style/table';

export default class Tr extends Converter {
  get tag() { return 'tr'; }

  convertStyle(el) {
    super.convertStyle(...arguments);
    const style = this.wordModel.getDirectStyle();
    style && style.parse([new this.constructor.Properties(el.style, this)]);
  }
}

class Properties extends Style.RowProperties {
  cnfStyle(x) {
    const names = []; const { PrioritiziedStyles } = Style.prototype; let level = -1; let
      t;
    for (var i = 0; i < 12; i++) {
      if (x.charAt(i) == '1') {
        names.push(t = Style.TableStyles[i]);
        if ((t = PrioritiziedStyles.indexOf(t)) > level) level = t;
      }
    }
    names.length && Td.addClass(this.parent.content, names.join(' '));
    for (var i = 0; i < level; i++) this.parent.content.setAttribute(`x${i}`, 1);
  }
}

Tr.Properties = Properties;
