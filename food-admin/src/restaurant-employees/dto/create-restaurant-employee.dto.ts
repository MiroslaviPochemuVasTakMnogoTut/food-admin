// import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
// import { User } from 'src/users/entities/user.entity';

import { OmitType } from "@nestjs/swagger";
import { RestaurantEmployee } from "../entities/restaurant-employee.entity";

/* export class CreateRestaurantEmployeeDto {
  readonly employee: number;

  readonly restaurant: number;

  readonly role: number;
}

 */

export class CreateRestaurantEmployeeDto extends OmitType(RestaurantEmployee,['id','employee',"restaurant"]) {

}
