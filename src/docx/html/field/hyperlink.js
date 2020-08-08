import Field from './field';

function uptrim(el) {
  const parent = el.parentNode;
  parent.removeChild(el);
  if (parent.childNodes.length == 0) uptrim(parent);
}
export default class Hyperlink extends Field {
  convert(elEnd) {
    const a = this.doc.createElement('a');
    a.href = this.wordModel.getLink();
    elEnd.id = this.doc.uid();

    let current = this.elStart; let
      parent = current.parentNode;
    while (!parent.querySelector(`#${elEnd.id}`)) {
      current = parent;
      parent = current.parentNode;
    }
    parent.insertBefore(a, current);
    while (a.nextSibling) a.appendChild(a.nextSibling);

    uptrim(this.elStart);
    uptrim(elEnd);
  }
}
