import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor() {
    super(`Product with supplied id was not found!`);
  }
}
