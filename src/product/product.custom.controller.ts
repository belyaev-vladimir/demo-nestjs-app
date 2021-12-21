import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProductCustomService } from './product.custom.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SortDirection } from '../common/models/pagination/sort-direction.enum';
import { Page } from '../common/models/pagination/page.model';
import { PageRequest } from '../common/models/pagination/page-request.model';
import { AuthGuard } from '@nestjs/passport';
import { SortProductField } from './dto/sort-product-field.enum.dto';

@Controller('product.custom')
@ApiTags('product.custom')
@ApiExtraModels(Page, Product)
export class ProductCustomController {
  constructor(
    private readonly _productService: ProductCustomService,
    private readonly _logger: Logger,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new product instance' })
  @ApiResponse({ status: 201, description: 'When Ok!' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async create(@Body() productToCreate: CreateProductDto): Promise<Product> {
    return this._productService.createProduct(productToCreate);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of products with pagination' })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(Page) },
        {
          properties: {
            elements: {
              type: 'array',
              items: { $ref: getSchemaPath(Product) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiQuery({ name: 'sortDir', enum: SortDirection })
  @ApiQuery({ name: 'sortCol', enum: SortProductField })
  public async getAllProducts(
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortCol') sortCol: string = SortProductField.IDENTIFIER,
    @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
  ): Promise<Page<Product>> {
    try {
      const pageRequest: PageRequest = PageRequest.from(
        pageNumber,
        pageSize,
        sortCol,
        sortDir,
      );
      return this._productService.getAllUsersByPage(pageRequest);
    } catch (error) {
      this._logger.error(error);
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Search product by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record of product',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: number): Promise<Product> {
    try {
      return this._productService.getProductById(id);
    } catch (error) {
      this._logger.error(error);
    }
  }

  @ApiBearerAuth()
  @Put()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update product instance by id' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public async updateUserById(
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return this._productService.updateProductById(updateProductDto);
    } catch (error) {
      this._logger.error(error);
    }
  }
}
