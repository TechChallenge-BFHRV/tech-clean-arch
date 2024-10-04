import { IUseCase } from '../usecase';
import { ItemRepository } from '../../../adapters/repositories/item.repository';
import { Item } from '../../entities/item.entity';
import { ItemCategory } from '../../entities/item-categories.entity';
import { Injectable } from '@nestjs/common';
import { ItemDTO } from '../../../pkg/dtos/item.dto';
import { ItemMapper } from '../../../adapters/mappers/item.mapper';

@Injectable()
export class GetItemsPerCategoryUseCase implements IUseCase<Item[]> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(category: ItemCategory): Promise<ItemDTO[]> {
    const items = await this.itemRepository.getItemsPerCategory(category);
    return items.map((x) => ItemMapper.toDTO(x));
  }
}
