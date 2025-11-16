import { makeLoanUseCases } from '../../factories/makeLoanUseCases';

describe('makeLoanUseCases', () => {
  it('should create and return all loan use cases', () => {
    const useCases = makeLoanUseCases();

    expect(useCases.borrowVinylRecord).toBeDefined();
    expect(useCases.returnVinylRecord).toBeDefined();
  });
});
