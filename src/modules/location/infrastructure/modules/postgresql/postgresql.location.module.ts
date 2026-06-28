import { Module } from '@nestjs/common';
import { KafkaServiceModule } from '../../../../../shared/kafka/kafka-service.module';
import { LocationController } from '../../controller/location.controller';
import { LocationPostgreSqlPersistence } from '../../repositories/postgresql/persistence/location.postgresql.persistence';
import { GetCantonsUseCase } from '../../../application/usecases/get-cantons.use-case';
import { GetCountriesUseCase } from '../../../application/usecases/get-countries.use-case';
import { GetParishesUseCase } from '../../../application/usecases/get-parish.use-case';
import { GetProvincesUseCase } from '../../../application/usecases/get-provinces.use-case';
import { DatabasePersistenceModule } from '../../../../../shared/connections/database/database-persistence.module';
import { GetCenterLocationUseCase } from '../../../application/usecases/get-center-location.use-case';

@Module({
  imports: [KafkaServiceModule, DatabasePersistenceModule],
  controllers: [LocationController],
  providers: [
    GetCantonsUseCase,
    GetCountriesUseCase,
    GetParishesUseCase,
    GetProvincesUseCase,
    GetCenterLocationUseCase,
    {
      provide: 'LocationRepository',
      useClass: LocationPostgreSqlPersistence,
    },
  ],
  exports: [],
})
export class PostgresqlLocationModule {}
