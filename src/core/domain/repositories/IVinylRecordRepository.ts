import { VinylRecord } from '../entities/VinylRecord';

export interface IVinylRecordRepository {
  save(record: VinylRecord): Promise<void>;
  findById(id: string): Promise<VinylRecord | null>;
  findAll(): Promise<VinylRecord[]>;
  update(record: VinylRecord): Promise<void>;
  delete(id: string): Promise<void>;
}
