import { Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase';
import { Item } from '../../../../core/entities/item.entity';
import { ItemRepository } from '../../repositories/item.repository';
import { ItemDTO } from 'src/dashboard/infra/dto/item.dto';
import { ItemMapper } from 'src/dashboard/infra/mappers/item.mapper';

@Injectable()
export class CreateItemUseCase implements IUseCase<Item> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(item: ItemDTO): Promise<ItemDTO> {
    item.preparationTime = item.preparationTime || 0;

    const createdItem = await this.itemRepository.create(
      ItemMapper.toEntity(item),
    );

    return ItemMapper.toDTO(createdItem);
  }
}
