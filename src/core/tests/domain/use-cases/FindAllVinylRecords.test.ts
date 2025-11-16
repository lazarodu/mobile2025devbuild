import { FindAllVinylRecords } from '../../../domain/use-cases/FindAllVinylRecords';
import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterVinylRecord';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('FindAllVinylRecords', () => {
  beforeEach(() => {
    MockVinylRecordRepository.getInstance().reset();
  });
  it('should find all vinyl records', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const findAllVinylRecords = new FindAllVinylRecords(vinylRecordRepository);

    await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
      ownerId: 'user-1',
    });

    await registerVinylRecord.execute({
      band: 'Queen',
      album: 'A Night at the Opera',
      year: 1975,
      numberOfTracks: 12,
      photoUrl: 'https://example.com/a-night-at-the-opera.jpg',
      ownerId: 'user-2',
    });

    const records = await findAllVinylRecords.execute();

    expect(records).toHaveLength(2);
  });
});
