export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return item;
      }

      item.sellIn = item.sellIn - 1;

      if (item.name === 'Aged Brie') {
        if (item.quality >= 50) {
          return item;
        }

        item.quality += 1;

        if (item.sellIn < 0) {
          item.quality += 1;
        }

        return item;
      }

      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality >= 50) {
          return item;
        }

        if (item.sellIn < 0) {
          item.quality = 0;
          return item;
        }

        item.quality += 1;

        if (item.sellIn < 10) {
          item.quality += 1;
        }

        if (item.sellIn < 5) {
          item.quality += 1;
        }

        return item;
      }

      item.quality -= 1;

      if (item.quality === 0) {
        return item;
      }

      if (item.sellIn < 0) {
        item.quality -= 1;
      }

      return item;
    });

    return this.items;
  }
}
