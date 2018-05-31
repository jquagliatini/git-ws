import Ledger from '../../src/models/Ledger';
import Tx from '../../src/models/Tx';
import Amount from '../../src/models/Amount';
import { EurCurrency } from '../../src/models/currency';

describe('Ledger', () => {
  test('sum', () => {
    const L = new Ledger();
    L.push(new Tx(new Amount(100, EurCurrency)));
    L.push(new Tx(new Amount(50, EurCurrency)));
    expect((L.sum() || { amount: 0 }).amount).toBe(150);
  });
});
