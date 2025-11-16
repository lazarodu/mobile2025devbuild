import { DeleteVinylRecord } from '../../../domain/use-cases/DeleteVinylRecord';
import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterVinylRecord';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('DeleteVinylRecord', () => {
  beforeEach(() => {
    MockVinylRecordRepository.getInstance().reset();
  });
  it('should delete a vinyl record', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const deleteVinylRecord = new DeleteVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
      ownerId: 'user-1',
    });

    await deleteVinylRecord.execute({ id: record.id });

    const foundRecord = await vinylRecordRepository.findById(record.id);

    expect(foundRecord).toBeNull();
  });

  it('should throw an error if the vinyl record is not found', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const deleteVinylRecord = new DeleteVinylRecord(vinylRecordRepository);

    await expect(deleteVinylRecord.execute({ id: '1' })).rejects.toThrow('Vinyl record not found');
  });
});
