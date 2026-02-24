import {
  CantonResponse,
  CountryResponse,
  ParishResponse,
  ParishTypeResponse,
  ProvinceResponse,
} from '../schemas/dto/response/location.response';

export interface InterfaceLocationRepository {
  getProvincesByCountry(countryId: string): Promise<ProvinceResponse[]>;
  getCantonsByProvince(provinceId: string): Promise<CantonResponse[]>;
  getParishesByCanton(cantonId: string): Promise<ParishResponse[]>;
  getParishTypes(): Promise<ParishTypeResponse[]>;

  getProvinceById(provinceId: string): Promise<ProvinceResponse>;
  getCantonById(cantonId: string): Promise<CantonResponse>;
  getParishById(parishId: string): Promise<ParishResponse>;
  getParishTypeById(parishTypeId: string): Promise<ParishTypeResponse>;
  getCountryById(countryId: string): Promise<CountryResponse>;

  // Métodos adicionales para obtener por nombre
  getCountryByName(countryName: string): Promise<CountryResponse>;
  getProvinceByName(provinceName: string): Promise<ProvinceResponse>;
  getCantonByName(cantonName: string): Promise<CantonResponse>;
  getParishByName(parishName: string): Promise<ParishResponse>;
  getParishTypeByName(parishTypeName: string): Promise<ParishTypeResponse>;

  // Métodos para obtener todas las entidades
  getAllCountries(): Promise<CountryResponse[]>;
  getAllProvinces(): Promise<ProvinceResponse[]>;
  getAllCantons(): Promise<CantonResponse[]>;
  getAllParishes(): Promise<ParishResponse[]>;
  getAllParishTypes(): Promise<ParishTypeResponse[]>;
}
