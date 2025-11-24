import { Loan } from '../entities/Loan';
import { ILoanRepository } from '../repositories/ILoanRepository';

export class FindCurrentLoanOfRecord {
  constructor(private readonly loanRepository: ILoanRepository) {}

  async execute(vinylRecordId: string): Promise<Loan | null> {
    return this.loanRepository.findCurrentLoanOfRecord(vinylRecordId);
  }
}
