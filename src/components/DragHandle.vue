<template>
  <circle
    ref="el"
    class="circle"
    :cx="circle.x"
    :cy="circle.y"
    :r="circle.r"
    v-on="{ mousedown: startMove, mouseup: finishMove, mousemove: handleMove }"
  />
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'DragHandle',
  props: {
    circle: { x: Number, y: Number, r: Number },
  },
  setup() {
    const el = ref(null);
    const svg = ref(null);
    let drag = false;
    let pt;
    let xlate;
    let txStartX;
    let txStartY;
    let mouseStart;

    const inElementSpace = (evt) => {
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      return pt.matrixTransform(el.value.parentNode.getScreenCTM().inverse());
    };

    const startMove = (evt) => {
      drag = true;

      const xforms = el.value.transform.baseVal;
      // Ensure that the first transform is a translate()
      xlate = xforms.numberOfItems > 0 && xforms.getItem(0);
      if (!xlate || xlate.type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        xlate = xforms.createSVGTransformFromMatrix(svg.value.createSVGMatrix());
        xforms.insertItemBefore(xlate, 0);
      }
      txStartX = xlate.matrix.e;
      txStartY = xlate.matrix.f;
      mouseStart = inElementSpace(evt);
    };

    const handleMove = (evt) => {
      if (!drag) {
        return;
      }
      const point = inElementSpace(evt);
      xlate.setTranslate(
        txStartX + point.x - mouseStart.x,
        txStartY + point.y - mouseStart.y,
      );

      document.querySelectorAll('.triangle').forEach((triangle) => {
        const coords = triangle
          .getAttribute('points')
          .replace(' ,', ',')
          .replace(', ', ',')
          .split(' ');
        coords[0] = `${point.x},${point.y}`;
        triangle.setAttribute('points', coords.join(' '));
      });
    };
    const finishMove = () => {
      drag = false;
    };

    onMounted(() => {
      let tmp = el.value;
      while (tmp && tmp.tagName !== 'svg') tmp = tmp.parentNode;
      if (!tmp) throw new Error('el must be inside an SVG wrapper');
      pt = tmp.createSVGPoint();

      svg.value = tmp;
    });

    // const pt = props.svg.createSVGPoint();
    // const root = props.svg.ownerDocument.rootElement ||
    // props.svg.ownerDocument.body || props.svg;
    // let xlate;
    // let txStartX;
    // let txStartY;
    // let mouseStart;
    // const inElementSpace = (evt) => {
    //   pt.x = evt.clientX;
    //   pt.y = evt.clientY;
    //   return pt.matrixTransform(el.value.parentNode.getScreenCTM().inverse());
    // };

    // handleMove = (evt) => {
    //   const point = inElementSpace(evt);
    //   xlate.setTranslate(
    //     txStartX + point.x - mouseStart.x,
    //     txStartY + point.y - mouseStart.y,
    //   );
    //   document.querySelectorAll('.triangle').forEach((triangle) => {
    //     const coords = triangle
    //       .getAttribute('points')
    //       .replace(' ,', ',')
    //       .replace(', ', ',')
    //       .split(' ');
    //     coords[0] = `${point.x},${point.y}`;
    //     triangle.setAttribute('points', coords.join(' '));
    //   });
    // };

    // finishMove = () => {
    //   root.removeEventListener('mousemove', handleMove, false);
    //   root.removeEventListener('mouseup', finishMove, false);
    // };

    // startMove = (evt) => {
    //   const xforms = this.transform.baseVal;
    //   // Ensure that the first transform is a translate()
    //   xlate = xforms.numberOfItems > 0 && xforms.getItem(0);
    //   if (!xlate || xlate.type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
    //     xlate = xforms.createSVGTransformFromMatrix(props.svg.createSVGMatrix());
    //     xforms.insertItemBefore(xlate, 0);
    //   }
    //   txStartX = xlate.matrix.e;
    //   txStartY = xlate.matrix.f;
    //   mouseStart = inElementSpace(evt);
    // };

    return {
      el,
      startMove,
      handleMove,
      finishMove,
    };
  },
};
</script>
