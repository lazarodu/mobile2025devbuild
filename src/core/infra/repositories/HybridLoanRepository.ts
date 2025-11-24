import NetInfo from '@react-native-community/netinfo';
import { ILoanRepository } from '../../domain/repositories/ILoanRepository';
import { Loan } from '../../domain/entities/Loan';
import { SupabaseLoanRepository } from './supabaseLoanRepository';
import { SQLiteLoanRepository } from '../sqlite/SQLiteLoanRepository';

export class HybridLoanRepository implements ILoanRepository {
  private static instance: HybridLoanRepository;
  private onlineRepo: ILoanRepository;
  private offlineRepo: ILoanRepository;

  private constructor() {
    this.onlineRepo = SupabaseLoanRepository.getInstance();
    this.offlineRepo = SQLiteLoanRepository.getInstance();
  }

  public static getInstance(): HybridLoanRepository {
    if (!HybridLoanRepository.instance) {
      HybridLoanRepository.instance = new HybridLoanRepository();
    }
    return HybridLoanRepository.instance;
  }

  private async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  async save(loan: Loan): Promise<void> {
    if (await this.isOnline()) {
      try {
        await this.onlineRepo.save(loan);
        await this.offlineRepo.save(loan);
      } catch (error) {
        console.warn('Online save failed, falling back to offline.', error);
        await this.offlineRepo.save(loan);
      }
    } else {
      await this.offlineRepo.save(loan);
    }
  }

  async findById(id: string): Promise<Loan | null> {
    if (await this.isOnline()) {
      return this.onlineRepo.findById(id);
    }
    return this.offlineRepo.findById(id);
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    if (await this.isOnline()) {
      return this.onlineRepo.findByUserId(userId);
    }
    return this.offlineRepo.findByUserId(userId);
  }

  async findCurrentLoanOfRecord(vinylRecordId: string): Promise<Loan | null> {
    if (await this.isOnline()) {
      return this.onlineRepo.findCurrentLoanOfRecord(vinylRecordId);
    }
    return this.offlineRepo.findCurrentLoanOfRecord(vinylRecordId);
  }

  async update(loan: Loan): Promise<void> {
    if (await this.isOnline()) {
      try {
        await this.onlineRepo.update(loan);
        await this.offlineRepo.update(loan);
      } catch (error) {
        console.warn('Online update failed, falling back to offline.', error);
        await this.offlineRepo.update(loan);
      }
    } else {
      await this.offlineRepo.update(loan);
    }
  }
}
