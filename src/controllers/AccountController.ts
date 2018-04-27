import BankAccount from '../models/BankAccount';
import { Request, Response, Next } from 'restify';

function initController() {
  const bankAccount = new BankAccount(0);

  return {
    getBalance(req: Request, res: Response, next: Next): void {
      res.json({ balance: bankAccount.getBalanceObject() });
      return next();
    },
  };
}
// tslint:disable-next-line variable-name
const AccountController = initController();

export default AccountController;
