import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import { CreateItemUseCase } from 'src/dashboard/application/usecases/items/create-item.usecase';
import { GetItemUseCase } from 'src/dashboard/application/usecases/items/get-item.usecase';
import { GetItemsPerCategoryUseCase } from 'src/dashboard/application/usecases/items/get-items-per-cateogry.usecase';
import { ItemDTO } from '../dto/item.dto';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(
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
    const itemCreated = await this.createItemUseCase.execute(item);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Item created successfully',
      data: itemCreated,
    };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Item not found.',
  })
  async getItems() {
    const item = await this.getItemUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: 'Item retrieved successfully',
      data: item,
    };
  }

  @Get('category/:itemCategory')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Items retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Items not found.',
  })
  @ApiParam({
    name: 'itemCategory',
    enum: ItemCategory,
  })
  async getItemsPerCategory(@Param('itemCategory') category: ItemCategory) {
    const item = await this.getItemsPerCategoryUseCase.execute(category);
    return {
      statusCode: HttpStatus.OK,
      message: 'Items retrieved successfully',
      data: item,
    };
  }
}
