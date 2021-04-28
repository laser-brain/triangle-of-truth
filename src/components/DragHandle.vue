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

<script lang="ts">
import {
  defineComponent, PropType, ref, onMounted,
} from 'vue';
import state from '../state';

interface ICircle {
  x: number;
  y: number;
  r: number;
}

interface ICoordinate {
  x: number;
  y: number;
  matrixTransform: Function;
}

export default defineComponent({
  name: 'DragHandle',
  props: {
    circle: {
      type: Object as PropType<ICircle>,
      x: Number,
      y: Number,
      r: Number,
    },
  },
  setup() {
    const el = ref<SVGSVGElement | null>(null);
    const svg = ref<SVGSVGElement | null>(null);
    let drag = false;
    let pt: ICoordinate;
    let xlate: any;
    let txStartX: number;
    let txStartY: number;
    let mouseStart: ICoordinate;

    const inElementSpace = (evt: MouseEvent): any => {
      if (el.value === null || el.value.parentNode === null) {
        return null;
      }

      const parentNode = el.value.parentNode as SVGSVGElement;
      const screenCTM = parentNode.getScreenCTM();
      if (screenCTM === null) {
        return null;
      }
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      return pt.matrixTransform(screenCTM.inverse());
    };

    const startMove = (evt: MouseEvent) => {
      if (el.value === null || svg.value === null) return;

      drag = true;

      const xforms = el.value.transform.baseVal;
      // Ensure that the first transform is a translate()
      xlate = xforms.numberOfItems > 0 && xforms.getItem(0);
      if (!xlate || xlate.type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        xlate = xforms.createSVGTransformFromMatrix(
          svg.value.createSVGMatrix(),
        );
        xforms.insertItemBefore(xlate, 0);
      }
      txStartX = xlate.matrix.e;
      txStartY = xlate.matrix.f;
      mouseStart = inElementSpace(evt);
    };

    const handleMove = (evt: any) => {
      if (!drag) {
        return;
      }
      const point = inElementSpace(evt);
      xlate.setTranslate(
        txStartX + point.x - mouseStart.x,
        txStartY + point.y - mouseStart.y,
      );

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
      let tmp: SVGSVGElement | null = el.value;
      while (tmp && tmp.nodeName !== 'svg') {
        tmp = tmp.parentNode as SVGSVGElement;
      }
      if (!tmp) {
        throw new Error('el must be inside an SVG wrapper');
      }
      pt = tmp.createSVGPoint();

      svg.value = tmp;
      document
        .querySelectorAll('.handle-move')
        .forEach((node: Node) => node.addEventListener('mousemove', handleMove));
    });

    return {
      el,
      startMove,
      handleMove,
      finishMove,
    };
  },
});
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
