import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Payment } from '../payment/payment.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Payment, (payment) => payment.receipt)
  @JoinColumn()
  payment: Payment;

  @Column()
  paymentId: string;

  @Column('json')
  details: any;

  @Column({ type: 'enum', enum: ['PAID', 'PENDING'], default: 'PENDING' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}