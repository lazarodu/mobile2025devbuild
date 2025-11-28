import { ILoanRepository } from '../domain/repositories/ILoanRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IVinylRecordRepository } from '../domain/repositories/IVinylRecordRepository';
import { BorrowVinylRecord } from '../domain/use-cases/BorrowVinylRecord';
import { ReturnVinylRecord } from '../domain/use-cases/ReturnVinylRecord';
import { FindCurrentLoanOfRecord } from '../domain/use-cases/FindCurrentLoanOfRecord';
import { FindLoansByUser } from '../domain/use-cases/FindLoansByUser';
import { HybridLoanRepository } from '../infra/repositories/HybridLoanRepository';
import { HybridUserRepository } from '../infra/repositories/HybridUserRepository';
import { HybridVinylRecordRepository } from '../infra/repositories/HybridVinylRecordRepository';

export function makeLoanUseCases() {
  const loanRepository: ILoanRepository = HybridLoanRepository.getInstance();
  const userRepository: IUserRepository = HybridUserRepository.getInstance();
  const vinylRecordRepository: IVinylRecordRepository = HybridVinylRecordRepository.getInstance();

  const borrowVinylRecord = new BorrowVinylRecord(
    loanRepository,
    userRepository,
    vinylRecordRepository
  );
  const returnVinylRecord = new ReturnVinylRecord(loanRepository);
  const findCurrentLoanOfRecord = new FindCurrentLoanOfRecord(loanRepository);
  const findLoansByUser = new FindLoansByUser(loanRepository);

  return {
    borrowVinylRecord,
    returnVinylRecord,
    findCurrentLoanOfRecord,
    findLoansByUser,
  };
}
