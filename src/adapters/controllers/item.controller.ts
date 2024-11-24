import { Body, Controller, Get, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemCategory } from '../../core/entities/item-categories.entity';
import { ItemDTO } from '../../pkg/dtos/item.dto';
import { ExternalItemService } from '../../external/integrations/external-item-service';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ExternalItemService,
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
    return this.itemService.createItem(item);
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
    return this.itemService.getItems();
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
    return this.itemService.getItemsPerCategory(category);
  }

  @Get(':itemId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item successfully retrieved by ID.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Item not found.',
  })
  @ApiParam({
    name: 'itemId'
  })
  async getItemById(@Param('itemId') id: number) {
    return this.itemService.getItemById(id);
  }
}
