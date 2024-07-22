import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import { CreateItemUseCase } from 'src/core/usecases/items/create-item.usecase';
import { GetItemUseCase } from 'src/core/usecases/items/get-item.usecase';
import { GetItemsPerCategoryUseCase } from 'src/core/usecases/items/get-items-per-cateogry.usecase';
import { ItemDTO } from '../../pkg/dtos/item.dto';

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
    description: 'All items retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Something went wrong retrieving the items.',
  })
  async getItems() {
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
    const categoryItems = await this.getItemsPerCategoryUseCase.execute(category);
    return {
      statusCode: HttpStatus.OK,
      message: `${category} items retrieved successfully. Total: ${categoryItems.length}`,
      data: categoryItems,
    };
  }
}
