import { VinylRecord } from '../entities/VinylRecord';
import { IVinylRecordRepository } from '../repositories/IVinylRecordRepository';

export class FindVinylRecord {
  constructor(private readonly vinylRecordRepository: IVinylRecordRepository) {}

  async execute(params: { id: string }): Promise<VinylRecord | null> {
    return this.vinylRecordRepository.findById(params.id);
  }
}
