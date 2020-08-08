import Paragraph from './p';

export default class List extends Paragraph {
  convert() {
    const elParent = this.parent.content; let
      ul = elParent.lastElementChild;
    const listStyle = this.wordModel.getNumberingStyle();
    const numId = listStyle.id; const
      level = this.wordModel.getLevel();

    const makeStructure = function (parent) {
      ul = this.doc.createElement('ul');
      ul.id = listStyle.id;
      ul.setAttribute('level', level);
      this.constructor.addClass(ul, listStyle.getParentStyle().id);
      parent.appendChild(ul);
    }.bind(this);

    if (!ul || ul.localName != 'ul' || ul.id != numId) {
      makeStructure(elParent);
    } else if (ul.getAttribute('level') != level) {
      const possibleParent = ul.querySelector(`[level="${level}"]`);
      if (!possibleParent) {
        makeStructure(ul.querySelector(`[level="${parseInt(level) - 1}"]`) || ul);
      } else { ul = possibleParent; }
    }
    const li = this.doc.createElement('li');
    ul.appendChild(li);
    li.appendChild(this.content = this.createElement());
    const marker = this.doc.createElement('span');
    this.constructor.addClass(marker, 'marker');
    this.content.appendChild(marker);// as marker
    this.convertStyle(this.content);
  }
}
