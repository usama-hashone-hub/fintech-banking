import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Receipt } from '../receipt/receipt.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column()
  userId: string;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'enum', enum: ['CARD', 'CRYPTO', 'WALLET', 'SN_TOKEN'] })
  method: string;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' })
  status: string;

  @Column()
  merchantQrCode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Receipt, (receipt) => receipt.payment)
  receipt: Receipt;
}