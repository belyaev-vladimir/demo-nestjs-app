import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDTO } from '../user/dto/login.dto';
import { AuthResponse } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
  }

  async login({ email, password }: LoginDTO): Promise<AuthResponse> {
    try {
      const user = await this._userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        //todo - return custom Unauthorized Error
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return { ...user.toJSON(), token };

    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
