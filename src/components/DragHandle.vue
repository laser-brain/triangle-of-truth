<template>
  <circle
    ref="el"
    stroke="black"
    fill="white"
    :cx="circle.x"
    :cy="circle.y"
    :r="circle.r"
    v-on="{ mousedown: startMove, mouseup: finishMove }"
  />
</template>

<script>
import { ref, onMounted } from 'vue';
import state from '../state';

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
      xlate.setTranslate(txStartX + point.x - mouseStart.x, txStartY + point.y - mouseStart.y);

      if (point === undefined) {
        console.log('undefined');
      } else {
        state.moveCenter(point);
      }
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
      document.querySelectorAll('.handle-move').forEach((node) => node.addEventListener('mousemove', handleMove));
    });

    return {
      el,
      startMove,
      handleMove,
      finishMove,
    };
  },
};
</script>

<style lang="scss" scoped>
$color: "white";

circle {
  cursor: pointer;
  stroke: $color;
  stroke-width: 1;
  fill: $color;
}
</style>
