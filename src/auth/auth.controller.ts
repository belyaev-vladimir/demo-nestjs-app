import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponse } from '../user/user.interface';
import { LoginDTO } from '../user/dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDTO })
  async login(
    @Body(ValidationPipe) credentials: LoginDTO,
  ): Promise<AuthResponse> {
    return this.authService.login(credentials);
  }
}
