export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  private decreaseSellIn() {
    this.sellIn -= 1;
  }

  private updateBrie() {
    if (this.quality >= 50) {
      return;
    }

    this.quality += 1;

    if (this.sellIn < 0) {
      this.quality += 1;
    }
  }

  private updateTickets() {
    if (this.quality >= 50) {
      return;
    }

    if (this.sellIn < 0) {
      this.quality = 0;
      return;
    }

    this.quality += 1;

    if (this.sellIn < 10) {
      this.quality += 1;
    }

    if (this.sellIn < 5) {
      this.quality += 1;
    }
  }

  private updateDefault() {
    this.quality -= 1;

    if (this.quality === 0) {
      return;
    }

    if (this.sellIn < 0) {
      this.quality -= 1;
    }
  }

  public updateQuality() {
    if (this.name === 'Sulfuras, Hand of Ragnaros') return;

    this.decreaseSellIn();

    if (this.name === 'Aged Brie') {
      this.updateBrie();
      return;
    }

    if (this.name === 'Backstage passes to a TAFKAL80ETC concert') {
      this.updateTickets();
      return;
    }

    this.updateDefault();
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => item.updateQuality());

    return this.items;
  }
}
