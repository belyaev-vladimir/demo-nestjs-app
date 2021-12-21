import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMainPageInfo(): string {
    return 'This is "Catalog API" example.';
  }
}
