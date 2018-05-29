import Currency from '../Currency';

export default class CurrencyError extends Error {
  constructor(gotCurrency: Currency, expectedCurrency: Currency) {
    super(
      `currencies should be equal, ${gotCurrency.symbol} provided, expected ${
        expectedCurrency.symbol
      }`,
    );
  }
}
