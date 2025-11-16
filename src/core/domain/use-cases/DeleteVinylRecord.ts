import { IVinylRecordRepository } from '../repositories/IVinylRecordRepository';

export class DeleteVinylRecord {
  constructor(private readonly vinylRecordRepository: IVinylRecordRepository) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = params;

    const record = await this.vinylRecordRepository.findById(id);

    if (!record) {
      throw new Error('Vinyl record not found');
    }

    await this.vinylRecordRepository.delete(id);
  }
}
