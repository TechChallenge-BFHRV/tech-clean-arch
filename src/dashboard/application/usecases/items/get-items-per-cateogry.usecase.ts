import { IUseCase } from '../usecase';
import { ItemRepository } from '../../repositories/item.repository';
import { Item } from '../../../../core/entities/item.entity';
import { ItemCategory } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ItemDTO } from 'src/dashboard/infra/dto/item.dto';
import { ItemMapper } from 'src/dashboard/infra/mappers/item.mapper';

@Injectable()
export class GetItemsPerCategoryUseCase implements IUseCase<Item[]> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(category: ItemCategory): Promise<ItemDTO[]> {
    const items = await this.itemRepository.getItemsPerCategory(category);
    return items.map((x) => ItemMapper.toDTO(x));
  }
}
