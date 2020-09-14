import { Router, json } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsValue = transactionsRepository.all();
    const balanceValue = transactionsRepository.getBalance();

    const valueBalance = {
      transactions: transactionsValue,
      balance: balanceValue,
    };

    return response.json(valueBalance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const { title, value, type } = request.body;

    const transactionReturn = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transactionReturn);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
