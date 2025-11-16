import { Loan } from '../entities/Loan';

export interface ILoanRepository {
  save(loan: Loan): Promise<void>;
  findById(id: string): Promise<Loan | null>;
  findByUserId(userId: string): Promise<Loan[]>;
  findCurrentLoanOfRecord(vinylRecordId: string): Promise<Loan | null>;
  update(loan: Loan): Promise<void>;
}
