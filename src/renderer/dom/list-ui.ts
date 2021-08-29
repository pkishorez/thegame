import { diff } from "../../utils";

interface ListItem {
  id: number;
  [key: string]: any;
}

interface Props {
  onAdd?: (elem: HTMLDivElement, v: any) => void;
  onBeforeUnmount?: (elem: HTMLDivElement, v: any) => void;
  onUpdate?: (elem: HTMLDivElement, v: any) => void;
  key?: string;
  wrapperID: string;
  initialItems?: ListItem[];
}
export class ListUI {
  private items: ListItem[];
  private key: string;
  private wrapper: HTMLDivElement;

  private onAdd: Props["onAdd"];
  private onBeforeUnmount: Props["onBeforeUnmount"];
  private onUpdate: Props["onUpdate"];

  constructor({
    key = "item",
    wrapperID,
    initialItems = [],
    onAdd,
    onBeforeUnmount: onRemove,
    onUpdate,
  }: Props) {
    this.key = key;
    this.items = initialItems;
    this.wrapper = document.createElement("div");
    this.wrapper.id = wrapperID;

    this.onAdd = onAdd;
    this.onBeforeUnmount = onRemove;
    this.onUpdate = onUpdate;
  }

  private getId(id: number) {
    return `${this.key}:${id}`;
  }

  getWrapper() {
    return this.wrapper;
  }

  update(items: ListItem[]) {
    const { added, removed } = diff(this.items, items);

    // Add.
    added.forEach((v) => {
      const itemUI = document.createElement("div");
      itemUI.id = `${this.key}:${v.id}`;
      this.wrapper.append(itemUI);
      this.onAdd?.(itemUI, v);
    });

    // Modify.
    items.forEach((v) => {
      const itemUI = document.getElementById(this.getId(v.id));
      if (itemUI instanceof HTMLDivElement) {
        this.onUpdate?.(itemUI, v);
      }
    });

    // Delete.
    removed.forEach((v) => {
      const itemUI = document.getElementById(this.getId(v.id));
      if (itemUI instanceof HTMLDivElement) {
        this.onBeforeUnmount?.(itemUI, v);
        itemUI.remove();
      }
    });

    this.items = items;
  }
}
