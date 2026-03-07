/**
 * Sort categories by a preferred order; any extra categories are appended at the end.
 */
export function sortCategories<T extends string>(
  items: T[],
  order: readonly string[]
): T[] {
  const set = new Set(items);
  const ordered: T[] = [];
  for (const k of order) {
    if (set.has(k as T)) {
      ordered.push(k as T);
      set.delete(k as T);
    }
  }
  set.forEach((k) => ordered.push(k));
  return ordered;
}

export const BLOG_CATEGORY_ORDER = [
  'Backend',
  'Frontend',
  'Infra',
  'DB',
  'Troubleshooting',
  'Notes',
] as const;

export const PROJECT_CATEGORY_ORDER = [
  'Backend',
  'Frontend',
  'Infra',
  'Data',
  'Platform',
  'Tool',
] as const;
