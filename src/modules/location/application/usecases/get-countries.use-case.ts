import { Inject, Injectable } from '@nestjs/common';
import { InterfaceLocationRepository } from '../../domain/contracts/location.interface.repository';
import { CountryResponse } from '../../domain/schemas/dto/response/location.response';
import { CountryNotFoundException } from '../../domain/exceptions/location.exception';

@Injectable()
export class GetCountriesUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: InterfaceLocationRepository,
  ) {}

  async getAll(): Promise<CountryResponse[]> {
    const countries = await this.locationRepository.getAllCountries();

    if (!countries || countries.length === 0) {
      throw new CountryNotFoundException();
    }

    return countries;
  }

  async getById(countryId: string): Promise<CountryResponse> {
    const country = await this.locationRepository.getCountryById(countryId);

    if (!country) {
      throw new CountryNotFoundException(countryId);
    }

    return country;
  }

  async getByName(countryName: string): Promise<CountryResponse> {
    const country = await this.locationRepository.getCountryByName(countryName);

    if (!country) {
      throw new CountryNotFoundException(countryName);
    }

    return country;
  }
}
