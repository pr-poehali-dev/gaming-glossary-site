
import { GameTerm, GameTermCategory, TermFilter } from './types';

/**
 * Фильтрует список терминов по заданным критериям
 */
export function filterTerms(terms: GameTerm[], filter: TermFilter): GameTerm[] {
  return terms.filter((term) => {
    // Фильтрация по тексту поиска
    const matchesSearch = !filter.searchText 
      ? true 
      : term.term.toLowerCase().includes(filter.searchText.toLowerCase()) ||
        term.definition.toLowerCase().includes(filter.searchText.toLowerCase()) ||
        term.altNames?.some(name => 
          name.toLowerCase().includes(filter.searchText!.toLowerCase())
        );
    
    // Фильтрация по категории
    const matchesCategory = !filter.category 
      ? true 
      : term.categories.includes(filter.category);
    
    // Фильтрация по первой букве
    const matchesLetter = !filter.letter 
      ? true 
      : term.term.charAt(0).toLowerCase() === filter.letter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLetter;
  });
}

/**
 * Возвращает все уникальные категории из списка терминов
 */
export function getAllCategories(terms: GameTerm[]): GameTermCategory[] {
  const categorySet = new Set<GameTermCategory>();
  
  terms.forEach(term => {
    term.categories.forEach(category => {
      categorySet.add(category);
    });
  });
  
  return [...categorySet];
}

/**
 * Сортирует термины по алфавиту
 */
export function sortTermsByAlphabet(terms: GameTerm[]): GameTerm[] {
  return [...terms].sort((a, b) => 
    a.term.localeCompare(b.term, 'ru', { sensitivity: 'base' })
  );
}

/**
 * Генерирует уникальный ID для нового термина
 */
export function generateNewId(terms: GameTerm[]): number {
  const maxId = terms.reduce((max, term) => Math.max(max, term.id), 0);
  return maxId + 1;
}
