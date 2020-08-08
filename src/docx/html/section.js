import Converter from './converter';
import Style from './style/section';

export default class Section extends Converter {
  get tag() { return 'section'; }

  convertStyle(el) {
    this.doc.section = el;
    const style = this.wordModel.getDirectStyle();
    style && style.parse([new Style(el.style)]);
  }
}
