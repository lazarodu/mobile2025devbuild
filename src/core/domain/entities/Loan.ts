export class Loan {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly vinylRecordId: string,
    readonly loanDate: Date,
    readonly returnDate?: Date
  ) {}

  static create(
    id: string,
    userId: string,
    vinylRecordId: string,
    loanDate: Date,
    returnDate?: Date
  ): Loan {
    return new Loan(id, userId, vinylRecordId, loanDate, returnDate);
  }

  return(): Loan {
    if (this.returnDate) {
      throw new Error('Loan already returned');
    }
    return new Loan(this.id, this.userId, this.vinylRecordId, this.loanDate, new Date());
  }
}
