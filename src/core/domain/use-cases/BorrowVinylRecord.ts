import { Loan } from '../entities/Loan';
import { ILoanRepository } from '../repositories/ILoanRepository';
import { IVinylRecordRepository } from '../repositories/IVinylRecordRepository';
import { IUserRepository } from '../repositories/IUserRepository';

export class BorrowVinylRecord {
  constructor(
    private readonly loanRepository: ILoanRepository,
    private readonly userRepository: IUserRepository,
    private readonly vinylRecordRepository: IVinylRecordRepository
  ) {}

  async execute(params: {
    userId: string;
    vinylRecordId: string;
  }): Promise<Loan> {
    const { userId, vinylRecordId } = params;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const vinylRecord = await this.vinylRecordRepository.findById(vinylRecordId);
    if (!vinylRecord) {
      throw new Error('Vinyl record not found');
    }

    const currentLoan = await this.loanRepository.findCurrentLoanOfRecord(
      vinylRecordId
    );

    if (currentLoan) {
      throw new Error('Vinyl record is already on loan');
    }

    const loan = Loan.create(
      Math.random().toString(),
      userId,
      vinylRecordId,
      new Date()
    );

    await this.loanRepository.save(loan);

    return loan;
  }
}
