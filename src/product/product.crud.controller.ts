import { Controller, Logger } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ProductCrudService } from './product.crud.service';
import { Product } from './entities/product.entity';
import { Crud } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud';

@Crud({
  model: { type: Product },
  query: {
    alwaysPaginate: true,
  },
})
@Controller('product.crud')
@ApiTags('product.crud')
@ApiExtraModels(Product)
export class ProductCrudController implements CrudController<Product> {
  constructor(
    public service: ProductCrudService,
    private readonly _logger: Logger,
  ) {}
}
