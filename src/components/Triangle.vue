<template>
  <div class="canvas">
    <svg :width="props.width" :height="props.height">
      <polygon class="triangle tr-time" :points="pointsTriangleLeft" />
      <polygon class="triangle tr-quality" :points="pointsTriangleRight" />
      <polygon class="triangle tr-cost" :points="pointsTriangleBottom" />
      <DragHandle :circle="circle" />
      <text id="time-label" x="140" y="360" fill="white">{{ timeLabel }}</text>
      <text id="quality-label" x="740" y="360" fill="white">
        {{ qualityLabel }}
      </text>
      <text id="cost-label" x="478" y="745" fill="white">{{ costLabel }}</text>
      Sorry, your browser does not support inline SVG.
    </svg>
  </div>
</template>

<script>
import { computed } from 'vue';
import DragHandle from './DragHandle.vue';
import state from '../state';

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
    const posCenter = { x: props.width / 2, y: (props.height / 2) * 1.25 };
    const posTop = { x: props.width / 2, y: (props.height / 20) * 1.5 };
    const posLeft = { x: 0, y: props.height - props.height / 10 };
    const posRight = { x: props.width, y: props.height - props.height / 10 };

    state.init(posCenter, posTop, posLeft, posRight);

    const pointsTriangleLeft = computed(
      () => `${state.state.posCenter.x}, ${state.state.posCenter.y} ${state.state.posTop.x}, ${state.state.posTop.y} ${state.state.posLeft.x}, ${state.state.posLeft.y}`,
    );
    const pointsTriangleRight = computed(
      () => `${state.state.posCenter.x}, ${state.state.posCenter.y} ${state.state.posTop.x}, ${state.state.posTop.y} ${state.state.posRight.x}, ${state.state.posRight.y}`,
    );
    const pointsTriangleBottom = computed(
      () => `${state.state.posCenter.x}, ${state.state.posCenter.y} ${state.state.posRight.x}, ${state.state.posRight.y} ${state.state.posLeft.x}, ${state.state.posLeft.y}`,
    );

    const calcArea = (p1, p2, p3) => {
      const tmp = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
      return (tmp > 0 ? tmp : tmp * -1) / 2;
    };

    const timeArea = computed(
      () => calcArea(state.state.posLeft, state.state.posTop, state.state.posCenter),
    );
    const qualityArea = computed(
      () => calcArea(state.state.posRight, state.state.posTop, state.state.posCenter),
    );
    const costArea = computed(
      () => calcArea(state.state.posRight, state.state.posLeft, state.state.posCenter),
    );

    const totalArea = computed(() => timeArea.value + costArea.value + qualityArea.value);
    const calcPercentage = (fraction) => {
      const percentage = (fraction.value / totalArea.value) * 100;
      return `${percentage.toFixed(0)}%`;
    };

    const timeLabel = computed(() => `Time (${calcPercentage(timeArea)})`);
    const qualityLabel = computed(() => `Quality (${calcPercentage(qualityArea)})`);
    const costLabel = computed(() => `Cost (${calcPercentage(costArea)})`);

    const circle = {
      x: posCenter.x,
      y: posCenter.y,
      r: Math.min(props.width, props.height) / 300,
    };

    return {
      pointsTriangleLeft,
      pointsTriangleRight,
      pointsTriangleBottom,
      circle,
      props,
      timeLabel,
      qualityLabel,
      costLabel,
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

  text {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-weight: bold;
    font-size: 2vmin;
  }

  polygon {
    stroke-width: 4;

    &.tr-cost {
      fill: #324851;
    }
    &.tr-time {
      fill: #34675c;
    }
    &.tr-quality {
      fill: #7da3a1;
    }
  }
}
</style>
