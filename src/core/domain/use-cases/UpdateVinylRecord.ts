import { VinylRecord } from '../entities/VinylRecord';
import { IVinylRecordRepository } from '../repositories/IVinylRecordRepository';
import { Name } from '../value-objects/Name';
import { Photo } from '../value-objects/Photo';

export class UpdateVinylRecord {
  constructor(private readonly vinylRecordRepository: IVinylRecordRepository) {}

  async execute(params: {
    id: string;
    band?: string;
    album?: string;
    year?: number;
    numberOfTracks?: number;
    photoUrl?: string;
  }): Promise<VinylRecord> {
    const { id, band, album, year, numberOfTracks, photoUrl } = params;

    const record = await this.vinylRecordRepository.findById(id);

    if (!record) {
      throw new Error('Vinyl record not found');
    }

    const newBand = band ? Name.create(band) : record.band;
    const newAlbum = album ? Name.create(album) : record.album;
    const newYear = year || record.year;
    const newNumberOfTracks = numberOfTracks || record.numberOfTracks;
    const newPhoto = photoUrl ? Photo.create(photoUrl) : record.photo;

    const updatedRecord = VinylRecord.create(
      record.id,
      newBand,
      newAlbum,
      newYear,
      newNumberOfTracks,
      newPhoto,
      record.ownerId
    );

    await this.vinylRecordRepository.update(updatedRecord);

    return updatedRecord;
  }
}
