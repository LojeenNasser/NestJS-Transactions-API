import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Account } from 'src/accounts/account.schema';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true, enum: ['deposit', 'withdraw', 'transfer'] })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: function (this: Transaction) {
    return this.type !== 'deposit';
  }})
  fromAccount?: Account;

  @Prop({ type: Types.ObjectId, ref: 'Account' })
  toAccount?: Account;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
