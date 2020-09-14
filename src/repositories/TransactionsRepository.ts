import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValue = this.transactions.reduce((total, item) => {
      // Podemos separar total e item em tipos (total: Balance) para melhor manutenção de código
      if (item.type === 'income') {
        return total + item.value;
      }
      return total;
    }, 0); // É possível passar um Objecto em vez de um valor único

    const outcomeValue = this.transactions.reduce((total, item) => {
      if (item.type === 'outcome') {
        return total + item.value;
      }
      return total;
    }, 0);

    const totalValue = incomeValue - outcomeValue;

    const balanceValue = {
      income: incomeValue,
      outcome: outcomeValue,
      total: totalValue,
    };

    return balanceValue;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
