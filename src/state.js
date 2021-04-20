import {
  reactive,
  readonly,
} from 'vue';

const state = reactive({
  posCenter: { x: 0, y: 0 },
  posTop: { x: 0, y: 0 },
  posLeft: { x: 0, y: 0 },
  posRight: { x: 0, y: 0 },
});

const init = (posCenter, posTop, posLeft, posRight) => {
  state.posCenter = posCenter;
  state.posTop = posTop;
  state.posLeft = posLeft;
  state.posRight = posRight;
};

const moveCenter = (posCenter) => {
  state.posCenter = posCenter;
};

export default {
  state: readonly(state),
  init,
  moveCenter,
};
