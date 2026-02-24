import { Injectable } from '@nestjs/common';
import { InterfaceLocationRepository } from '../../../../domain/contracts/location.interface.repository';
import { DatabaseServicePostgreSQL } from '../../../../../../shared/connections/database/postgresql/postgresql.service';
import {
  CantonResponse,
  CountryResponse,
  ParishResponse,
  ParishTypeResponse,
  ProvinceResponse,
} from '../../../../domain/schemas/dto/response/location.response';
import {
  CantonSqlResult,
  CountrySqlResult,
  ParishSqlResult,
  ParishTypeSqlResult,
  ProvinceSqlResult,
} from '../../../interfaces/sql/location.sql-result';
import { SqlLocationAdapter } from '../../../adapters/sql/location.sql-adapter';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from '../../../../../../settings/environments/status-code';

@Injectable()
export class LocationPostgreSqlPersistence implements InterfaceLocationRepository {
  constructor(private readonly postgreSqlService: DatabaseServicePostgreSQL) {}

  async getAllCountries(): Promise<CountryResponse[]> {
    try {
      const query: string = `SELECT pais_id AS "country_id", nombre AS "country_name"
      FROM pais;`;

      const result: CountrySqlResult[] =
        await this.postgreSqlService.query<CountrySqlResult>(query);

      const countries: CountryResponse[] = result.map((row) =>
        SqlLocationAdapter.toCountryResponse(row),
      );

      if (!countries || countries.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No countries found`,
        });
      }

      return countries;
    } catch (error) {
      throw error;
    }
  }

  async getAllProvinces(): Promise<ProvinceResponse[]> {
    try {
      const query: string = `SELECT provincia_id AS "province_id", nombre AS "province_name", pais_id AS "country_id"
      FROM provincia;`;

      const result: ProvinceSqlResult[] =
        await this.postgreSqlService.query<ProvinceSqlResult>(query);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No provinces found`,
        });
      }

      const provinces: ProvinceResponse[] = result.map((row) =>
        SqlLocationAdapter.toProvinceResponse(row),
      );
      return provinces;
    } catch (error) {
      throw error;
    }
  }

  async getAllCantons(): Promise<CantonResponse[]> {
    try {
      const query: string = `SELECT canton_id AS "canton_id", nombre AS "canton_name", provincia_id AS "province_id"
      FROM canton;`;

      const result: CantonSqlResult[] =
        await this.postgreSqlService.query<CantonSqlResult>(query);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No cantons found`,
        });
      }

      const cantons: CantonResponse[] = result.map((row) =>
        SqlLocationAdapter.toCantonResponse(row),
      );
      return cantons;
    } catch (error) {
      throw error;
    }
  }

  async getAllParishes(): Promise<ParishResponse[]> {
    try {
      const query: string = `SELECT parroquia_id AS "parish_id", nombre AS "parish_name", canton_id AS "canton_id", parroquia.tipo_parroquia_id AS "parish_type_id"
      FROM parroquia;`;

      const result: ParishSqlResult[] =
        await this.postgreSqlService.query<ParishSqlResult>(query);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No parishes found`,
        });
      }

      const parishes: ParishResponse[] = result.map((row) =>
        SqlLocationAdapter.toParishResponse(row),
      );
      return parishes;
    } catch (error) {
      throw error;
    }
  }

  async getAllParishTypes(): Promise<ParishTypeResponse[]> {
    try {
      const query: string = `SELECT tipo_parroquia_id AS "parish_type_id", nombre AS "parish_type_name"
      FROM tipo_parroquia;`;

      const result: ParishTypeSqlResult[] =
        await this.postgreSqlService.query<ParishTypeSqlResult>(query);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No parish types found`,
        });
      }

      const parishTypes: ParishTypeResponse[] = result.map((row) =>
        SqlLocationAdapter.toParishTypeResponse(row),
      );
      return parishTypes;
    } catch (error) {
      throw error;
    }
  }

  async getCantonById(cantonId: string): Promise<CantonResponse> {
    try {
      const query: string = `SELECT canton_id AS "canton_id", nombre AS "canton_name", provincia_id AS "province_id"
      FROM canton
      WHERE canton_id = $1;`;

      const result: CantonSqlResult[] =
        await this.postgreSqlService.query<CantonSqlResult>(query, [cantonId]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Canton with ID ${cantonId} not found`,
        });
      }

      const canton: CantonResponse = SqlLocationAdapter.toCantonResponse(
        result[0],
      );
      return canton;
    } catch (error) {
      throw error;
    }
  }

  async getCantonByName(cantonName: string): Promise<CantonResponse> {
    try {
      const query: string = `SELECT canton_id AS "canton_id", nombre AS "canton_name", provincia_id AS "province_id"
      FROM canton
      WHERE nombre = $1;`;

      const result: CantonSqlResult[] =
        await this.postgreSqlService.query<CantonSqlResult>(query, [
          cantonName,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Canton with name ${cantonName} not found`,
        });
      }

      const canton: CantonResponse = SqlLocationAdapter.toCantonResponse(
        result[0],
      );
      return canton;
    } catch (error) {
      throw error;
    }
  }

  async getCantonsByProvince(provinceId: string): Promise<CantonResponse[]> {
    try {
      const query: string = `SELECT canton_id AS "canton_id", nombre AS "canton_name", provincia_id AS "province_id"
      FROM canton
      WHERE provincia_id = $1;`;

      const result: CantonSqlResult[] =
        await this.postgreSqlService.query<CantonSqlResult>(query, [
          provinceId,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No cantons found for province ID ${provinceId}`,
        });
      }

      const cantons: CantonResponse[] = result.map((row) =>
        SqlLocationAdapter.toCantonResponse(row),
      );
      return cantons;
    } catch (error) {
      throw error;
    }
  }

  async getCountryById(countryId: string): Promise<CountryResponse> {
    try {
      const query: string = `SELECT pais_id AS "country_id", nombre AS "country_name"
      FROM pais
      WHERE pais_id = $1;`;

      const result: CountrySqlResult[] =
        await this.postgreSqlService.query<CountrySqlResult>(query, [
          countryId,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Country with ID ${countryId} not found`,
        });
      }

      const country: CountryResponse = SqlLocationAdapter.toCountryResponse(
        result[0],
      );
      return country;
    } catch (error) {
      throw error;
    }
  }

  async getCountryByName(countryName: string): Promise<CountryResponse> {
    try {
      const query: string = `SELECT pais_id AS "country_id", nombre AS "country_name"
      FROM pais
      WHERE nombre = $1;`;

      const result: CountrySqlResult[] =
        await this.postgreSqlService.query<CountrySqlResult>(query, [
          countryName,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Country with name ${countryName} not found`,
        });
      }

      const country: CountryResponse = SqlLocationAdapter.toCountryResponse(
        result[0],
      );
      return country;
    } catch (error) {
      throw error;
    }
  }

  async getParishById(parishId: string): Promise<ParishResponse> {
    try {
      const query: string = `SELECT parroquia_id AS "parish_id", nombre AS "parish_name", canton_id AS "canton_id", parroquia.tipo_parroquia_id AS "parish_type_id"
      FROM parroquia
      WHERE parroquia_id = $1;`;

      const result: ParishSqlResult[] =
        await this.postgreSqlService.query<ParishSqlResult>(query, [parishId]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Parish with ID ${parishId} not found`,
        });
      }

      const parish: ParishResponse = SqlLocationAdapter.toParishResponse(
        result[0],
      );
      return parish;
    } catch (error) {
      throw error;
    }
  }

  async getParishByName(parishName: string): Promise<ParishResponse> {
    try {
      const query: string = `SELECT parroquia_id AS "parish_id", nombre AS "parish_name", canton_id AS "canton_id", parroquia.tipo_parroquia_id AS "parish_type_id"
      FROM parroquia
      WHERE nombre = $1;`;

      const result: ParishSqlResult[] =
        await this.postgreSqlService.query<ParishSqlResult>(query, [
          parishName,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Parish with name ${parishName} not found`,
        });
      }

      const parish: ParishResponse = SqlLocationAdapter.toParishResponse(
        result[0],
      );
      return parish;
    } catch (error) {
      throw error;
    }
  }

  async getParishTypeById(parishTypeId: string): Promise<ParishTypeResponse> {
    try {
      const query: string = `SELECT tipo_parroquia_id AS "parish_type_id", nombre AS "parish_type_name"
      FROM tipo_parroquia
      WHERE tipo_parroquia_id = $1;`;

      const result: ParishTypeSqlResult[] =
        await this.postgreSqlService.query<ParishTypeSqlResult>(query, [
          parishTypeId,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Parish Type with ID ${parishTypeId} not found`,
        });
      }

      const parishType: ParishTypeResponse =
        SqlLocationAdapter.toParishTypeResponse(result[0]);
      return parishType;
    } catch (error) {
      throw error;
    }
  }
  async getParishTypeByName(
    parishTypeName: string,
  ): Promise<ParishTypeResponse> {
    try {
      const query: string = `SELECT tipo_parroquia_id AS "parish_type_id", nombre AS "parish_type_name"
      FROM tipo_parroquia
      WHERE nombre = $1;`;

      const result: ParishTypeSqlResult[] =
        await this.postgreSqlService.query<ParishTypeSqlResult>(query, [
          parishTypeName,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Parish Type with name ${parishTypeName} not found`,
        });
      }

      const parishType: ParishTypeResponse =
        SqlLocationAdapter.toParishTypeResponse(result[0]);
      return parishType;
    } catch (error) {
      throw error;
    }
  }

  async getParishTypes(): Promise<ParishTypeResponse[]> {
    try {
      const query: string = `SELECT tipo_parroquia_id AS "parish_type_id", nombre AS "parish_type_name"
      FROM tipo_parroquia;`;

      const result: ParishTypeSqlResult[] =
        await this.postgreSqlService.query<ParishTypeSqlResult>(query);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No parish types found`,
        });
      }

      const parishTypes: ParishTypeResponse[] = result.map((row) =>
        SqlLocationAdapter.toParishTypeResponse(row),
      );
      return parishTypes;
    } catch (error) {
      throw error;
    }
  }

  async getParishesByCanton(cantonId: string): Promise<ParishResponse[]> {
    try {
      const query: string = `SELECT parroquia_id AS "parish_id", nombre AS "parish_name", canton_id AS "canton_id", parroquia.tipo_parroquia_id AS "parish_type_id"
      FROM parroquia
      WHERE canton_id = $1;`;

      const result: ParishSqlResult[] =
        await this.postgreSqlService.query<ParishSqlResult>(query, [cantonId]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No parishes found for canton with ID ${cantonId}`,
        });
      }

      const parishes: ParishResponse[] = result.map((row) =>
        SqlLocationAdapter.toParishResponse(row),
      );
      return parishes;
    } catch (error) {
      throw error;
    }
  }

  async getProvinceById(provinceId: string): Promise<ProvinceResponse> {
    try {
      const query: string = `SELECT provincia_id AS "province_id", nombre AS "province_name", pais_id AS "country_id"
      FROM provincia
      WHERE provincia_id = $1;`;

      const result: ProvinceSqlResult[] =
        await this.postgreSqlService.query<ProvinceSqlResult>(query, [
          provinceId,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Province with ID ${provinceId} not found`,
        });
      }

      const province: ProvinceResponse = SqlLocationAdapter.toProvinceResponse(
        result[0],
      );
      return province;
    } catch (error) {
      throw error;
    }
  }

  async getProvinceByName(provinceName: string): Promise<ProvinceResponse> {
    try {
      const query: string = `SELECT provincia_id AS "province_id", nombre AS "province_name", pais_id AS "country_id"
      FROM provincia
      WHERE nombre = $1;`;

      const result: ProvinceSqlResult[] =
        await this.postgreSqlService.query<ProvinceSqlResult>(query, [
          provinceName,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Province with name ${provinceName} not found`,
        });
      }

      const province: ProvinceResponse = SqlLocationAdapter.toProvinceResponse(
        result[0],
      );
      return province;
    } catch (error) {
      throw error;
    }
  }

  async getProvincesByCountry(countryId: string): Promise<ProvinceResponse[]> {
    try {
      const query: string = `SELECT provincia_id AS "province_id", nombre AS "province_name", pais_id AS "country_id"
      FROM provincia
      WHERE pais_id = $1;`;

      const result: ProvinceSqlResult[] =
        await this.postgreSqlService.query<ProvinceSqlResult>(query, [
          countryId,
        ]);

      if (!result || result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No provinces found for country with ID ${countryId}`,
        });
      }

      const provinces: ProvinceResponse[] = result.map((row) =>
        SqlLocationAdapter.toProvinceResponse(row),
      );
      return provinces;
    } catch (error) {
      throw error;
    }
  }
}
