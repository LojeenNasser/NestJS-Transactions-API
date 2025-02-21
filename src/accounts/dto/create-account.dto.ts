import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}
