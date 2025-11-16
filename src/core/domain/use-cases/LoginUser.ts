import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: {
    email: string;
    password: string;
  }): Promise<User> {
    const { email, password } = params;
    return this.userRepository.authenticate(email, password);
  }
}