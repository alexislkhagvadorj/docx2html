import Converter from './converter';
import Style from './style/table';

export default class Table extends Converter {
  get tag() { return 'table'; }

  convertStyle(el) {
    super.convertStyle(...arguments);
    const width = this.wordModel.getColWidth(); const
      html = ['<colgroup>'];
    for (let i = 0, { cols } = width, { sum } = width, len = cols.length; i < len; i++) html.push(`<col style="width:${cols[i] * 100 / sum}%"/>`);
    html.push('</colgroup>');
    el.innerHTML = html.join('');
    const style = this.wordModel.getDirectStyle();
    style && style.parse([new this.constructor.Properties(el.style, this)]);
    const tbody = this.doc.createElement('tbody');
    this.content.appendChild(tbody);
    this.content = tbody;
  }

  getTableSelector() {
    let selector = `#${this.content.id ? this.content.id : (this.content.id = this.doc.uid())}`;
    const level = Style.prototype.PrioritiziedStyles.length;
    for (let i = 0; i < level; i++) {
      this.content.setAttribute(`x${i}`, 1);
      selector += (`[x${i}]`);
    }
    return `${selector}>tbody`;
  }
}

Table.Properties = class Properties extends Style.Properties {

};
