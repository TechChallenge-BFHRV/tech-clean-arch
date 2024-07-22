import { IUseCase } from '../usecase';
import { ItemRepository } from '../../repositories/item.repository';
import { Item } from '../../../../core/entities/item.entity';
import { Injectable } from '@nestjs/common';
import { ItemDTO } from 'src/dashboard/infra/dto/item.dto';
import { ItemMapper } from 'src/dashboard/infra/mappers/item.mapper';

@Injectable()
export class GetItemUseCase implements IUseCase<Item> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<ItemDTO[]> {
    const items = await this.itemRepository.getAll();
    return items.map((x) => ItemMapper.toDTO(x));
  }
}
