import { IsNotEmpty, IsEnum, IsNumber, IsMongoId, ValidateIf } from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(['deposit', 'withdraw', 'transfer'], { message: 'Invalid transaction type' })
  @IsNotEmpty({ message: 'Transaction type is required' })
  type: string;

  @IsNumber({}, { message: 'Amount must be a valid number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @ValidateIf(o => o.type !== 'deposit')
  @IsMongoId({ message: 'Invalid fromAccount ID' })
  @IsNotEmpty({ message: 'fromAccount ID is required' })
  fromAccount?: string;

  @ValidateIf(o => o.type === 'transfer')
  @IsMongoId({ message: 'Invalid toAccount ID' })
  toAccount?: string;

  @ValidateIf(o => o.type === 'deposit')
  @IsMongoId({ message: 'Invalid account ID' })
  @IsNotEmpty({ message: 'accountId is required' })
  accountId?: string;
}
