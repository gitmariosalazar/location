import { Inject, Injectable } from '@nestjs/common';
import { ProvinceNotFoundException } from '../../domain/exceptions/location.exception';
import { ProvinceResponse } from '../../domain/schemas/dto/response/location.response';
import { InterfaceLocationRepository } from '../../domain/contracts/location.interface.repository';

@Injectable()
export class GetProvincesUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: InterfaceLocationRepository,
  ) {}

  async getAll(): Promise<ProvinceResponse[]> {
    const provinces = await this.locationRepository.getAllProvinces();

    if (!provinces || provinces.length === 0) {
      throw new ProvinceNotFoundException();
    }

    return provinces;
  }

  async getById(provinceId: string): Promise<ProvinceResponse> {
    const province = await this.locationRepository.getProvinceById(provinceId);

    if (!province) {
      throw new ProvinceNotFoundException(provinceId);
    }

    return province;
  }

  async getByName(provinceName: string): Promise<ProvinceResponse> {
    const province =
      await this.locationRepository.getProvinceByName(provinceName);

    if (!province) {
      throw new ProvinceNotFoundException(provinceName);
    }

    return province;
  }

  async getByCountryId(countryId: string): Promise<ProvinceResponse[]> {
    const provinces =
      await this.locationRepository.getProvincesByCountry(countryId);

    if (!provinces || provinces.length === 0) {
      throw new ProvinceNotFoundException(
        `No provinces found for country ID ${countryId}`,
      );
    }

    return provinces;
  }
}
