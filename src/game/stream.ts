let unique_no = 0;

interface Item {
  y: number;
  id: number;
}

export class Stream {
  gap: number;
  items: Item[] = [];
  step: number;
  height: number;
  onAdd: (id: Item["id"]) => void;
  onRemove: (id: Item["id"]) => void;

  constructor({
    gap,
    step,
    height,
    onAdd,
    onRemove,
  }: {
    gap: number;
    step: number;
    height: number;
    onAdd?: Stream["onAdd"];
    onRemove?: Stream["onRemove"];
  }) {
    this.gap = gap;
    this.step = step;
    this.onAdd = onAdd ?? ((item) => item);
    this.onRemove = onRemove ?? (() => {});
    this.height = height;

    this.addItem({ y: -gap });
    this.addItem({ y: -2 * gap });
  }

  addItem({ y }: { y: number }) {
    const item = {
      y,
      id: unique_no++,
    };
    this.onAdd(item.id);
    this.items.unshift(item);

    return item;
  }
  popItem() {
    const item = this.items.pop();

    if (item) {
      this.onRemove(item.id);
    }
  }

  getItems() {
    return this.items;
  }

  tick() {
    this.items = this.items.map((v) => ({
      ...v,
      y: v.y + this.step,
    }));

    // Check the end!
    const secondLast = this.items[this.items.length - 2];

    if (!secondLast) {
      throw new Error("Second last not found.");
    }

    if (secondLast.y > this.height) {
      // Remove Last!
      const last = this.items.pop();
      if (!last) {
        throw new Error("Last not found!");
      }

      // Should we add this to top? To reuse this item.
      const firstItem = this.items[0];
      if (firstItem.y > 0) {
        // Here the item should be mutated.
        this.items.unshift(last);
        last.y = firstItem.y - this.gap;
      } else {
        this.onRemove(last.id);
      }
    }

    // Check for the first!
    const firstItem = this.items[0];
    if (!firstItem) {
      throw new Error("First item not found.");
    }

    if (firstItem.y > 0) {
      // Create new item.
      this.addItem({ y: firstItem.y - this.gap });
    }
  }
}
