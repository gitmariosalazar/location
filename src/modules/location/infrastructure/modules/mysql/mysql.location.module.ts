import { Module } from '@nestjs/common';
import { KafkaServiceModule } from '../../../../../shared/kafka/kafka-service.module';
import { LocationController } from '../../controller/location.controller';
import { GetCantonsUseCase } from '../../../application/usecases/get-cantons.use-case';
import { GetCountriesUseCase } from '../../../application/usecases/get-countries.use-case';
import { GetParishesUseCase } from '../../../application/usecases/get-parish.use-case';
import { GetProvincesUseCase } from '../../../application/usecases/get-provinces.use-case';
import { LocationMySqlPersistence } from '../../repositories/mysql/persistence/location.mysql.persistence';
import { DatabasePersistenceModule } from '../../../../../shared/connections/database/database-persistence.module';

@Module({
  imports: [KafkaServiceModule, DatabasePersistenceModule],
  controllers: [LocationController],
  providers: [
    GetCantonsUseCase,
    GetCountriesUseCase,
    GetParishesUseCase,
    GetProvincesUseCase,
    {
      provide: 'LocationRepository',
      useClass: LocationMySqlPersistence,
    },
  ],
  exports: [],
})
export class MySQLLocationModule {}
