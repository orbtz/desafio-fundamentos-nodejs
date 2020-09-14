import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is isvalid.');
    }

    const balanceValue = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balanceValue.total) {
      throw Error('This transaction goes beyond the companys cash');
    }

    const transactionObject = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transactionObject;
  }
}

export default CreateTransactionService;
