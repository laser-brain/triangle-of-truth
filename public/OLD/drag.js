// // Makes an element in an SVG document draggable.
// // Fires custom `dragstart`, `drag`, and `dragend` events on the
// // element with the `detail` property of the event carrying XY
// // coordinates for the location of the element.
// function makeDraggable(el) {
//   if (!el) return console.error('makeDraggable() needs an element');
//   let svg = el;
//   while (svg && svg.tagName !== 'svg') svg = svg.parentNode;
//   if (!svg) return console.error(el, 'must be inside an SVG wrapper');
//   const pt = svg.createSVGPoint();
//   const doc = svg.ownerDocument;

//   const root = doc.rootElement || doc.body || svg;
//   let xlate;
//   let txStartX;
//   let txStartY;
//   let
//     mouseStart;
//   const xforms = el.transform.baseVal;

//   el.addEventListener('mousedown', startMove, false);

//   function startMove(evt) {
//     // We listen for mousemove/up on the root-most
//     // element in case the mouse is not over el.
//     root.addEventListener('mousemove', handleMove, false);
//     root.addEventListener('mouseup', finishMove, false);

//     // Ensure that the first transform is a translate()
//     xlate = xforms.numberOfItems > 0 && xforms.getItem(0);
//     if (!xlate || xlate.type != SVGTransform.SVG_TRANSFORM_TRANSLATE) {
//       xlate = xforms.createSVGTransformFromMatrix(svg.createSVGMatrix());
//       xforms.insertItemBefore(xlate, 0);
//     }
//     txStartX = xlate.matrix.e;
//     txStartY = xlate.matrix.f;
//     mouseStart = inElementSpace(evt);
//     fireEvent('dragstart');
//   }

//   function handleMove(evt) {
//     const point = inElementSpace(evt);
//     xlate.setTranslate(
//       txStartX + point.x - mouseStart.x,
//       txStartY + point.y - mouseStart.y,
//     );

//     document.querySelectorAll('.triangle').forEach((triangle) => {
//       const coords = triangle.getAttribute('points').replace(' ,', ',').replace(', ', ',')
//         .split(' ');
//       coords[0] = `${point.x},${point.y}`;
//       triangle.setAttribute('points', coords.join(' '));
//     });

//     fireEvent('drag');
//   }

//   function finishMove(evt) {
//     root.removeEventListener('mousemove', handleMove, false);
//     root.removeEventListener('mouseup', finishMove, false);
//     fireEvent('dragend');
//   }

//   function fireEvent(eventName) {
//     const event = new Event(eventName);
//     event.detail = {
//       x: xlate.matrix.e,
//       y: xlate.matrix.f,
//     };
//     return el.dispatchEvent(event);
//   }

//   // Convert mouse position from screen space to coordinates of el
//   function inElementSpace(evt) {
//     pt.x = evt.clientX;
//     pt.y = evt.clientY;
//     return pt.matrixTransform(el.parentNode.getScreenCTM().inverse());
//   }
// }
