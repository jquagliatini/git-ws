import BankAccount from '../models/BankAccount';
import { Request, Response, Next } from 'restify';

function initController() {
  const bankAccount = new BankAccount();

  return {
    getBalance(req: Request, res: Response, next: Next): void {
      res.json({ balance: bankAccount.getBalanceObject() });
      return next();
    },
    add(req: Request, res: Response, next: Next): void {
      res.json({
        balance: bankAccount.add(req.body.amount).getBalanceObject(),
      });
      return next();
    },
    sub(req: Request, res: Response, next: Next): void {
      res.json({
        balance: bankAccount.sub(req.body.amount).getBalanceObject(),
      });
      return next();
    },
    history(req: Request, res: Response, next: Next): void {
      const page = req.query.page - 1 || 0;
      const id = (i: number) => 10 * page + i;
      res.json(
        bankAccount
          .history(page)
          .map((t, i) => ({ id: id(i), _href: `/t/${id(i)}`, ...t })),
      );
      return next();
    },
    getTransaction(req: Request, res: Response, next: Next): void {
      const txId = +req.params.txid;
      try {
        const tx = bankAccount.getTransaction(txId);
        res.json({ id: txId, ...tx });
      } catch (e) {
        res.json(404, { code: 404, message: e.message });
      } finally {
        return next();
      }
    },
  };
}
// tslint:disable-next-line variable-name
const AccountController = initController();

export default AccountController;
