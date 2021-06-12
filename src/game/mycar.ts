export class MyCar {
  private x: number;
  private y: number;
  private positionMap: { left: number; right: number };

  constructor({
    x,
    y,
    positionMap,
  }: {
    x: MyCar["x"];
    y: MyCar["y"];
    positionMap: MyCar["positionMap"];
  }) {
    this.x = x;
    this.y = y;
    this.positionMap = positionMap;
    this.setPosition("left");
  }

  setPosition(position: keyof MyCar["positionMap"]) {
    this.x = this.positionMap[position];
  }

  getDimensions() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  tick() {}
}
