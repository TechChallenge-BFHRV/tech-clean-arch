import { IUseCase } from '../usecase';
import { ItemRepository } from '../../../adapters/repositories/item.repository';
import { Item } from '../../entities/item.entity';
import { Injectable } from '@nestjs/common';
import { ItemDTO } from '../../../pkg/dtos/item.dto';
import { ItemMapper } from '../../../adapters/mappers/item.mapper';

@Injectable()
export class GetItemUseCase implements IUseCase<Item> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<ItemDTO[]> {
    const items = await this.itemRepository.getAll();
    return items.map((x) => ItemMapper.toDTO(x));
  }
}
