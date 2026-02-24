import { Inject, Injectable } from '@nestjs/common';
import { InterfaceLocationRepository } from '../../domain/contracts/location.interface.repository';
import { ParishNotFoundException } from '../../domain/exceptions/location.exception';
import { ParishResponse } from '../../domain/schemas/dto/response/location.response';

@Injectable()
export class GetParishesUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: InterfaceLocationRepository,
  ) {}

  async getAll(): Promise<ParishResponse[]> {
    const parishes = await this.locationRepository.getAllParishes();
    if (!parishes || parishes.length === 0) {
      throw new ParishNotFoundException();
    }
    return parishes;
  }

  async getById(parishId: string): Promise<ParishResponse> {
    const parish = await this.locationRepository.getParishById(parishId);
    if (!parish) {
      throw new ParishNotFoundException(parishId);
    }
    return parish;
  }

  async getByName(parishName: string): Promise<ParishResponse> {
    const parish = await this.locationRepository.getParishByName(parishName);
    if (!parish) {
      throw new ParishNotFoundException(parishName);
    }
    return parish;
  }

  async getByCantonId(cantonId: string): Promise<ParishResponse[]> {
    const parishes =
      await this.locationRepository.getParishesByCanton(cantonId);
    if (!parishes || parishes.length === 0) {
      throw new ParishNotFoundException(
        `No parishes found for canton ID ${cantonId}`,
      );
    }
    return parishes;
  }
}
