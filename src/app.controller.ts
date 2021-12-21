import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get info application info text' })
  getMainPage(): string {
    return this.appService.getMainPageInfo();
  }
}
