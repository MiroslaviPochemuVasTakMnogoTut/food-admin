import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { User } from './users/entities/user.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { BrandsModule } from './brands/brands.module';
import { CompaniesModule } from './companies/companies.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { RestaurantEmployeesModule } from './restaurant-employees/restaurant-employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 15432,
      username: 'admin',
      password: '123',
      database: 'FoodBase',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    RestaurantsModule,
    BrandsModule,
    CompaniesModule,
    OrdersModule,
    ItemsModule,
    RestaurantEmployeesModule,
    // RestEmpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
