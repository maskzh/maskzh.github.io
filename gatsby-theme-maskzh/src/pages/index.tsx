import { useLocation } from '@reach/router';
import dayjs from 'dayjs';
import { graphql, Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import queryString from 'query-string';
import React, { useContext } from 'react';
import ArticleList from '../components/article-list';
import SEO from '../components/seo';
import Tags from '../components/tags';
import PostContext from '../context/PostContext';
import { isTagInclude } from '../utils/Tag';

export default function IndexPage({ data: { site } }) {
  const location = useLocation();
  const { t } = useTranslation();
  const { posts, tags } = useContext(PostContext);
  const tag = queryString.parse(location.search).tag;
  const articles = posts
    .filter((post) => isTagInclude(post.tags, tag as string))
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

  return (
    <div className="flex dark:bg-black">
      <SEO title={t('home')} />
      <aside className="relative w-48 min-h-screen border-r border-gray-100 hidden sm:block dark:border-gray-900">
        <Link to="/" className="block py-4 mb-1 text-lg font-bold text-center dark:text-white">
          {site.siteMetadata.title}
        </Link>
        <div className="flex-1">
          <Tags tags={tags} level={1} />
        </div>

        <footer className="absolute left-0 right-0 bottom-0 px-6 py-2 text-xs text-gray-300 dark:text-gray-700">
          <p>
            <a href={`https://github.com/${site.siteMetadata.author}`}>created by @{site.siteMetadata.author}</a>
          </p>
        </footer>
      </aside>
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <Link to="/" className="block py-2 shadow text-lg font-bold text-center sm:hidden dark:text-white">
          {site.siteMetadata.title}
        </Link>
        <div className="px-2">
          <ArticleList articles={articles} />
        </div>
      </main>
    </div>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`;
