import React, { useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArticleItem from '@components/ListArticles/ArticleItem';

import type { OnThisDayEvent } from '@services/types/wikiApi';

type ListArticlesPropsType = {
  articles: OnThisDayEvent[];
  sortBy?: 'year' | 'title' | 'text' | 'extract';
  sortOrder?: 'asc' | 'desc';
};

const ListArticles = React.memo<ListArticlesPropsType>(
  ({ articles, sortBy = 'year', sortOrder = 'asc' }) => {
    const sortedArticles = useMemo(() => {
      if (!articles || articles.length === 0) return [];

      return [...articles].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortBy) {
          case 'year':
            aValue = a.year;
            bValue = b.year;
            break;
          case 'title':
            aValue = (a.title ?? 'Untitled').toLowerCase();
            bValue = (b.title ?? 'Untitled').toLowerCase();
            break;
          case 'text':
            aValue = a.text.toLowerCase();
            bValue = b.text.toLowerCase();
            break;
          case 'extract':
            aValue = (a.extract ?? '').toLowerCase();
            bValue = (b.extract ?? '').toLowerCase();
            break;
          default:
            aValue = a.year;
            bValue = b.year;
            break;
        }

        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }, [articles, sortBy, sortOrder]);

    return (
      <List role="list" aria-label="Wikipedia events for today">
        {sortedArticles.map((item, idx) => (
          <ListItem
            sx={{ pl: 0, pr: 0 }}
            key={item.pageId ?? `${item.year}-${idx}`}
            role="listitem"
          >
            <ArticleItem article={item} />
          </ListItem>
        ))}
      </List>
    );
  }
);

export default ListArticles;
