import { MyCar } from "./mycar";

export class TheGame {
  step: number = 0;

  width!: number;
  height!: number;

  leftLaneCenter!: number;
  rightLaneCenter!: number;

  myCar?: MyCar;

  constructor(width: number, height: number) {
    this.setDimensions(width, height);
  }

  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.leftLaneCenter = width / 4;
    this.rightLaneCenter = (width * 3) / 4;
  }

  setupMyCar() {
    this.myCar = new MyCar({
      x: 0,
      y: 0,
      positionMap: {
        left: this.leftLaneCenter,
        right: this.rightLaneCenter,
      },
    });
  }
  setupDividers() {}
  setupOpponents() {}

  tick() {
    // Update My Car.
    // Update Dividers.
    // Update opponents.
  }
}
