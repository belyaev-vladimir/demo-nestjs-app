import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthPayload } from '../user/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: AuthPayload) {
    const { email } = payload;
    const user = await this._userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
