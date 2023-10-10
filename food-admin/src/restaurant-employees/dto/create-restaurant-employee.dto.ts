// import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
// import { User } from 'src/users/entities/user.entity';

export class CreateRestaurantEmployeeDto {
  readonly employee: number;

  readonly restaurant: number;

  readonly role: number;
}
