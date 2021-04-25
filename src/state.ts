import { reactive, readonly } from 'vue';

interface ICoordinate {
  x: number;
  y: number;
}

interface IState {
  posCenter: ICoordinate;
  posTop: ICoordinate;
  posLeft: ICoordinate;
  posRight: ICoordinate;
}

const state = reactive<IState>({
  posCenter: { x: 0, y: 0 },
  posTop: { x: 0, y: 0 },
  posLeft: { x: 0, y: 0 },
  posRight: { x: 0, y: 0 },
});

const init = (
  posCenter: ICoordinate,
  posTop: ICoordinate,
  posLeft: ICoordinate,
  posRight: ICoordinate,
) => {
  state.posCenter = posCenter;
  state.posTop = posTop;
  state.posLeft = posLeft;
  state.posRight = posRight;
};

const moveCenter = (posCenter: ICoordinate) => {
  state.posCenter = posCenter;
};

export default {
  state: readonly(state),
  init,
  moveCenter,
};
