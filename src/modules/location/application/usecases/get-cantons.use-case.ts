import { Inject, Injectable } from '@nestjs/common';
import { InterfaceLocationRepository } from '../../domain/contracts/location.interface.repository';
import { CantonResponse } from '../../domain/schemas/dto/response/location.response';
import { CantonNotFoundException } from '../../domain/exceptions/location.exception';

@Injectable()
export class GetCantonsUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: InterfaceLocationRepository,
  ) {}

  async getAll(): Promise<CantonResponse[]> {
    const cantons = await this.locationRepository.getAllCantons();
    if (!cantons || cantons.length === 0) {
      throw new CantonNotFoundException();
    }
    return cantons;
  }

  async getById(cantonId: string): Promise<CantonResponse> {
    const canton = await this.locationRepository.getCantonById(cantonId);
    if (!canton) {
      throw new CantonNotFoundException(cantonId);
    }
    return canton;
  }

  async getByName(cantonName: string): Promise<CantonResponse> {
    const canton = await this.locationRepository.getCantonByName(cantonName);
    if (!canton) {
      throw new CantonNotFoundException(cantonName);
    }
    return canton;
  }

  async getByProvinceId(provinceId: string): Promise<CantonResponse[]> {
    const cantons =
      await this.locationRepository.getCantonsByProvince(provinceId);
    if (!cantons || cantons.length === 0) {
      throw new CantonNotFoundException(
        `No cantons found for province ID ${provinceId}`,
      );
    }
    return cantons;
  }
}
