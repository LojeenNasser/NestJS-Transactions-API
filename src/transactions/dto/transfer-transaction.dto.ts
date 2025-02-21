import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class TransferTransactionDto {
  @IsNotEmpty({ message: 'Transaction type is required' })
  type: string = 'transfer';

  @IsNumber({}, { message: 'Amount must be a valid number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @IsMongoId({ message: 'Invalid fromAccount ID' })
  @IsNotEmpty({ message: 'fromAccount ID is required' })
  fromAccount: string;

  @IsMongoId({ message: 'Invalid toAccount ID' })
  @IsNotEmpty({ message: 'toAccount ID is required' })
  toAccount: string;
}
