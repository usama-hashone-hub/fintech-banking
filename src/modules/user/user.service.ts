import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async createUser(email: string, password: string, name: string): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepo.create({ email, password, name }); // Hash password in production
    return this.userRepo.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }
}