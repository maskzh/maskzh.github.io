import { useLocation } from '@reach/router';
import dayjs from 'dayjs';
import { Link } from 'gatsby';
import React from 'react';

interface ArticleListItemProps {
  title: string;
  date: string;
  content: string;
  slug: string;
  matchText: string;
}

export default function ArticleListItem({ title, date, content, slug, matchText }: ArticleListItemProps) {
  const location = useLocation();

  return (
    <Link to={slug + location.search} className="block px-4 rounded">
      <article className="py-4 border-b border-gray-100 dark:border-gray-900">
        <time className="text-gray-400 text-xs font-medium dark:text-gray-600">{dayjs(date).format('YYYY-MM-DD')}</time>
        <h3 className="text-base text-black font-bold truncate dark:text-white">
          {HighlightText({ text: title, pattern: matchText })}
        </h3>
        <div className="mt-1 text-sm text-gray-800 text-justify dark:text-gray-200">
          {HighlightText({ text: content, pattern: matchText })}
        </div>
      </article>
    </Link>
  );
}

function HighlightText({ text, pattern }) {
  if (pattern === '') return <p>{text}</p>;
  const parsedText = text.replace(new RegExp(`(${pattern})`, 'ig'), '<strong class="text-red-500">$1</strong>');
  return <p dangerouslySetInnerHTML={{ __html: parsedText }} />;
}
