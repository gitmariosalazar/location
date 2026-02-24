import { Controller } from '@nestjs/common';
import { GetCountriesUseCase } from '../../application/usecases/get-countries.use-case';
import { GetProvincesUseCase } from '../../application/usecases/get-provinces.use-case';
import { GetCantonsUseCase } from '../../application/usecases/get-cantons.use-case';
import { GetParishesUseCase } from '../../application/usecases/get-parish.use-case';
import { LocationException } from '../../domain/exceptions/location.exception';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import { statusCode } from '../../../../settings/environments/status-code';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('location')
export class LocationController {
  constructor(
    private readonly getCountriesUseCase: GetCountriesUseCase,
    private readonly getProvincesUseCase: GetProvincesUseCase,
    private readonly getCantonsUseCase: GetCantonsUseCase,
    private readonly getParishesUseCase: GetParishesUseCase,
  ) {}

  private handleException(error: any): never {
    if (error instanceof LocationException) {
      throw new RpcException({
        statusCode: statusCode.BAD_REQUEST,
        message: error.message,
      });
    }
    if (error instanceof RpcException) throw error;

    throw new RpcException({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      message: error.message || 'Internal server error',
    });
  }

  // Countries

  @MessagePattern('location.get-countries')
  async getCountries() {
    try {
      return await this.getCountriesUseCase.getAll();
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-country-by-id')
  async getCountryById(@Payload() countryId: string) {
    try {
      return await this.getCountriesUseCase.getById(countryId);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-country-by-name')
  async getCountryByName(@Payload() countryName: string) {
    try {
      return await this.getCountriesUseCase.getByName(countryName);
    } catch (error) {
      this.handleException(error);
    }
  }

  // Provinces

  @MessagePattern('location.get-provinces')
  async getProvinces() {
    try {
      return await this.getProvincesUseCase.getAll();
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-province-by-name')
  async getProvinceByName(@Payload() provinceName: string) {
    try {
      return await this.getProvincesUseCase.getByName(provinceName);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-province-by-id')
  async getProvinceById(@Payload() provinceId: string) {
    try {
      return await this.getProvincesUseCase.getById(provinceId);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-provinces-by-country-id')
  async getProvincesByCountryId(@Payload() countryId: string) {
    try {
      return await this.getProvincesUseCase.getByCountryId(countryId);
    } catch (error) {
      this.handleException(error);
    }
  }

  // Cantons

  @MessagePattern('location.get-cantons')
  async getCantons() {
    try {
      return await this.getCantonsUseCase.getAll();
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-canton-by-id')
  async getCantonById(@Payload() cantonId: string) {
    try {
      return await this.getCantonsUseCase.getById(cantonId);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-canton-by-name')
  async getCantonByName(@Payload() cantonName: string) {
    try {
      return await this.getCantonsUseCase.getByName(cantonName);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-cantons-by-province-id')
  async getCantonsByProvinceId(@Payload() provinceId: string) {
    try {
      return await this.getCantonsUseCase.getByProvinceId(provinceId);
    } catch (error) {
      this.handleException(error);
    }
  }

  // Parishes

  @MessagePattern('location.get-parishes')
  async getParishes() {
    try {
      return await this.getParishesUseCase.getAll();
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-parish-by-name')
  async getParishByName(@Payload() parishName: string) {
    try {
      return await this.getParishesUseCase.getByName(parishName);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-parishes-by-canton-id')
  async getParishesByCantonId(@Payload() cantonId: string) {
    try {
      return await this.getParishesUseCase.getByCantonId(cantonId);
    } catch (error) {
      this.handleException(error);
    }
  }

  @MessagePattern('location.get-parish-by-id')
  async getParishById(@Payload() parishId: string) {
    try {
      return await this.getParishesUseCase.getById(parishId);
    } catch (error) {
      this.handleException(error);
    }
  }
}
