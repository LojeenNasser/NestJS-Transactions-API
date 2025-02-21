import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import { Account } from '../accounts/account.schema';
import { TransferTransactionDto } from './dto/transfer-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async deposit(createTransactionDto: CreateTransactionDto) {
    const { accountId, amount } = createTransactionDto;

    if (!accountId) {
      throw new BadRequestException('accountId is required');
    }

    const account = await this.accountModel.findById(accountId).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    account.balance += amount;
    await account.save();

    const transaction = new this.transactionModel({
      type: 'deposit',
      amount,
      fromAccount: account._id,
    });

    return await transaction.save();
  }

  async withdraw(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { fromAccount, amount } = createTransactionDto;

    if (!fromAccount) {
      throw new BadRequestException('fromAccount is required');
    }

    const account = await this.accountModel.findById(fromAccount).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    account.balance -= amount;
    await account.save();

    const transaction = new this.transactionModel({
      type: 'withdraw',
      amount,
      fromAccount: account._id,
    });

    return await transaction.save();
  }

  async transfer(transferTransactionDto: TransferTransactionDto): Promise<Transaction> {
    const { fromAccount, toAccount, amount } = transferTransactionDto;

    const senderAccount = await this.accountModel.findById(fromAccount).exec();
    if (!senderAccount) {
      throw new NotFoundException('Sender account not found');
    }

    const receiverAccount = await this.accountModel.findById(toAccount).exec();
    if (!receiverAccount) {
      throw new NotFoundException('Receiver account not found');
    }

    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    if (senderAccount.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save();
    await receiverAccount.save();

    const transaction = new this.transactionModel({
      type: 'transfer',
      amount,
      fromAccount: senderAccount._id,
      toAccount: receiverAccount._id,
    });

    return await transaction.save();
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }
  
}
