import { Router, json } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transationsValue = transactionsRepository.all();
    const balanceValue = transactionsRepository.getBalance();

    const valueBalance = {
      transations: transationsValue,
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

    const { id, title, value, type } = request.body;

    const transationReturn = createTransactionService.execute({
      id,
      title,
      value,
      type,
    });

    return response.json(transationReturn);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
