import { Module } from '@nestjs/common';
import { PostgresqlLocationModule } from '../../modules/location/infrastructure/modules/postgresql/postgresql.location.module';

@Module({
  imports: [PostgresqlLocationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppLocationGlobalModulesUsingPostgreSQL {}
