import { VinylRecord } from '../../../domain/entities/VinylRecord';
import { Name } from '../../../domain/value-objects/Name';
import { Photo } from '../../../domain/value-objects/Photo';

describe('VinylRecord', () => {
  it('should create a valid vinyl record', () => {
    const record = VinylRecord.create(
      '1',
      Name.create('The Beatles'),
      Name.create('Abbey Road'),
      1969,
      17,
      Photo.create('https://example.com/abbey-road.jpg'),
      'user-1'
    );

    expect(record.id).toBe('1');
    expect(record.band.value).toBe('The Beatles');
    expect(record.album.value).toBe('Abbey Road');
    expect(record.year).toBe(1969);
    expect(record.numberOfTracks).toBe(17);
    expect(record.photo.url).toBe('https://example.com/abbey-road.jpg');
    expect(record.ownerId).toBe('user-1');
  });
});
