import {
  getSellPrice,
  getBuyPrice,
  getPostage,
  getDisplayPrice,
  getFinalPrice,
  getBalanceUsed,
  getProtectionCharge,
} from '..';
import { listing } from '../../mocks';
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

describe('getSellPrice', () => {
  it('gets the total listed price', () => {
    const result = getSellPrice({ ...listing, postage: 200 });
    expect(result).toEqual(20200);
  });
});

describe('getProtectionCharge', () => {
  it('gets the amount of order protection the buyer will pay', () => {
    const result = getProtectionCharge({ ...listing, postage: 200 });
    expect(result).toEqual(808);
  });
});

describe('getBalanceUsed', () => {
  describe('when user has no credit', () => {
    it('returns 0', () => {
      const result = getBalanceUsed(
        { ...listing, postage: 200 },
        { balance: 0 },
      );
      expect(result).toEqual(0);
    });
  });
  describe('when user has a credit balance', () => {
    it('returns the amount credit applicable to the listing', () => {
      const balance = 500;
      const result = getBalanceUsed({ ...listing, postage: 200 }, { balance });
      expect(result).toEqual(balance);
    });
    describe('when user has more credit than the full listing price', () => {
      it('returns the listing price', () => {
        const buyPrice = getBuyPrice({ ...listing, postage: 200 });
        const balance = buyPrice + 10000;
        const result = getBalanceUsed(
          { ...listing, postage: 200 },
          { balance },
        );
        expect(result).toEqual(buyPrice);
      });
    });
  });
});

describe('getBuyPrice', () => {
  it('gets the total price a buyer will pay', () => {
    const result = getBuyPrice({ ...listing, postage: 200 });
    expect(result).toEqual(21008);
  });
});

describe('getDisplayPrice', () => {
  it('returns the price shown on the storefront', () => {
    const result = getDisplayPrice({ ...listing, postage: 200 });
    expect(result).toEqual(21008);
  });
});

describe('getFinalPrice', () => {
  it('gets the price a user will pay', () => {
    const result = getFinalPrice({ ...listing, postage: 200 }, {});
    expect(result).toEqual(21008);
  });
  describe('when the user has credit balance', () => {
    it('gets the remaining price a user will pay', () => {
      const result = getFinalPrice(
        { ...listing, postage: 200 },
        { balance: 500 },
      );
      expect(result).toEqual(20508);
    });
    describe('when the balance is more than the listing', () => {
      it('returns 0', () => {
        const result = getFinalPrice(
          { ...listing, postage: 200 },
          { balance: 22000 },
        );
        expect(result).toEqual(0);
      });
    });
  });
});
