export class LocationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocationException';
  }
}

export class CountryNotFoundException extends LocationException {
  constructor(countryId?: string) {
    if (countryId) {
      super(`Country with ID ${countryId} not found.`);
    } else {
      super('No countries found.');
    }
    this.name = 'CountryNotFoundException';
  }
}

export class ProvinceNotFoundException extends LocationException {
  constructor(provinceId?: string) {
    if (provinceId) {
      super(`Province with ID ${provinceId} not found.`);
    } else {
      super('No provinces found.');
    }
    this.name = 'ProvinceNotFoundException';
  }
}

export class CantonNotFoundException extends LocationException {
  constructor(cantonId?: string) {
    if (cantonId) {
      super(`Canton with ID ${cantonId} not found.`);
    } else {
      super('No cantons found.');
    }
    this.name = 'CantonNotFoundException';
  }
}

export class ParishNotFoundException extends LocationException {
  constructor(parishId?: string) {
    if (parishId) {
      super(`Parish with ID ${parishId} not found.`);
    } else {
      super('No parishes found.');
    }
    this.name = 'ParishNotFoundException';
  }
}

export class ParishTypeNotFoundException extends LocationException {
  constructor(parishTypeId?: string) {
    if (parishTypeId) {
      super(`Parish Type with ID ${parishTypeId} not found.`);
    } else {
      super('No parish types found.');
    }
    this.name = 'ParishTypeNotFoundException';
  }
}
