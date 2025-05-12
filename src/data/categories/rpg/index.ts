
import { GameTerm } from '../../types';
import { characterRoleTerms } from './character-roles';
import { combatTerms } from './combat';
import { progressionTerms } from './progression';
import { gameplayMechanicsTerms } from './gameplay-mechanics';

/**
 * Объединенный экспорт всех RPG-терминов
 */
export const rpgTerms: GameTerm[] = [
  ...characterRoleTerms,
  ...combatTerms,
  ...progressionTerms,
  ...gameplayMechanicsTerms
];

/**
 * Экспорт отдельных категорий для более гибкого использования
 */
export {
  characterRoleTerms,
  combatTerms,
  progressionTerms,
  gameplayMechanicsTerms
};
