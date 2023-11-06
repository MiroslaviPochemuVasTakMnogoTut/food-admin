import { User } from 'src/users/entities/user.entity';

export class Token {
  id: number;

  token: string;

  user: User;
}
