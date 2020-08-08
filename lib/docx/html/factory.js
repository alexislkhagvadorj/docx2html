'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '*': require('./converter'),
  document: require('./document'),
  hyperlink: require('./a'),
  bookmarkStart: require('./bookmark'),
  'drawing.anchor': require('./drawingAnchor'),
  fieldBegin: require('./fieldBegin'),
  fieldEnd: require('./fieldEnd'),
  footer: require('./footer'),
  'drawing.inline': require('./graphic'),
  heading: require('./h'),
  header: require('./header'),
  image: require('./img'),
  list: require('./list'),
  paragraph: require('./p'),
  section: require('./section'),
  shape: require('./shape'),
  inline: require('./span'),
  table: require('./table'),
  cell: require('./td'),
  text: require('./text'),
  textbox: require('./textbox'),
  row: require('./tr'),

  'field.hyperlink': require('./field/hyperlink'),

  'style.document': require('./style/document'),
  'style.inline': require('./style/inline'),
  'style.numbering.definition': require('./style/list'),
  'style.paragraph': require('./style/paragraph'),
  'style.table': require('./style/table')
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZG9jdW1lbnQiLCJoeXBlcmxpbmsiLCJib29rbWFya1N0YXJ0IiwiZmllbGRCZWdpbiIsImZpZWxkRW5kIiwiZm9vdGVyIiwiaGVhZGluZyIsImhlYWRlciIsImltYWdlIiwibGlzdCIsInBhcmFncmFwaCIsInNlY3Rpb24iLCJzaGFwZSIsImlubGluZSIsInRhYmxlIiwiY2VsbCIsInRleHQiLCJ0ZXh0Ym94Iiwicm93Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiLE9BQUtBLFFBQVEsYUFBUixDQURRO0FBRWJDLFlBQVVELFFBQVEsWUFBUixDQUZHO0FBR2JFLGFBQVdGLFFBQVEsS0FBUixDQUhFO0FBSWJHLGlCQUFlSCxRQUFRLFlBQVIsQ0FKRjtBQUtiLG9CQUFrQkEsUUFBUSxpQkFBUixDQUxMO0FBTWJJLGNBQVlKLFFBQVEsY0FBUixDQU5DO0FBT2JLLFlBQVVMLFFBQVEsWUFBUixDQVBHO0FBUWJNLFVBQVFOLFFBQVEsVUFBUixDQVJLO0FBU2Isb0JBQWtCQSxRQUFRLFdBQVIsQ0FUTDtBQVViTyxXQUFTUCxRQUFRLEtBQVIsQ0FWSTtBQVdiUSxVQUFRUixRQUFRLFVBQVIsQ0FYSztBQVliUyxTQUFPVCxRQUFRLE9BQVIsQ0FaTTtBQWFiVSxRQUFNVixRQUFRLFFBQVIsQ0FiTztBQWNiVyxhQUFXWCxRQUFRLEtBQVIsQ0FkRTtBQWViWSxXQUFTWixRQUFRLFdBQVIsQ0FmSTtBQWdCYmEsU0FBT2IsUUFBUSxTQUFSLENBaEJNO0FBaUJiYyxVQUFRZCxRQUFRLFFBQVIsQ0FqQks7QUFrQmJlLFNBQU9mLFFBQVEsU0FBUixDQWxCTTtBQW1CYmdCLFFBQU1oQixRQUFRLE1BQVIsQ0FuQk87QUFvQmJpQixRQUFNakIsUUFBUSxRQUFSLENBcEJPO0FBcUJia0IsV0FBU2xCLFFBQVEsV0FBUixDQXJCSTtBQXNCYm1CLE9BQUtuQixRQUFRLE1BQVIsQ0F0QlE7O0FBd0JiLHFCQUFtQkEsUUFBUSxtQkFBUixDQXhCTjs7QUEwQmIsb0JBQWtCQSxRQUFRLGtCQUFSLENBMUJMO0FBMkJiLGtCQUFnQkEsUUFBUSxnQkFBUixDQTNCSDtBQTRCYixnQ0FBOEJBLFFBQVEsY0FBUixDQTVCakI7QUE2QmIscUJBQW1CQSxRQUFRLG1CQUFSLENBN0JOO0FBOEJiLGlCQUFlQSxRQUFRLGVBQVI7QUE5QkYsQyIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAnKic6IHJlcXVpcmUoJy4vY29udmVydGVyJyksXG4gIGRvY3VtZW50OiByZXF1aXJlKCcuL2RvY3VtZW50JyksXG4gIGh5cGVybGluazogcmVxdWlyZSgnLi9hJyksXG4gIGJvb2ttYXJrU3RhcnQ6IHJlcXVpcmUoJy4vYm9va21hcmsnKSxcbiAgJ2RyYXdpbmcuYW5jaG9yJzogcmVxdWlyZSgnLi9kcmF3aW5nQW5jaG9yJyksXG4gIGZpZWxkQmVnaW46IHJlcXVpcmUoJy4vZmllbGRCZWdpbicpLFxuICBmaWVsZEVuZDogcmVxdWlyZSgnLi9maWVsZEVuZCcpLFxuICBmb290ZXI6IHJlcXVpcmUoJy4vZm9vdGVyJyksXG4gICdkcmF3aW5nLmlubGluZSc6IHJlcXVpcmUoJy4vZ3JhcGhpYycpLFxuICBoZWFkaW5nOiByZXF1aXJlKCcuL2gnKSxcbiAgaGVhZGVyOiByZXF1aXJlKCcuL2hlYWRlcicpLFxuICBpbWFnZTogcmVxdWlyZSgnLi9pbWcnKSxcbiAgbGlzdDogcmVxdWlyZSgnLi9saXN0JyksXG4gIHBhcmFncmFwaDogcmVxdWlyZSgnLi9wJyksXG4gIHNlY3Rpb246IHJlcXVpcmUoJy4vc2VjdGlvbicpLFxuICBzaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpLFxuICBpbmxpbmU6IHJlcXVpcmUoJy4vc3BhbicpLFxuICB0YWJsZTogcmVxdWlyZSgnLi90YWJsZScpLFxuICBjZWxsOiByZXF1aXJlKCcuL3RkJyksXG4gIHRleHQ6IHJlcXVpcmUoJy4vdGV4dCcpLFxuICB0ZXh0Ym94OiByZXF1aXJlKCcuL3RleHRib3gnKSxcbiAgcm93OiByZXF1aXJlKCcuL3RyJyksXG5cbiAgJ2ZpZWxkLmh5cGVybGluayc6IHJlcXVpcmUoJy4vZmllbGQvaHlwZXJsaW5rJyksXG5cbiAgJ3N0eWxlLmRvY3VtZW50JzogcmVxdWlyZSgnLi9zdHlsZS9kb2N1bWVudCcpLFxuICAnc3R5bGUuaW5saW5lJzogcmVxdWlyZSgnLi9zdHlsZS9pbmxpbmUnKSxcbiAgJ3N0eWxlLm51bWJlcmluZy5kZWZpbml0aW9uJzogcmVxdWlyZSgnLi9zdHlsZS9saXN0JyksXG4gICdzdHlsZS5wYXJhZ3JhcGgnOiByZXF1aXJlKCcuL3N0eWxlL3BhcmFncmFwaCcpLFxuICAnc3R5bGUudGFibGUnOiByZXF1aXJlKCcuL3N0eWxlL3RhYmxlJyksXG59O1xuIl19