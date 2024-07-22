import { ItemCategory } from '@prisma/client';
import { Repository } from './repository';
import { Item } from '../../../core/entities/item.entity';

export abstract class ItemRepository extends Repository<Item> {
  abstract getItemsPerCategory(category: ItemCategory): Promise<Item[]>;
}
