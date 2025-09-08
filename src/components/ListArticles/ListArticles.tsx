import React, { useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArticleItem from '@components/ListArticles/ArticleItem';

import type { OnThisDayEvent } from '@services/types/wikiApi';

type ListArticlesPropsType = {
  articles: OnThisDayEvent[];
};

const ListArticles = React.memo<ListArticlesPropsType>(({ articles }) => {
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => a.year - b.year);
  }, [articles]);

  return (
    <List role="list" aria-label="Wikipedia events for today">
      {sortedArticles.map((item, idx) => (
        <ListItem sx={{ pl: 0, pr: 0 }} key={item.pageId ?? `${item.year}-${idx}`} role="listitem">
          <ArticleItem article={item} />
        </ListItem>
      ))}
    </List>
  );
});

export default ListArticles;
