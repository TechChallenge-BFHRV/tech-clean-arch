import { Body, Controller, Get, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemCategory } from '../../core/entities/item-categories.entity';
import { CreateItemUseCase } from '../../core/usecases/items/create-item.usecase';
import { GetItemUseCase } from '../../core/usecases/items/get-item.usecase';
import { GetItemsPerCategoryUseCase } from '../../core/usecases/items/get-items-per-category.usecase';
import { ItemDTO } from '../../pkg/dtos/item.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(
    @Inject('ITEMS_MICROSERVICE') private readonly itemMicroserviceClient: ClientProxy,
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemUseCase: GetItemUseCase,
    private readonly getItemsPerCategoryUseCase: GetItemsPerCategoryUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async createItem(@Body() item: ItemDTO) {
    const res = this.itemMicroserviceClient.send('create_item', { ...item });
    const val = await lastValueFrom(res);
    return val;
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All items retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Something went wrong retrieving the items.',
  })
  async getItems() {
    const req = this.itemMicroserviceClient.send('get_all_items', {});
    const val = await lastValueFrom(req);
    console.log('val is: ', val);
    const allItems = await this.getItemUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: 'All items retrieved successfully',
      data: allItems,
    };
  }

  @Get('category/:itemCategory')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category items retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category items not found.',
  })
  @ApiParam({
    name: 'itemCategory',
    enum: ItemCategory,
  })
  async getItemsPerCategory(@Param('itemCategory') category: ItemCategory) {
    const categoryItems =
      await this.getItemsPerCategoryUseCase.execute(category);
    return {
      statusCode: HttpStatus.OK,
      message: `${category} items retrieved successfully. Total: ${categoryItems.length}`,
      data: categoryItems,
    };
  }
}
