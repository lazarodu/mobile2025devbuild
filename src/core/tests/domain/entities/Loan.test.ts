import { Loan } from '../../../domain/entities/Loan';

describe('Loan', () => {
  it('should create a valid loan', () => {
    const loanDate = new Date();
    const loan = Loan.create('1', 'user-1', 'record-1', loanDate);

    expect(loan.id).toBe('1');
    expect(loan.userId).toBe('user-1');
    expect(loan.vinylRecordId).toBe('record-1');
    expect(loan.loanDate).toBe(loanDate);
    expect(loan.returnDate).toBeUndefined();
  });

  it('should return a loan', () => {
    const loan = Loan.create('1', 'user-1', 'record-1', new Date());
    const returnedLoan = loan.return();

    expect(returnedLoan.returnDate).toBeDefined();
  });

  it('should throw an error if returning an already returned loan', () => {
    const loan = Loan.create('1', 'user-1', 'record-1', new Date(), new Date());
    expect(() => loan.return()).toThrow('Loan already returned');
  });
});
