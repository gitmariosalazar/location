import { Module } from '@nestjs/common';
import { KafkaServiceModule } from '../../../../../shared/kafka/kafka-service.module';
import { LocationController } from '../../controller/location.controller';
import { DatabaseServicePostgreSQL } from '../../../../../shared/connections/database/postgresql/postgresql.service';
import { LocationPostgreSqlPersistence } from '../../repositories/postgresql/persistence/location.postgresql.persistence';
import { GetCantonsUseCase } from '../../../application/usecases/get-cantons.use-case';
import { GetCountriesUseCase } from '../../../application/usecases/get-countries.use-case';
import { GetParishesUseCase } from '../../../application/usecases/get-parish.use-case';
import { GetProvincesUseCase } from '../../../application/usecases/get-provinces.use-case';

@Module({
  imports: [KafkaServiceModule],
  controllers: [LocationController],
  providers: [
    DatabaseServicePostgreSQL,
    GetCantonsUseCase,
    GetCountriesUseCase,
    GetParishesUseCase,
    GetProvincesUseCase,
    {
      provide: 'LocationRepository',
      useClass: LocationPostgreSqlPersistence,
    },
  ],
  exports: [],
})
export class PostgresqlLocationModule {}
