import { Loan } from '../entities/Loan';
import { ILoanRepository } from '../repositories/ILoanRepository';

export class FindLoansByUser {
  constructor(private readonly loanRepository: ILoanRepository) {}

  async execute(userId: string): Promise<Loan[]> {
    return this.loanRepository.findByUserId(userId);
  }
}
