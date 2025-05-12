
/**
 * Интерфейс для игрового термина
 */
export interface GameTerm {
  id: number;
  term: string;
  definition: string;
  example?: string;
  categories: GameTermCategory[];
  altNames?: string[];
}

/**
 * Все доступные категории игровых терминов
 */
export type GameTermCategory = 
  | 'Общие'
  | 'Мультиплеер'
  | 'RPG'
  | 'MOBA'
  | 'MMORPG'
  | 'Шутеры'
  | 'F2P'
  | 'Battle Royale'
  | 'Выживание'
  | 'Киберспорт'
  | 'Косметика';

/**
 * Фильтр для поиска терминов
 */
export interface TermFilter {
  searchText?: string;
  category?: GameTermCategory | null;
  letter?: string | null;
}
