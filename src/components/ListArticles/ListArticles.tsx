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
    <List>
      {sortedArticles.map((item, idx) => (
        <ListItem key={item.pageId ?? `${item.year}-${idx}`}>
          <ArticleItem article={item} />
        </ListItem>
      ))}
    </List>
  );
});

export default ListArticles;
