import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';
import { VinylRecord } from '../../../domain/entities/VinylRecord';
import { Name } from '../../../domain/value-objects/Name';
import { Photo } from '../../../domain/value-objects/Photo';

describe('MockVinylRecordRepository', () => {
  beforeEach(() => {
    MockVinylRecordRepository.getInstance().reset();
  });
  it('should not throw when updating a non-existent vinyl record', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const vinylRecord = VinylRecord.create(
      '1',
      Name.create('The Beatles'),
      Name.create('Abbey Road'),
      1969,
      17,
      Photo.create('https://example.com/abbey-road.jpg')
    );

    await expect(vinylRecordRepository.update(vinylRecord)).resolves.not.toThrow();
  });
});
