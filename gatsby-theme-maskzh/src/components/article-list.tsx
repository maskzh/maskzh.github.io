import React, { useState } from 'react';
import ArticleListItem from './article-list-item';
import Search from './search';

export default function ArticleList({ articles }) {
  const [text, setText] = useState('');

  return (
    <div className="">
      <Search text={text} setText={setText} />
      {articles
        .filter(({ title, content }) => matchText([title, content], text))
        .map(({ title, date, content, slug }) => (
          <ArticleListItem key={title} matchText={text} title={title} content={content} slug={slug} date={date} />
        ))}
    </div>
  );
}

function matchText(strs: Array<string>, pattern: string): boolean {
  return strs.some((str) => str.toUpperCase().includes(pattern.toUpperCase()));
}
