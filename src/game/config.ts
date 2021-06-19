export interface IGameConfig {
  arena: {
    width: number;
    height: number;
    lanes: number;
  };

  car: {
    width: number;
    height: number;
    gap: number;
    step: number;
    myCarStep: number;
  };

  divider: {
    width: number;
    height: number;
    gap: number;
    step: number;
  };
}
