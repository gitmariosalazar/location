import {
  CantonResponse,
  CountryResponse,
  ParishResponse,
  ParishTypeResponse,
  ProvinceResponse,
} from '../../../domain/schemas/dto/response/location.response';
import {
  CantonSqlResult,
  CountrySqlResult,
  ParishSqlResult,
  ParishTypeSqlResult,
  ProvinceSqlResult,
} from '../../interfaces/sql/location.sql-result';

export class SqlLocationAdapter {
  static toCountryResponse(sqlResult: CountrySqlResult): CountryResponse {
    return {
      countryId: sqlResult.country_id,
      countryName: sqlResult.country_name,
    };
  }

  static toProvinceResponse(sqlResult: ProvinceSqlResult): ProvinceResponse {
    return {
      provinceId: sqlResult.province_id,
      provinceName: sqlResult.province_name,
      countryId: sqlResult.country_id,
    };
  }

  static toCantonResponse(sqlResult: CantonSqlResult): CantonResponse {
    return {
      cantonId: sqlResult.canton_id,
      cantonName: sqlResult.canton_name,
      provinceId: sqlResult.province_id,
    };
  }

  static toParishTypeResponse(
    sqlResult: ParishTypeSqlResult,
  ): ParishTypeResponse {
    return {
      parishTypeId: sqlResult.parish_type_id,
      parishTypeName: sqlResult.parish_type_name,
    };
  }

  static toParishResponse(sqlResult: ParishSqlResult): ParishResponse {
    return {
      parishId: sqlResult.parish_id,
      parishName: sqlResult.parish_name,
      cantonId: sqlResult.canton_id,
      parishTypeId: sqlResult.parish_type_id,
    };
  }
}
