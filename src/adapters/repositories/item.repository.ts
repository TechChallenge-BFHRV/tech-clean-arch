import { ItemCategory } from '../../core/entities/item-categories.entity';
import { Repository } from './repository';
import { Item } from '../../core/entities/item.entity';

export abstract class ItemRepository extends Repository<Item> {
  abstract getItemsPerCategory(category: ItemCategory): Promise<Item[]>;
}
