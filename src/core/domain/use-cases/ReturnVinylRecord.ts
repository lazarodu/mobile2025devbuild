import { Loan } from '../entities/Loan';
import { ILoanRepository } from '../repositories/ILoanRepository';

export class ReturnVinylRecord {
  constructor(private readonly loanRepository: ILoanRepository) {}

  async execute(params: { loanId: string }): Promise<Loan> {
    const { loanId } = params;

    const loan = await this.loanRepository.findById(loanId);

    if (!loan) {
      throw new Error('Loan not found');
    }

    const returnedLoan = loan.return();

    await this.loanRepository.update(returnedLoan);

    return returnedLoan;
  }
}
