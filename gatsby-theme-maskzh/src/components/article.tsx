import { navigate } from '@reach/router';
import classnames from 'classnames';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import React from 'react';

export default function Article({ markdownRemark }) {
  const {
    frontmatter: { title, tags },
  } = markdownRemark;

  function onClickTag(fullTagName: string) {
    const lastTag = fullTagName.split('/').reverse()[0];
    navigate(`/?tag=${lastTag}`);
  }

  return (
    <article className="py-8">
      <header className="mb-8">
        <h1 className="mb-4 text-3xl font-bold dark:text-white">{title}</h1>
        {tags && (
          <div className="-mx-1">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 mx-1 text-sm bg-red-50 rounded-full cursor-pointer hover:bg-red-500 hover:text-white dark:bg-red-900 dark:text-white"
                onClick={() => onClickTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <ThemeToggler>
        {({ theme }) => (
          <div
            className={classnames('markdown-body', theme)}
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          ></div>
        )}
      </ThemeToggler>
    </article>
  );
}
