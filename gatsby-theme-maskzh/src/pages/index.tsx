import { useLocation } from '@reach/router';
import dayjs from 'dayjs';
import { graphql, Link } from 'gatsby';
import queryString from 'query-string';
import React, { useContext } from 'react';
import ArticleList from '../components/article-list';
import SEO from '../components/seo';
import Tags from '../components/tags';
import PostContext from '../context/PostContext';
import { isTagInclude } from '../utils/Tag';

export default function IndexPage({ data: { site } }) {
  const location = useLocation();
  const { posts, tags } = useContext(PostContext);
  const tag = queryString.parse(location.search).tag;
  const articles = posts
    .filter((file) => isTagInclude(file.tags, tag as string))
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

  return (
    <div className="flex">
      <SEO title="Home" />
      <aside className="relative w-48 min-h-screen border-r hidden sm:block">
        <Link to="/" className="block py-4 mb-1 text-lg font-bold text-center">
          {site.siteMetadata.title}
        </Link>
        <div className="flex-1">
          <Tags tags={tags} level={1} />
        </div>

        <footer className="absolute left-0 right-0 bottom-0 px-6 py-2 text-xs text-gray-300">
          <p>
            <a href={`https://github.com/${site.siteMetadata.author}`}>created by @{site.siteMetadata.author}</a>
          </p>
        </footer>
      </aside>
      <main className="flex-1">
        <Link to="/" className="block py-2 shadow text-lg font-bold text-center sm:hidden">
          {site.siteMetadata.title}
        </Link>
        <div className="px-6">
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
