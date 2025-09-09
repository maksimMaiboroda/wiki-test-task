import { useState, useEffect } from 'react';

export type SortOption = 'year' | 'title' | 'text' | 'extract';

const STORAGE_KEY = 'article-sorting-settings';

export const useSortingSettings = () => {
  const [sortBy, setSortBy] = useState<SortOption>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { sortBy: savedSortBy, sortOrder: savedSortOrder } = JSON.parse(saved);
        setSortBy(savedSortBy);
        setSortOrder(savedSortOrder);
      } catch (error) {
        console.error('Failed to load sorting settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sortBy, sortOrder }));
  }, [sortBy, sortOrder]);

  return {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  };
};
