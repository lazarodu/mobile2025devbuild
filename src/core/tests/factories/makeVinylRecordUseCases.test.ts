import { makeVinylRecordUseCases } from '../../factories/makeVinylRecordUseCases';

describe('makeVinylRecordUseCases', () => {
  it('should create and return all vinyl record use cases', () => {
    const useCases = makeVinylRecordUseCases();

    expect(useCases.registerVinylRecord).toBeDefined();
    expect(useCases.updateVinylRecord).toBeDefined();
    expect(useCases.deleteVinylRecord).toBeDefined();
    expect(useCases.findVinylRecord).toBeDefined();
    expect(useCases.findAllVinylRecords).toBeDefined();
  });
});
