import { Inject, Injectable } from '@nestjs/common';
import { CenterLocationResponse } from '../../domain/schemas/dto/response/location.response';
import { InterfaceLocationRepository } from '../../domain/contracts/location.interface.repository';

@Injectable()
export class GetCenterLocationUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: InterfaceLocationRepository,
  ) {}

  async getCenterLocationIncidents(): Promise<CenterLocationResponse> {
    const centerLocation =
      await this.locationRepository.getCenterLLocationIncidents();
    return centerLocation;
  }
}
