import { rpgTerms } from "./categories/rpg";
import { generalTerms } from "./categories/general";
import { competitiveTerms } from "./categories/competitive";
import { filterTerms, getAllCategories, sortTermsByAlphabet } from "./utils";
import { GameTerm } from "./types";

/**
 * Все термины из словаря, объединенные в один массив
 */
export const gameTermsData: GameTerm[] = sortTermsByAlphabet([
  ...generalTerms,
  ...rpgTerms,
  ...competitiveTerms,
]);

/**
 * Все доступные категории из словаря
 */
export const gameCategories = getAllCategories(gameTermsData);

/**
 * API для работы с игровыми терминами
 */
export const GameTermsAPI = {
  /**
   * Получить все термины
   */
  getAllTerms: () => gameTermsData,

  /**
   * Получить все категории
   */
  getAllCategories: () => gameCategories,

  /**
   * Поиск терминов по фильтру
   */
  searchTerms: (filter: Parameters<typeof filterTerms>[1]) =>
    filterTerms(gameTermsData, filter),

  /**
   * Найти термин по ID
   */
  getTermById: (id: number) => gameTermsData.find((term) => term.id === id),

  /**
   * Найти термины по категории
   */
  getTermsByCategory: (category: string) =>
    gameTermsData.filter((term) => term.categories.includes(category as any)),
};

export default GameTermsAPI;
