import { UpdateVinylRecord } from '../../../domain/use-cases/UpdateVinylRecord';
import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterVinylRecord';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('UpdateVinylRecord', () => {
  beforeEach(() => {
    MockVinylRecordRepository.getInstance().reset();
  });
  it('should update a vinyl record', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const updateVinylRecord = new UpdateVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
      ownerId: 'user-1',
    });

    const updatedRecord = await updateVinylRecord.execute({
      id: record.id,
      album: 'The White Album',
    });

    expect(updatedRecord.album.value).toBe('The White Album');
    expect(updatedRecord.ownerId).toBe('user-1');
  });

  it('should throw an error if the vinyl record is not found', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const updateVinylRecord = new UpdateVinylRecord(vinylRecordRepository);

    await expect(
      updateVinylRecord.execute({
        id: '1',
        album: 'The White Album',
      })
    ).rejects.toThrow('Vinyl record not found');
  });

  it('should not update vinyl record fields if they are not provided', async () => {
    const vinylRecordRepository = MockVinylRecordRepository.getInstance();
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const updateVinylRecord = new UpdateVinylRecord(vinylRecordRepository);

    const record = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
      ownerId: 'user-1',
    });

    const updatedRecord = await updateVinylRecord.execute({
      id: record.id,
    });

    expect(updatedRecord.band.value).toBe('The Beatles');
    expect(updatedRecord.album.value).toBe('Abbey Road');
    expect(updatedRecord.year).toBe(1969);
    expect(updatedRecord.numberOfTracks).toBe(17);
    expect(updatedRecord.photo.url).toBe('https://example.com/abbey-road.jpg');
    expect(updatedRecord.ownerId).toBe('user-1');
  });
});
