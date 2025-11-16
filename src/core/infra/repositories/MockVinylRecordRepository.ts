import { IVinylRecordRepository } from '../../domain/repositories/IVinylRecordRepository';
import { VinylRecord } from '../../domain/entities/VinylRecord';
import { Name } from '../../domain/value-objects/Name';
import { Photo } from '../../domain/value-objects/Photo';

export class MockVinylRecordRepository implements IVinylRecordRepository {
  private static instance: MockVinylRecordRepository;
  private records: VinylRecord[] = [{
    id: 'vinyl-1',
    band: Name.create('ACDC'),
    album: Name.create('Back In Black'),
    numberOfTracks: 10,
    year: 1980,
    ownerId: 'user-1',
    photo: Photo.create('https://www')
  }];

  private constructor() {}

  public static getInstance(): MockVinylRecordRepository {
    if (!MockVinylRecordRepository.instance) {
      MockVinylRecordRepository.instance = new MockVinylRecordRepository();
    }
    return MockVinylRecordRepository.instance;
  }

  async save(record: VinylRecord): Promise<void> {
    this.records.push(record);
  }

  async findById(id: string): Promise<VinylRecord | null> {
    return this.records.find(record => record.id === id) || null;
  }

  async findAll(): Promise<VinylRecord[]> {
    return this.records;
  }

  async update(record: VinylRecord): Promise<void> {
    const recordIndex = this.records.findIndex(r => r.id === record.id);
    if (recordIndex !== -1) {
      this.records[recordIndex] = record;
    }
  }

  async delete(id: string): Promise<void> {
    this.records = this.records.filter(record => record.id !== id);
  }

  public reset(): void {
    this.records = [];
  }
}
