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
    <Link to={slug + location.search} className="block py-4 border-b">
      <time className="text-gray-400 text-xs font-medium">{dayjs(date).format('YYYY-MM-DD')}</time>
      <h3 className="text-base text-black font-bold truncate">{HighlightText({ text: title, pattern: matchText })}</h3>
      <div className="mt-1 text-sm text-gray-800">{HighlightText({ text: content, pattern: matchText })}</div>
    </Link>
  );
}

function HighlightText({ text, pattern }) {
  if (pattern === '') return <p>{text}</p>;
  const parsedText = text.replace(new RegExp(`(${pattern})`, 'ig'), '<strong class="text-red-500">$1</strong>');
  return <p dangerouslySetInnerHTML={{ __html: parsedText }} />;
}
