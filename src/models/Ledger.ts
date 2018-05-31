import Amount from './Amount';
import { Currency } from './currency';
import Tx from './Tx';

class EmptyLedgerError extends Error {
  constructor() {
    super('the ledger is empty, add some transactions');
  }
}

export default class Ledger {
  private ledger: Tx[] = [];

  constructor(...tx: Tx[]) {
    tx.forEach((t) => this.push(t));
  }

  push(tx: Tx): void {
    this.ledger.push(tx);
  }

  sum(): Amount {
    // TODO
    throw new Error();
  }

  slice(start: number = 0, end?: number): Tx[] {
    return this.ledger.slice(start, end);
  }

  get(idx: number) {
    if (!(idx in this.ledger)) {
      throw new RangeError(`transaction ${idx} undefined`);
    }

    return this.ledger[idx];
  }

  // tslint:disable-next-line function-name
  [Symbol.iterator]() {
    return this.ledger.values();
  }
}
