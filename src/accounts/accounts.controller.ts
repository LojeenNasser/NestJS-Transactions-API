import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './account.schema';

@Controller('api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountsService.createAccount(createAccountDto.userId);
  }

  @Get()
  async getAllAccounts(): Promise<Account[]> {
    return await this.accountsService.getAllAccounts();
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<Account | null> {
    return await this.accountsService.getAccountById(id);
  }
}
