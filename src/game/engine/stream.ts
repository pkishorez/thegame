let unique_no = 0;

interface Item {
  pos: number;
  id: number;
}

export interface StreamConfig {
  gap: number;
  step: number;
  length: number;
}

interface Props {
  config: StreamConfig;
  onAdd?: (id: Item["id"]) => void;
  onRemove?: (id: Item["id"]) => void;
}
export class Stream {
  config!: Props["config"];
  items: Item[] = [];
  onAdd: Props["onAdd"];
  onRemove: Props["onRemove"];

  constructor({ config, onAdd, onRemove }: Props) {
    this.onAdd = onAdd;
    this.onRemove = onRemove;
    this.setConfig(config);
  }

  setConfig({ gap, step, length }: StreamConfig) {
    this.config = {
      gap,
      length,
      step,
    };
  }

  getItems() {
    return this.items;
  }

  tick() {
    const { step } = this.config;

    this.items = this.items.map((item) => ({
      ...item,
      pos: item.pos + step,
    }));

    this.removeEndItemIfOutside();
    this.prependItemIfPossible();
  }

  private removeEndItemIfOutside() {
    const secondLast = this.items[this.items.length - 2];

    if (secondLast && this.isBeyondLength(secondLast)) {
      this.removeEndItem();
    }
  }

  private removeEndItem() {
    const last = this.items.pop();

    if (last) {
      this.onRemove?.(last.id);
    }
  }

  private prependItemIfPossible() {
    const { gap } = this.config;
    const top = this.items[0];

    if (!top) {
      this.prependItem(this.newItem(-gap));
    } else if (top.pos > 0) {
      this.prependItem(this.newItem(top.pos - gap));
    }
  }

  private prependItem(item: Item) {
    this.onAdd?.(item.id);
    this.items.unshift(item);

    return item;
  }

  private newItem(pos: number) {
    return {
      pos,
      id: unique_no++,
    };
  }

  private isBeyondLength({ pos: y }: Item) {
    const { length } = this.config;

    return y > length;
  }
}
