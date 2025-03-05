import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column()
  userId: string;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: ['PAYMENT_PENDING', 'PAYMENT_SUCCESS'], default: 'PAYMENT_PENDING' })
  type: string;

  @Column({ type: 'enum', enum: ['UNREAD', 'READ'], default: 'UNREAD' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}