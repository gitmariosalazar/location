import { Module } from '@nestjs/common';
import { MySQLLocationModule } from '../../modules/location/infrastructure/modules/mysql/mysql.location.module';

@Module({
  imports: [MySQLLocationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppLocationGlobalModulesUsingMySQL {}
