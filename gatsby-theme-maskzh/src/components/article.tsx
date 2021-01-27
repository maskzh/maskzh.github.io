import { navigate } from '@reach/router';
import React from 'react';

export default function Article({ markdownRemark }) {
  const {
    frontmatter: { title, tags },
  } = markdownRemark;

  function onClickTag(fullTagName: string) {
    const lastTag = fullTagName.split('/').reverse()[0];
    navigate(`?tag=${lastTag}`);
  }

  return (
    <article className="py-8">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        {tags && (
          <div className="-mx-1">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 mx-1 text-sm bg-red-50 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={() => onClickTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div
        className={false ? 'markdown-body dark' : 'markdown-body'}
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      ></div>
    </article>
  );
}
