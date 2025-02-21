import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async createAccount(userId: string): Promise<Account> {
    const newAccount = new this.accountModel({ userId, balance: 0 });
    return await newAccount.save();
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  async getAccountById(id: string): Promise<Account | null> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`); 
    }
    return account;
  }
}
