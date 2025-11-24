import { supabase } from '../supabase/client/supabaseClient';
import { ILoanRepository } from '../../domain/repositories/ILoanRepository';
import { Loan } from '../../domain/entities/Loan';

export class SupabaseLoanRepository implements ILoanRepository {
  private static instance: SupabaseLoanRepository;

  private constructor() {}

  public static getInstance(): SupabaseLoanRepository {
    if (!SupabaseLoanRepository.instance) {
      SupabaseLoanRepository.instance = new SupabaseLoanRepository();
    }
    return SupabaseLoanRepository.instance;
  }

  async save(loan: Loan): Promise<void> {
    const { error } = await supabase.from('loan').insert({
      id: loan.id,
      user_id: loan.userId,
      vinyl_record_id: loan.vinylRecordId,
      loan_date: loan.loanDate.toISOString(),
      return_date: loan.returnDate?.toISOString(),
    });

    if (error) {
      console.error('Error saving loan:', error);
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Loan | null> {
    const { data, error } = await supabase
      .from('loan')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: "The result contains 0 rows"
      throw new Error(error.message);
    }
    if (!data) {
      return null;
    }

    return Loan.create(
      data.id,
      data.user_id,
      data.vinyl_record_id,
      new Date(data.loan_date),
      data.return_date ? new Date(data.return_date) : undefined
    );
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loan')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      return [];
    }

    return data.map(item =>
      Loan.create(
        item.id,
        item.user_id,
        item.vinyl_record_id,
        new Date(item.loan_date),
        item.return_date ? new Date(item.return_date) : undefined
      )
    );
  }

  async findCurrentLoanOfRecord(vinylRecordId: string): Promise<Loan | null> {
    const { data, error } = await supabase
      .from('loan')
      .select('*')
      .eq('vinyl_record_id', vinylRecordId)
      .is('return_date', null)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }
    if (!data) {
      return null;
    }

    return Loan.create(
      data.id,
      data.user_id,
      data.vinyl_record_id,
      new Date(data.loan_date),
      data.return_date ? new Date(data.return_date) : undefined
    );
  }

  async update(loan: Loan): Promise<void> {
    const { error } = await supabase
      .from('loan')
      .update({
        return_date: loan.returnDate?.toISOString(),
      })
      .eq('id', loan.id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
