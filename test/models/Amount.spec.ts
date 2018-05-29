import { Currency } from '../../src/models/currency';
import Amount from '../../src/models/Amount';

// tslint:disable-next-line variable-name
const FakeCurrency: Currency = {
  symbol: 'FKC',
  utf8_symbol: '¤',
  cents_per_unit: 100,
};

// tslint:disable-next-line variable-name
const AnotherFakeCurrency: Currency = {
  symbol: 'AFK',
  utf8_symbol: '#',
  cents_per_unit: 100,
};

describe('Amount', () => {
  const errorMsg: string =
    'currencies should be equal, AFK provided, expected FKC';
  describe('add', () => {
    it('should add a numeric amount', () => {
      const initialAmount = new Amount(100, FakeCurrency);
      const newAmount = initialAmount.add(50);
      expect(newAmount.amount).toBe(150);
    });

    it('should add another Amount', () => {
      const a = new Amount(100, FakeCurrency);
      const b = a.add(new Amount(100, FakeCurrency));
      expect(b.amount).toBe(200);
      expect(b.currency).toEqual(FakeCurrency);
    });

    it('should throw when different currencies', () => {
      const a = new Amount(100, FakeCurrency);
      const b = new Amount(50, AnotherFakeCurrency);

      expect(() => {
        a.add(b);
      }).toThrowError(errorMsg);
    });
  });

  describe('sub', () => {
    it('should sub a number amount', () => {
      const a = new Amount(100, FakeCurrency);
      const b = 50;
      expect(a.sub(b).amount).toBe(50);
    });

    it('should sub an Amount', () => {
      const a = new Amount(100, FakeCurrency);
      const b = new Amount(50, FakeCurrency);
      expect(a.sub(b).amount).toBe(50);
    });

    it('should throw when different Currencies', () => {
      const a = new Amount(100, FakeCurrency);
      const b = new Amount(50, AnotherFakeCurrency);
      expect(() => {
        a.sub(b);
      }).toThrowError(errorMsg);
    });
  });

  describe('toString', () => {
    it('should print correctly', () => {
      const a = new Amount(10000, FakeCurrency);
      expect(a.toString()).toBe('100.00FKC');
    });
  });
});
