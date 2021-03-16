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
      <aside className="w-48 h-screen overflow-x-hidden overflow-y-auto border-r border-gray-100 hidden sm:flex flex-col dark:border-gray-900">
        <Link to="/" className="block py-4 text-lg font-bold text-center dark:text-white">
          {site.siteMetadata.title}
        </Link>
        <div className="flex-1">
          <Tags tags={tags} level={1} />
        </div>
        <a
          href={`https://github.com/${site.siteMetadata.author}`}
          className="block py-4 text-center text-xs text-gray-300 dark:text-gray-700"
        >
          created by @{site.siteMetadata.author}
        </a>
      </aside>
      <main className="flex-1 sm:h-screen overflow-x-hidden overflow-y-auto">
        <Link to="/" className="block py-2 sm:hidden text-lg font-bold text-center dark:text-white">
          {site.siteMetadata.title}
        </Link>
        <ArticleList articles={articles} />
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
