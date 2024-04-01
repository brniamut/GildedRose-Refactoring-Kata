import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Normal Item', () => {
    it('subtracts 1 form sellIn and quality for every day that passes for an item', () => {
      const gildedRose = new GildedRose([new Item('test-item', 50, 50)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('test-item');
      expect(items[0].sellIn).toBe(49);
      expect(items[0].quality).toBe(49);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(48);
      expect(items[0].quality).toBe(48);
    });

    it('degrades the quality twice as fast, if sellIn is below 0', () => {
      const gildedRose = new GildedRose([new Item('test-item', 0, 50)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('test-item');
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(48);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(46);
    });
  });

  describe('Age Brie', () => {
    it('increases the quality if the item is for every day that passes but the quality is never more than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 49)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('Aged Brie');
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('does not do anything', () => {
      const gildedRose = new GildedRose([
        new Item('Sulfuras, Hand of Ragnaros', 15, 15),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
      expect(items[0].sellIn).toBe(15);
      expect(items[0].quality).toBe(15);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(15);
      expect(items[0].quality).toBe(15);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('increases the quality if the item for every day that passes but the quality if never more than 50', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 50, 49),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(49);
      expect(items[0].quality).toBe(50);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(48);
      expect(items[0].quality).toBe(50);
    });

    it('increases the quality by 2 when there are 10 days left', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(11);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(13);
    });

    it('increases the quality by 3 when there are 5 days left', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(5);
      expect(items[0].quality).toBe(12);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(15);
    });

    it('sets the quality on 0 when there are 0 days left', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(13);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
