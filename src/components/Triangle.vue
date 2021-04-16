<template>
  <div class="canvas">
    <svg :width="props.width" :height="props.height">
      <polygon class="triangle" :points="pointsTriangleLeft" />
      <polygon class="triangle" :points="pointsTriangleRight" />
      <polygon class="triangle" :points="pointsTriangleBottom" />
      <DragHandle :circle="circle" :svg="svg"  />
      Sorry, your browser does not support inline SVG.
    </svg>
  </div>
</template>

<script>
import DragHandle from './DragHandle.vue';

export default {
  name: 'Triangle',
  components: {
    DragHandle,
  },
  props: {
    height: Number,
    width: Number,
  },
  setup(props) {
    const posCenter = { x: props.width / 2, y: (props.height / 2) * 1.2 };
    const posTop = { x: props.width / 2, y: (props.height / 20) * 1.2 };
    const posLeft = { x: 0, y: props.height - props.height / 10 };
    const posRight = { x: props.width, y: props.height - props.height / 10 };

    const pointsTriangleLeft = `${posCenter.x}, ${posCenter.y} ${posTop.x}, ${posTop.y} ${posLeft.x}, ${posLeft.y}`;
    const pointsTriangleRight = `${posCenter.x}, ${posCenter.y} ${posTop.x}, ${posTop.y} ${posRight.x}, ${posRight.y}`;
    const pointsTriangleBottom = `${posCenter.x}, ${posCenter.y} ${posRight.x}, ${posRight.y} ${posLeft.x}, ${posLeft.y}`;

    const circle = {
      x: posCenter.x,
      y: posCenter.y,
      r: Math.min(props.width, props.height) / 200,
    };

    return {
      pointsTriangleLeft,
      pointsTriangleRight,
      pointsTriangleBottom,
      circle,
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid black;

  .circle,
  .triangle {
    stroke: black;
    stroke-width: 1;
  }

  .triangle {
    fill: transparent;
  }

  .circle {
    fill: black;
  }
}
</style>
