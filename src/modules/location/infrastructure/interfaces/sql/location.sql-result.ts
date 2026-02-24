export interface CountrySqlResult {
  country_id: string;
  country_name: string;
}

export interface ProvinceSqlResult {
  province_id: string;
  province_name: string;
  country_id: string;
}

export interface CantonSqlResult {
  canton_id: string;
  canton_name: string;
  province_id: string;
}

export interface ParishTypeSqlResult {
  parish_type_id: string;
  parish_type_name: string;
}

export interface ParishSqlResult {
  parish_id: string;
  parish_name: string;
  canton_id: string;
  parish_type_id: string;
}
