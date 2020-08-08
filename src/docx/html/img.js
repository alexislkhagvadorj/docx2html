import Graphic from './graphic';

export default class Image extends Graphic {
  get tag() { return 'img'; }

  convertStyle(el) {
    super.convertStyle(...arguments);
    const blob = this.wordModel.getImage();
    blob && (el.src = this.doc.asImageURL(blob));
  }
}
