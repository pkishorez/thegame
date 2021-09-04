export interface GameConfig {
  arena: {
    width: number;
    height: number;
    lanes: number;
  };

  car: {
    width: number;
    height: number;

    opponent: {
      step: number;
      gap: number;
      color: string;
    };
    mycar: {
      step: number;
      color: string;
    };
  };

  divider: {
    width: number;
    height: number;
    gap: number;
    step: number;
  };

  renderer: {
    canvas: boolean;
    dom: boolean;
  };
}
