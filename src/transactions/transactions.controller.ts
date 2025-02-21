import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransferTransactionDto } from './dto/transfer-transaction.dto';
import { Transaction } from './transaction.schema';

@ApiTags('Transactions')
@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Deposit funds into an account' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Deposit successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request' })
  @ApiBody({ type: CreateTransactionDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deposit(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.deposit(createTransactionDto);
  }

  @Post('transfer')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Transfer funds between accounts' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Transfer successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request' })
  @ApiBody({ type: TransferTransactionDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async transfer(@Body() transferTransactionDto: TransferTransactionDto) {
    return this.transactionsService.transfer(transferTransactionDto);
  }

  @Post('withdraw')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Withdraw funds from an account' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Withdrawal successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request' })
  @ApiBody({ type: CreateTransactionDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async withdraw(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.withdraw(createTransactionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of transactions', type: [Transaction] })
  async getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Transaction found', type: Transaction })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transaction not found' })
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }
}
