import { getDiscount, getListedPrice, getPostage } from '..';
import { listing } from '../../mocks/data';
import { getBasePrice } from '../logic';

describe('getBasePrice', () => {
  it('gets the base price', () => {
    const result = getBasePrice(listing);
    expect(result).toEqual(20000);
  });
});

describe('getPostage', () => {
  it('gets the base price', () => {
    const result = getPostage({ ...listing, postage: 200 });
    expect(result).toEqual(200);
  });
});

describe('getListedPrice', () => {
  it('gets the total listed price', () => {
    const result = getListedPrice({ ...listing, postage: 200 });
    expect(result).toEqual(20200);
  });
});

describe('getDiscount', () => {
  describe('when there is no discount', () => {
    it('returns 0', () => {
      const result = getDiscount(listing);
      expect(result).toBe(0);
    });
  });
  describe('when there is a percentage discount', () => {
    it('returns the discounted amount', () => {
      const result = getDiscount({
        ...listing,
        discount: {
          name: '',
          fixed: null,
          percentage: 25,
        },
      });
      expect(result).toBe(5000);
    });
  });
  describe('when there is a fixed discount', () => {
    it('returns the fixed amount', () => {
      const result = getDiscount({
        ...listing,
        discount: {
          name: '',
          fixed: 5000,
          percentage: null,
        },
      });
      expect(result).toBe(5000);
    });
  });
});
